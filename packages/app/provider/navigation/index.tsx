import { NavigationContainer } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { type ReactElement, useMemo } from 'react'

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}): ReactElement {
  return (
    <NavigationContainer
      linking={useMemo(
        () => ({
          prefixes: [Linking.createURL('/')],
          config: {
            initialRouteName: 'dictionary',
            screens: {
              dictionary: 'dictionary',
              vocabulary: 'vocabulary',
              word: 'word/:id',
            },
          },
        }),
        [],
      )}
    >
      {children}
    </NavigationContainer>
  )
}
