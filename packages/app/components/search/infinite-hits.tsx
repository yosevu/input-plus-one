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
import { type SearchIndex } from "app/types"

interface SearchItem {
  h: string;
  w: string;
  v: string[];
  objectID: string;
  _highlightResult: {
    h: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    };
    w: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    };
    v: Array<{
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    }>;
  };
  __position: number;
}

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
      <RenderHTML
        contentWidth={width}
        source={{ html: hit.h }}
        baseStyle={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.25rem" }}
        tagsStyles={{ h1: { color: "#ffffff" } }}
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
