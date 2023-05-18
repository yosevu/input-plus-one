import { type ReactElement } from 'react'
import { NavigationProvider } from './navigation'
import { SafeArea } from './safe-area'

export function Provider({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <SafeArea>
      <NavigationProvider>{children}</NavigationProvider>
    </SafeArea>
  )
}
