import { type ReactElement } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DictionaryScreen from "../../features/dictionary"
import WordScreen from "../../features/word"
import VocabularyScreen from "app/features/vocabulary"

const Stack = createNativeStackNavigator<{
  dictionary: undefined;
  vocabulary: undefined;
  word: {
    id: string;
  };
}>()

export function NativeNavigation(): ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dictionary"
        component={DictionaryScreen}
        options={{
          title: "Swahili Dictionary",
        }}
      />
      <Stack.Screen
        name="word"
        component={WordScreen}
        options={{
          title: "Word Detail",
        }}
      />
      <Stack.Screen
        name="vocabulary"
        component={VocabularyScreen}
        options={{
          title: "Vocabulary",
        }}
      />
    </Stack.Navigator>
  )
}
