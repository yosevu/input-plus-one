import { View } from 'app/design/view'
import { FlatList, useWindowDimensions } from 'react-native'
import { Text } from 'app/design/typography'
import { TouchableOpacity } from 'app/design/button'
import RenderHtml from 'react-native-render-html'
import { useRouter } from 'solito/router'
import { type ReactElement } from 'react'
import { useVocabulary } from './provider'
import { type SearchIndex } from 'app/types'

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
    <View className="m-6 flex-1">
      <FlatList
        data={vocabulary}
        keyExtractor={(item) => item.objectID}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => { handlePress(item.objectID, item.searchIndex) }}
          >
            <RenderHtml contentWidth={width} source={{ html: item.h }} />
            <View className="my-6 flex-row flex-wrap">
              {item.v.map((value) => (
                <Text
                  className="mb-2 mr-2 rounded border px-2 py-1"
                  key={value}
                >
                  {value}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
