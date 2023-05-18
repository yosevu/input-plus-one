import { ActivityIndicator } from 'react-native'
import { View } from 'app/design/view'
import { type ReactElement } from 'react'

const Loading = (): ReactElement => (
  <View className="flex-1 justify-center items-center">
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
)

export default Loading
