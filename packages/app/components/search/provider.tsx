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
  const algoliaAppId = process.env.ALGOLIA_APP_ID
  const algoliaApiKey = process.env.ALGOLIA_API_KEY

  if (algoliaAppId == null || algoliaApiKey == null) {
    throw new Error("Algolia environment variables not set.")
  }

  const searchClient = algoliasearch(algoliaAppId, algoliaApiKey)

  return searchClient
}

const searchClient = getSearchClient()

const SearchContext = createContext<SearchContextType>({
  searchClient,
  searchIndex: SearchIndex.SwaEng,
})

interface SearchContextType {
  searchClient: SearchClient;
  searchIndex: SearchIndex;
  switchSearchIndex?: () => void;
}

export const useSearch = (): SearchContextType => {
  return useContext(SearchContext)
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({
  children,
}: SearchProviderProps): ReactElement => {
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
