import { TouchableOpacity } from "app/design/button"
import { Icon } from "app/design/icons"
import { Text } from "app/design/typography"
import { SearchIndex } from "app/types"
import { type ReactElement } from "react"

interface ToggleProps {
  searchIndex: SearchIndex
  onToggle: () => void
}

export default function Toggle({ searchIndex, onToggle }: ToggleProps): ReactElement {
  const isEngSwa = searchIndex === SearchIndex.EngSwa
  const title = isEngSwa ? 'Swahili-English' : 'English-Swahili'
  const handlePress = (): void => {
    onToggle()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-green-accent mb-4 flex-row justify-center self-center rounded-lg px-2 py-1"
    >
      <Icon name="swap-horiz" size={30} color="#FFFFFF" className="mr-1" />
      <Text className="mr-2 text-lg font-bold text-white">{title}</Text>
    </TouchableOpacity>
  )
}