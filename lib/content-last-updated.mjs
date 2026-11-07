import { execFileSync } from 'node:child_process'

const historyDates = new Map()

const contentSignature = (source) => source
  .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  .replace(/\s+/g, ' ')
  .trim()

/** Find the first revision and the newest revision with a changed page body. */
function getHistoryDates(filePath) {
  if (!filePath) return {}
  if (historyDates.has(filePath)) return historyDates.get(filePath)

  const result = {}
  try {
    const history = execFileSync('git', [
      '-c', 'core.quotePath=false', 'log', '--follow',
      '--format=COMMIT %H %cI', '--name-only', '--', filePath,
    ], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })

    const revisions = []
    for (const line of history.split('\n')) {
      if (line.startsWith('COMMIT ')) {
        const [, commit, committedAt] = line.split(' ')
        revisions.push({ commit, committedAt })
      } else if (line && revisions.length && !revisions.at(-1).path) {
        revisions.at(-1).path = line
      }
    }
    if (revisions.length) {
      result.publishedAt = new Date(revisions.at(-1).committedAt).toISOString()
    }

    let newerSignature
    let newerDate
    for (const revision of revisions) {
      if (!revision.path) continue
      const source = execFileSync('git', [
        'show', `${revision.commit}:${revision.path}`,
      ], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })
      const signature = contentSignature(source)
      if (newerSignature !== undefined && newerSignature !== signature) {
        result.updatedAt = new Date(newerDate).toISOString()
        break
      }
      newerSignature = signature
      newerDate = revision.committedAt
    }
    if (!result.updatedAt && newerSignature) {
      result.updatedAt = new Date(newerDate).toISOString()
    }
  } catch {
    // An uncommitted page or a build without Git history has no reliable date.
  }

  historyDates.set(filePath, result)
  return result
}

export function getContentPublishedAt(filePath) {
  return getHistoryDates(filePath).publishedAt
}

export function getContentLastUpdated(filePath, contentUpdated) {
  if (contentUpdated) {
    const date = new Date(contentUpdated)
    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid contentUpdated date in ${filePath}: ${contentUpdated}`)
    }
    return date.toISOString()
  }
  return getHistoryDates(filePath).updatedAt
}

export function withContentLastUpdated(metadata) {
  return {
    ...metadata,
    timestamp: getContentLastUpdated(metadata.filePath, metadata.contentUpdated),
  }
}
