import { type ReactElement } from "react"
import { NavigationProvider } from "./navigation"
import { SafeArea } from "./safe-area"
import { SearchProvider } from "app/components/search/provider"
import { VocabularyProvider } from "app/features/vocabulary/provider"

export function Provider({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <SafeArea>
      <SearchProvider>
        <VocabularyProvider>
          <NavigationProvider>{children}</NavigationProvider>
        </VocabularyProvider>
      </SearchProvider>
    </SafeArea>
  )
}
