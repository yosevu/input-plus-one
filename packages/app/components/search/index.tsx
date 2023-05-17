import { SafeAreaView, StyleSheet, type FlatList } from "react-native"
import { View } from "app/design/view"
import algoliasearch, { type SearchClient } from "algoliasearch/lite"
import { InstantSearch } from "react-instantsearch-hooks"
import SearchBox from "./search-box"
import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from "react"
import InfiniteHits, { Hit } from './infinite-hits'
import { SearchIndex } from "app/types"

interface SearchContextType {
  searchClient: SearchClient
  searchIndex: SearchIndex
  switchSearchIndex?: () => void
}

const searchClient = algoliasearch(
  "Add env var",
  "Add env var",
)

const SearchContext = createContext<SearchContextType>({
  searchClient,
  searchIndex: SearchIndex.SwaEng,
})

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

export default function Search(): ReactElement {
  const { searchClient, searchIndex } = useSearch()
  const listRef = useRef<FlatList<any>>(null)

  const scrollToTop = (): void => {
    listRef.current?.scrollToOffset({ animated: false, offset: 0 })
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View className="bg-dark-blue w-full flex-1">
        <InstantSearch searchClient={searchClient} indexName={searchIndex}>
          <SearchBox onChange={scrollToTop} />
          <InfiniteHits
            hitComponent={Hit}
            searchIndex={searchIndex}
            ref={listRef}
          />
        </InstantSearch>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#252b33",
    width: "100%",
  },
})
