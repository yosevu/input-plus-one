export enum SearchIndex {
  EngSwa = 'eng-swa',
  SwaEng = 'swa-eng',
}

export interface SearchItem {
  h: string;
  w: string;
  v: string[];
  objectID: string;
  _highlightResult: {
    h: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    };
    w: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    };
    v: Array<{
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: string[];
    }>;
  };
  __position: number;
}