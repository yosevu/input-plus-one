import { createContext, useContext, useState } from 'react'
import { type SearchItem, type SearchIndex } from 'app/types'

interface VocabularyContextType {
  vocabulary: SearchItem[];
  addToVocabulary: (searchIndex?: SearchIndex, word?: SearchItem) => void;
  removeFromVocabulary: (id: string) => void;
}

export const VocabularyContext = createContext<VocabularyContextType>({
  vocabulary: [],
  addToVocabulary: () => { return undefined },
  removeFromVocabulary: () => { return undefined },
})

interface VocabularyProviderProps {
  children: React.ReactNode
}

export const VocabularyProvider: React.FC<VocabularyProviderProps> = ({
  children,
}: VocabularyProviderProps) => {
  const [vocabulary, setVocabulary] = useState<SearchItem[]>([])

  const addToVocabulary = (searchIndex: SearchIndex, word: SearchItem): void => {
    setVocabulary((prev) => {
      return [
        ...prev,
        {
          ...word,
          searchIndex,
        },
      ]
    })
  }

  const removeFromVocabulary = (id: string): void => {
    setVocabulary((prev) => {
      const index = prev.findIndex((item) => item.objectID === id)
      return [...prev.slice(0, index), ...prev.slice(index + 1)]
    })
  }

  return (
    <VocabularyContext.Provider
      value={{ vocabulary, addToVocabulary, removeFromVocabulary }}
    >
      {children}
    </VocabularyContext.Provider>
  )
}

export function useVocabulary(): VocabularyContextType {
  const context = useContext(VocabularyContext)
  return context
}
