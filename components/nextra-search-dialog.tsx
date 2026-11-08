"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { addBasePath } from "next/dist/client/add-base-path";
import { SearchIcon } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { PageItem } from "@/lib/getPagesFromPageMap";
import { Kbd } from "@/components/ui/kbd";

type Props = {
  placeholder?: string;
  pages?: PageItem[];
};
type OnSelect = (url: string) => void;
const SEARCH_PAGE_SIZE = 8;

const SEARCH_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "was",
  "what",
  "when",
  "where",
  "which",
  "who",
  "with",
]);

const activeSearchInstances = new Set<string>();
const primarySearchListeners = new Set<() => void>();
const searchResetListeners = new Set<() => void>();
const openListeners = new Set<React.Dispatch<React.SetStateAction<boolean>>>();
let globalOpen = false;
let primarySearchInstance: string | null = null;
let pagefindPromise: Promise<NonNullable<Window["pagefind"]>> | undefined;

function setGlobalOpen(value: boolean | ((prev: boolean) => boolean)) {
  globalOpen = typeof value === "function" ? value(globalOpen) : value;
  openListeners.forEach((listener) => listener(globalOpen));
}

function openGlobalSearch() {
  searchResetListeners.forEach((listener) => listener());
  setGlobalOpen(true);
}

function subscribeToPrimarySearch(listener: () => void) {
  primarySearchListeners.add(listener);
  return () => primarySearchListeners.delete(listener);
}

function getPrimarySearchInstance() {
  return primarySearchInstance;
}

function registerSearchInstance(instanceId: string) {
  activeSearchInstances.add(instanceId);
  if (!primarySearchInstance) {
    primarySearchInstance = instanceId;
    primarySearchListeners.forEach((listener) => listener());
  }

  return () => {
    activeSearchInstances.delete(instanceId);
    if (primarySearchInstance === instanceId) {
      primarySearchInstance =
        activeSearchInstances.values().next().value ?? null;
      primarySearchListeners.forEach((listener) => listener());
    }
  };
}

