import { View } from "app/design/view"
import { FlatList, useWindowDimensions } from "react-native"
import { Text } from "app/design/typography"
import { TouchableOpacity } from "app/design/button"
import RenderHTML from "react-native-render-html"
import { useRouter } from "solito/router"
import { type ReactElement } from "react"
import { useVocabulary } from "./provider"
import { type SearchIndex } from "app/types"
import WordVariants from "app/components/word-variants"
import Word from "../word"

export default function VocabularyScreen(): ReactElement {
  const { vocabulary } = useVocabulary()
  const { width } = useWindowDimensions()
  const { push } = useRouter()

  const handlePress = (id: string, searchIndex: SearchIndex): void => {
    push({
      pathname: `/word/${id}`,
      query: {
        searchIndex,
      },
    })
  }

  return (
    <View className="bg-dark-blue flex-1 p-6">
      <FlatList
        data={vocabulary}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              handlePress(item.objectID, item.searchIndex)
            }}
          >
            {/* <Word contentWidth={width} source={{ html: item.h }} /> */}
            <RenderHTML
              contentWidth={width}
              source={{ html: item.h }}
              baseStyle={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "1.25rem",
              }}
              tagsStyles={{ h1: { color: "#ffffff" } }}
            />
            <WordVariants hit={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
