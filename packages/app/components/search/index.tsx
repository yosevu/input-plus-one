import { SafeAreaView, StyleSheet, type FlatList } from "react-native"
import { View } from "app/design/view"
import { InstantSearch } from "react-instantsearch-hooks"
import SearchBox from "./search-box"
import { type ReactElement, useRef } from "react"
import InfiniteHits, { Hit } from "./infinite-hits"
import { useSearch } from "./provider"

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