export function NextraSearchDialog({
  placeholder = "Search...",
  pages = [],
}: Props) {
  const router = useRouter();
  const [open, setOpenState] = useState(globalOpen);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [searchHits, setSearchHits] = useState<PagefindSearchHit[]>([]);
  const [totalResultCount, setTotalResultCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState("");
  const [error, setError] = useState("");
  const searchGeneration = useRef(0);
  const instanceId = useId();
  const primaryInstance = useSyncExternalStore(
    subscribeToPrimarySearch,
    getPrimarySearchInstance,
    () => null,
  );
  const isPrimary = primaryInstance === instanceId;

  useEffect(() => {
    openListeners.add(setOpenState);
    return () => {
      openListeners.delete(setOpenState);
    };
  }, []);

  useEffect(() => {
    const resetSearch = () => {
      setQuery("");
      setResults([]);
      setSearchHits([]);
      setTotalResultCount(0);
      setLoadingMore(false);
      setLoadMoreError("");
      setError("");
      setLoading(false);
    };
    searchResetListeners.add(resetSearch);
    return () => {
      searchResetListeners.delete(resetSearch);
    };
  }, []);

  useEffect(() => registerSearchInstance(instanceId), [instanceId]);

  useEffect(() => {
    if (!isPrimary) return;
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (globalOpen) setGlobalOpen(false);
        else openGlobalSearch();
      }
      if (e.key === "Escape" && globalOpen) {
        e.preventDefault();
        setGlobalOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isPrimary]);

  useEffect(() => {
    let active = true;
    const generation = ++searchGeneration.current;
    const handleSearch = async (value: string) => {
      const normalizedQuery = normalizeSearchQuery(value);
      if (!normalizedQuery) {
        if (!active) return;
        setResults([]);
        setSearchHits([]);
        setTotalResultCount(0);
        setLoadingMore(false);
        setLoadMoreError("");
        setError("");
        setLoading(false);
        return;
      }

      setLoading(true);
      setResults([]);
      setSearchHits([]);
      setTotalResultCount(0);
      setLoadingMore(false);
      setLoadMoreError("");
      setError("");

      try {
        await importPagefind();
      } catch {
        if (!active) return;
        setError("Search is unavailable right now. Please try again shortly.");
        setLoading(false);
        return;
      }

      try {
        const response =
          await window.pagefind!.debouncedSearch<PagefindResult>(
            normalizedQuery,
          );
        if (!active) return;
        if (!response) {
          setResults([]);
          setLoading(false);
          return;
        }

        setSearchHits(response.results);
        setTotalResultCount(response.results.length);
        const firstPage = await Promise.all(
          response.results.slice(0, SEARCH_PAGE_SIZE).map((hit) => hit.data()),
        );
        if (!active || generation !== searchGeneration.current) return;

        setResults(processPagefindResults(firstPage));
        setLoading(false);
        setError("");
      } catch {
        if (!active) return;
        setError("Search failed.");
        setLoading(false);
      }
    };

    handleSearch(query);
    return () => {
      active = false;
    };
  }, [query]);

  if (!isPrimary) {
    // For non-primary instances, we still render the trigger, but not the dialog.
    return (
      <SearchTrigger placeholder={placeholder} onClick={openGlobalSearch} />
    );
  }

  const handleResultClick = (url: string) => {
    setGlobalOpen(false);
    router.push(url);
  };

  const loadMoreResults = async () => {
    const generation = searchGeneration.current;
    const nextHits = searchHits.slice(
      results.length,
      results.length + SEARCH_PAGE_SIZE,
    );
    if (!nextHits.length || loadingMore) return;

    setLoadingMore(true);
    setLoadMoreError("");
    try {
      const nextPage = await Promise.all(nextHits.map((hit) => hit.data()));
      if (generation !== searchGeneration.current) return;
      setResults((currentResults) => [
        ...currentResults,
        ...processPagefindResults(nextPage),
      ]);
    } catch {
      if (generation === searchGeneration.current) {
        setLoadMoreError("Could not load more results.");
      }
    } finally {
      if (generation === searchGeneration.current) setLoadingMore(false);
    }
  };

  const searchContent = !query.trim() ? (
    <SearchWelcomePages pages={pages} onSelect={handleResultClick} />
  ) : error ? (
    <SearchError message={error} />
  ) : loading ? (
    <SearchLoading />
  ) : results.length === 0 ? (
    <SearchNoResults />
  ) : (
    <SearchResults
      results={results}
      query={normalizeSearchQuery(query)}
      onSelect={handleResultClick}
    />
  );

  return (
    <>
      <SearchTrigger placeholder={placeholder} onClick={openGlobalSearch} />

      <CommandDialog
        open={open}
        onOpenChange={setGlobalOpen}
        title="Search this site"
        description="Search pages, topics, and notes across the site."
        showCloseButton={false}
        className="search-dialog !max-w-[800px] overflow-hidden !bg-transparent px-2 border-none [&_.bg-popover]:bg-transparent"
      >
        <div className="border-4 rounded-2xl bg-background">
          <SearchInput
            placeholder={placeholder}
            query={query}
            onQueryChange={setQuery}
          />

          <CommandList
            className="h-auto max-h-[min(60vh,24rem)]"
            aria-label="Search results list"
          >
            {searchContent}
          </CommandList>
          <div className="flex min-h-10 items-center justify-between border-t px-4 text-xs text-muted-foreground">
            <span aria-live="polite">
              {!query.trim()
                ? "Search pages, notes, and topics"
                : error
                  ? "Search could not be completed"
                  : loading
                    ? "Searching…"
                    : loadMoreError ||
                      (totalResultCount > results.length
                        ? `Showing ${results.length} of ${totalResultCount} matching pages`
                        : `${totalResultCount} matching pages`)}
            </span>
            {results.length < totalResultCount && !error && (
              <button
                type="button"
                className="rounded px-2 py-1 font-medium text-foreground hover:bg-muted disabled:opacity-50"
                onClick={loadMoreResults}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading…" : "Load more"}
              </button>
            )}
            <span className="hidden items-center gap-1 sm:inline-flex">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <span>navigate</span>
              <Kbd>↵</Kbd>
              <span>open</span>
            </span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}

function SearchWelcomePages({
  pages = [],
  onSelect,
}: {
  pages: PageItem[];
  onSelect: OnSelect;
}) {
  if (pages.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading="Suggested pages">
      {pages.slice(0, 6).map(({ title, url, parent, description }, index) => (
        <SearchItem
          key={`${url}-${index}`}
          value={title}
          title={title}
          parent={parent}
          onSelect={() => onSelect(url)}
          description={description}
        />
      ))}
    </CommandGroup>
  );
}

function SearchInput({
  placeholder,
  query,
  onQueryChange,
}: {
  placeholder: string;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <div className="p-2">
      <div className="bg-input h-10 w-full flex items-center gap-2 rounded-lg px-3">
        <SearchIcon className="size-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
          )}
          placeholder={placeholder}
          value={query}
          onValueChange={onQueryChange}
          aria-label={placeholder}
        />
      </div>
    </div>
  );
}

function SearchTrigger({
  placeholder,
  onClick,
}: {
  placeholder: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={globalOpen}
      aria-label={`${placeholder} (Command or Control K)`}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:border-gray-300 dark:hover:border-white/40",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      )}
    >
      <SearchIcon className="size-4" />
      <span>{placeholder}</span>
      <Kbd>
        <span className="text-xs">⌘</span>K
      </Kbd>
    </button>
  );
}

