import { type ReactElement } from "react";
import { View } from "app/design/view";
import { Text } from "app/design/typography";
import Menu from "app/components/menu";

export default function DictionaryScreen(): ReactElement {
  return (
    <View className="bg-dark-blue flex-1 p-3">
      <Menu />
      <View>
        <Text>DictionaryScreen</Text>
      </View>
    </View>
  );
}
