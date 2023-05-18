import { View } from "app/design/view"
import {
  FlatList,
  useWindowDimensions,
} from "react-native"
import {
  useInfiniteHits,
  type UseInfiniteHitsProps,
} from "react-instantsearch-hooks"
import { forwardRef, type ReactElement, type Ref } from "react"
import { useRouter } from "solito/router"
import { TouchableOpacity } from "app/design/button"
import RenderHTML from "react-native-render-html"
import { type SearchItem, type SearchIndex } from "app/types"
import Loading from "../loading"
import Word from "../word"

interface HitProps {
  hit: SearchItem;
  searchIndex: SearchIndex;
}

export function Hit({ hit, searchIndex }: HitProps): ReactElement {
  const { push } = useRouter()
  const { width } = useWindowDimensions()

  const handleOnPress = (): void => {
    push({
      pathname: `/word/${hit.objectID}`,
      query: {
        searchIndex,
      },
    })
  }

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <Word
        contentWidth={width}
        source={{ html: hit.h }}
      />
    </TouchableOpacity>
  )
}

interface InfiniteHitsProps extends UseInfiniteHitsProps {
  hitComponent: React.ComponentType<{ hit: SearchItem, searchIndex: SearchIndex }>;
  searchIndex: SearchIndex;
}

const InfiniteHits: React.FC<InfiniteHitsProps> = forwardRef(
  (
    props: InfiniteHitsProps,
    ref: Ref<FlatList<any>>,
  ) => {
    const { hitComponent: Hit, searchIndex } = props
    const { hits, isLastPage, showMore } = useInfiniteHits(props)

    if (hits.length === 0) {
      return <Loading />
    }

    return (
      <FlatList
        className="bg-dark-blue rounded-lg"
        ref={ref}
        data={hits}
        keyExtractor={(hit: SearchItem) => hit.objectID}
        ItemSeparatorComponent={() => (
          <View className="border-dark-blue border border-4" />
        )}
        onEndReached={() => {
          if (!isLastPage) {
            showMore()
          }
        }}
        renderItem={({ item }) => (
          <View className="p-4">
            <Hit hit={item as SearchItem} searchIndex={searchIndex} />
          </View>
        )}
      />
    )
  },
)

InfiniteHits.displayName = "InfiniteHits"

export default InfiniteHits
