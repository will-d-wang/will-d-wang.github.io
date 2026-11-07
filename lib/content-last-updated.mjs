import { execFileSync } from 'node:child_process'

const dates = new Map()

const contentSignature = (source) => source
  .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  .replace(/\s+/g, ' ')
  .trim()

/** Find the newest revision whose page body differs from the previous one. */
export function getContentLastUpdated(filePath, contentUpdated) {
  if (contentUpdated) {
    const date = new Date(contentUpdated)
    if (Number.isNaN(date.getTime())) {
      throw new Error(`Invalid contentUpdated date in ${filePath}: ${contentUpdated}`)
    }
    return date.toISOString()
  }

  if (!filePath) return undefined
  if (dates.has(filePath)) return dates.get(filePath)

  let date
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

    let newerSignature
    let newerDate
    for (const revision of revisions) {
      if (!revision.path) continue
      const source = execFileSync('git', [
        'show', `${revision.commit}:${revision.path}`,
      ], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })
      const signature = contentSignature(source)
      if (newerSignature !== undefined && newerSignature !== signature) {
        date = new Date(newerDate).toISOString()
        break
      }
      newerSignature = signature
      newerDate = revision.committedAt
    }
    if (!date && newerSignature) date = new Date(newerDate).toISOString()
  } catch {
    // An uncommitted page or a build without Git history has no reliable date.
  }

  dates.set(filePath, date)
  return date
}

export function withContentLastUpdated(metadata) {
  return {
    ...metadata,
    timestamp: getContentLastUpdated(metadata.filePath, metadata.contentUpdated),
  }
}