function SearchLoading() {
  return (
    <div className="py-6 text-center text-sm text-gray-500">
      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
      <span className="ml-2">Searching...</span>
    </div>
  );
}

function SearchError({ message }: { message: string }) {
  return (
    <div className="py-6 px-4 text-center text-sm text-red-500">{message}</div>
  );
}

function SearchNoResults() {
  return (
    <CommandEmpty>
      No matches. Try a shorter phrase or different terms.
    </CommandEmpty>
  );
}

function SearchResultItem({
  subResult,
  parentTitle,
  query,
  onSelect,
}: {
  subResult: PagefindResult["sub_results"][0];
  parentTitle: string;
  query: string;
  onSelect: OnSelect;
}) {
  const excerpt = (subResult.excerpt || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const cleanExcerpt =
    excerpt.length > 180 ? `${excerpt.slice(0, 180)}…` : excerpt;

  return (
    <SearchItem
      title={highlightQuery(subResult.title || "", query)}
      description={highlightQuery(cleanExcerpt, query)}
      onSelect={() => onSelect(subResult.url)}
      value={`${parentTitle} ${subResult.title}`}
    />
  );
}

function SearchItem({
  title,
  description,
  onSelect,
  value,
  parent,
}: {
  parent?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  onSelect: () => void;
  value: string;
}) {
  return (
    <CommandItem onSelect={onSelect} value={value} className="cursor-pointer">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-1">
          {parent && (
            <>
              <span className="text-xs text-muted-foreground">{parent}</span>
              <span className="text-xs text-muted-foreground">/</span>
            </>
          )}
          <div className="font-semibold">{title}</div>
        </div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </CommandItem>
  );
}

function SearchResults({
  results,
  query,
  onSelect,
}: {
  results: PagefindResult[];
  query: string;
  onSelect: OnSelect;
}) {
  return (
    <>
      {results.map((result) => (
        <CommandGroup key={result.url} heading={result.meta.title}>
          {result.sub_results.map((subResult) => (
            <SearchResultItem
              key={subResult.url}
              subResult={subResult}
              parentTitle={result.meta.title}
              query={query}
              onSelect={() => onSelect(subResult.url)}
            />
          ))}
        </CommandGroup>
      ))}
    </>
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeSearchQuery(query: string) {
  const words = query.trim().split(/\s+/).filter(Boolean);
  if (!words.length || query.includes('"')) return query.trim();

  const meaningfulWords = words.filter(
    (word) =>
      !SEARCH_STOP_WORDS.has(
        word.toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, ""),
      ),
  );
  return (meaningfulWords.length ? meaningfulWords : words).join(" ");
}

function highlightQuery(text: string, query: string) {
  if (!query) return text;
  const words = query.replaceAll('"', "").trim().split(/\s+/).filter(Boolean);
  const meaningfulWords = words.filter(
    (word) => !SEARCH_STOP_WORDS.has(word.toLowerCase()),
  );
  const terms = meaningfulWords.length ? meaningfulWords : words;
  if (!terms.length) return text;
  const regex = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    terms.some((term) => part.toLowerCase() === term.toLowerCase()) ? (
      <mark
        key={index}
        className="bg-primary text-primary-foreground rounded-[3px] font-medium"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

declare global {
  interface Window {
    pagefind?: {
      debouncedSearch: <T>(
        query: string,
        options?: any,
      ) => Promise<{
        results: Array<{ data: () => Promise<T> }>;
      } | null>;
      options: (options: { baseUrl: string }) => Promise<void>;
    };
  }
}

async function importPagefind() {
  if (window.pagefind) return;
  if (!pagefindPromise) {
    pagefindPromise = (async () => {
      const pagefind = await import(
        /* webpackIgnore: true */ addBasePath("/_pagefind/pagefind.js")
      );
      await pagefind.options({ baseUrl: "/" });
      window.pagefind = pagefind;
      return pagefind;
    })().catch((error) => {
      pagefindPromise = undefined;
      throw error;
    });
  }
  await pagefindPromise;
}

function normalizePagefindUrl(url: string) {
  return url.replace(/\.html(?=#|$)/, "");
}

type PagefindResult = {
  excerpt: string;
  meta: {
    title: string;
  };
  raw_url: string;
  sub_results: {
    excerpt: string;
    title: string;
    url: string;
  }[];
  url: string;
};

type PagefindSearchHit = {
  data: () => Promise<PagefindResult>;
};

function processPagefindResults(data: PagefindResult[]) {
  return data.map((result) => {
    const sections = result.sub_results?.length
      ? result.sub_results
      : [
          {
            title: result.meta.title,
            excerpt: result.excerpt,
            url: result.url,
          },
        ];

    return {
      ...result,
      sub_results: sections.map((section) => ({
        ...section,
        url: normalizePagefindUrl(section.url),
      })),
    };
  });
}
