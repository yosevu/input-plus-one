import { type ReactElement, useRef, useState } from "react"
import { View } from "app/design/view"
import { TextInput } from "app/design/text-input"
import { useSearchBox } from "react-instantsearch-hooks"
import {
  type SearchBoxConnectorParams,
} from "instantsearch.js/es/connectors/search-box/connectSearchBox"

type SearchBoxProps = SearchBoxConnectorParams & {
  onChange: () => void;
}

export default function SearchBox(props: SearchBoxProps): ReactElement {
  const { onChange } = props
  // FIXME: Resolve react-instasearch-hooks related type errors
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const searchState = useSearchBox(props) 
  const { query, refine } = searchState 
  const [inputValue, setInputValue] = useState(query)
  const inputRef = useRef(null)

  const handleChangeText = (newValue: string): void => {
    setInputValue(newValue)
    refine(newValue)
    onChange()
  }

  return (
    <View className="bg-dark-blue p-4">
      <TextInput
        ref={inputRef}
        className="h-12 rounded-full bg-white p-3 text-2xl"
        keyboardType="visible-password"
        value={inputValue}
        onChangeText={handleChangeText}
        clearButtonMode="while-editing"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoComplete="off"
      />
    </View>
  )
}
