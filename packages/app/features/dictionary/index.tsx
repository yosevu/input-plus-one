import { type ReactElement } from "react"
import { View } from "app/design/view"
import Menu from "app/components/menu"
import Search from "app/components/search"
import { useSearch } from "app/components/search/provider"
import Toggle from "app/components/toggle"

export default function DictionaryScreen(): ReactElement {
  const { searchIndex, switchSearchIndex } = useSearch()
  
  return (
    <View className="bg-dark-blue flex-1 p-3">
      <Menu />
      <Toggle searchIndex={searchIndex} onToggle={switchSearchIndex} />
      <Search />
    </View>
  )
}
