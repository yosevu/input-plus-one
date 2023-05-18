import { type ReactElement } from "react"
import { View } from "app/design/view"
import Menu from "app/components/menu"
import Search from "app/components/search"

export default function DictionaryScreen(): ReactElement {
  return (
    <View className="bg-dark-blue flex-1 p-3">
      <Menu />
      <Search />
    </View>
  )
}
