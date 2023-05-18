import { type MethodType } from '@algolia/requester-common'
import { createParam } from 'solito'
import { Text, TextLink } from 'app/design/typography'
import { type ReactElement, useEffect, useState } from 'react'
import RenderHtml from 'react-native-render-html'
import { useWindowDimensions } from 'react-native'
import { useVocabulary } from '../vocabulary/provider'
import { useSearch } from 'app/components/search/provider'
import { type SearchClient } from 'algoliasearch/lite'
import { TouchableOpacity } from 'app/design/button'
import { View } from 'app/design/view'
import { Icon } from 'app/design/icons'
import Loading from 'app/components/loading'
import { type SearchItem, type SearchIndex } from 'app/types'

interface Query {
  id: string;
  searchIndex: SearchIndex;
  [key: string]: unknown;
}

const { useParam } = createParam<Query>()

interface CustomRequest {
  method: MethodType
  path: string
  data: {
    filters: string
    hitsPerPage: number
  }
}

async function findById(
  searchClient: SearchClient,
  searchIndex: SearchIndex,
  objectID: string,
): Promise<SearchItem | undefined> {
  const filters = `objectID:${objectID}`

  const request: CustomRequest = {
    method: 'POST' as MethodType,
    path: `/1/indexes/${encodeURIComponent(searchIndex)}/query`,
    data: {
      filters,
      hitsPerPage: 1,
    },
  }

  try {
    const response = await searchClient.customRequest<{ hits: SearchItem[] }>(request)
    const item = response.hits[0]

    return item
  } catch (error) {
    console.error(error)
  }
}

export default function WordScreen(): ReactElement {
  const [hit, setWord] = useState<SearchItem | undefined>(undefined)
  const { width } = useWindowDimensions()
  const { vocabulary, addToVocabulary, removeFromVocabulary } = useVocabulary()
  const { searchClient } = useSearch()
  const [id] = useParam('id')
  const [searchIndex] = useParam('searchIndex')

  const isVocabulary = vocabulary.some((item) => item.objectID === id)

  const handleAddWordPress = (): void => {
    addToVocabulary(searchIndex, hit)
  }

  const handleRemoveWordPress = (): void => {
    if (id !== undefined) {
      removeFromVocabulary(id)
    } else {
      console.error('id is undefined')
    }
  }

  useEffect(() => {
    const loadWord = async (): Promise<void> => {
      
      if (id !== undefined && searchIndex !== undefined) {
        const word = await findById(searchClient, searchIndex, id)
        setWord(word)
      } else {
        console.error('id is undefined')
      }
    }
    void loadWord()
  }, [id, searchIndex, searchClient])

  if (hit === undefined) {
    return <Loading />
  }

  return (
    <View className="m-6 flex-1">
      <TextLink
        href="/vocabulary"
        className="bg-light-blue my-4 self-center rounded-lg px-4 py-2"
      >
        <View className="flex-row items-center">
          <Icon name="list" size={30} color="#FFFFFF" className="mr-2" />
          <Text className="text-xl text-white">Vocabulary</Text>
        </View>
      </TextLink>

      <RenderHtml contentWidth={width} source={{ html: hit.h }} />
      <View className="my-6 flex-row flex-wrap">
        {hit.v.map((value) => (
          <Text key={value} className="mb-2 mr-2 rounded border px-2 py-1">
            {value}
          </Text>
        ))}
      </View>
      {isVocabulary ? (
        <TouchableOpacity
          onPress={handleRemoveWordPress}
          className="bg-green-accent mb-4 flex-row justify-center self-center rounded-lg px-2 py-2"
        >
          <Icon name="delete" size={24} color="#FFFFFF" className="mr-1" />
          <Text className="mr-2 text-lg font-bold text-white">Remove word</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleAddWordPress}
          className="bg-green-accent mb-4 flex-row justify-center self-center rounded-lg px-2 py-2"
        >
          <Icon name="delete" size={24} color="#FFFFFF" className="mr-1" />
          <Text className="mr-2 text-lg font-bold text-white">Add word</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
