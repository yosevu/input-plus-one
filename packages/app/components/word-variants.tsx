import { View } from "app/design/view"
import { Text } from "app/design/typography"
import { type SearchItem } from "app/types"
import { type ReactElement } from "react"

interface WordVariantsProps {
  hit: SearchItem;
}

export default function WordVariants({ hit }: WordVariantsProps): ReactElement {
  return (
    <View className="my-6 flex-row flex-wrap">
      {hit.v.map((value) => (
        <Text key={value} className="mb-2 mr-2 rounded border px-2 py-1 text-white border-white">
          {value}
        </Text>
      ))}
    </View>
  )
}
