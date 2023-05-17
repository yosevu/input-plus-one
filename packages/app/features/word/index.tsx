import { type ReactElement } from "react";
import { View } from "app/design/view";
import { Text } from "app/design/typography";
import Menu from "app/components/menu";

export default function WordScreen(): ReactElement {
  return (
    <View>
      <Menu />
      <Text>WordScreen</Text>
    </View>
  )
}