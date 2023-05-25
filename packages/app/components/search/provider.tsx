import {
  type ReactElement,
  type ReactNode,
  useState,
  createContext,
  useContext,
} from "react"
import { SearchIndex } from "app/types"
import algoliasearch, { type SearchClient } from "algoliasearch"

const getSearchClient = (): SearchClient => {
  const algoliaAppId = process.env.ALGOLIA_APP_ID ?? process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''
  const algoliaApiKey = process.env.ALGOLIA_API_KEY ?? process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? ''

  if (algoliaAppId == null || algoliaApiKey == null) {
    throw new Error("Algolia environment variables not set.")
  }

  const searchClient = algoliasearch(algoliaAppId, algoliaApiKey)

  return searchClient
}

interface SearchContextType {
  searchClient: SearchClient;
  searchIndex: SearchIndex;
  switchSearchIndex: () => void;
}

const SearchContext = createContext<SearchContextType | null>(null)

export const useSearch = (): SearchContextType => {
  const contextValue = useContext(SearchContext)

  if (contextValue === null) {
    throw new Error("useSearch must be used within a SearchProvider")
  }

  return contextValue
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({
  children,
}: SearchProviderProps): ReactElement => {
  const searchClient = getSearchClient()
  const [searchIndex, setSearchIndex] = useState<SearchIndex>(
    SearchIndex.EngSwa,
  )
  const switchSearchIndex = (): void => {
    setSearchIndex((searchIndex) =>
      searchIndex === SearchIndex.EngSwa
        ? SearchIndex.SwaEng
        : SearchIndex.EngSwa,
    )
  }

  return (
    <SearchContext.Provider
      value={{ searchClient, searchIndex, switchSearchIndex }}
    >
      {children}
    </SearchContext.Provider>
  )
}
