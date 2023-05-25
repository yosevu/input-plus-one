import { type ReactElement } from "react"
import { View } from "app/design/view"
import { Text, TextLink } from "app/design/typography"
import { SearchIcon, ListIcon } from "app/design/icon"

export default function Menu(): ReactElement {
  return (
    <View className="bg-dark-blue width-100 mb-6 flex-row items-center justify-center p-4">
      <TextLink href="/dictionary" className="mr-12">
        <View className="flex-row items-center">
          <SearchIcon />
          {/* <Icon name="search" size={30} color="#FFFFFF" className="mr-2" /> */}
          <Text className="text-2xl text-white">Dictionary</Text>
        </View>
      </TextLink>
      <TextLink href="/vocabulary">
        <View className="flex-row items-center">
          <ListIcon />
          <Text className="text-2xl text-white">Vocabulary</Text>
        </View>
      </TextLink>
    </View>
  )
}
