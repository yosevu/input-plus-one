# Input Plus One

> "The central hypothesis of the theory is that language acquisition occurs in only one way: by understanding messages." - Stephen Krashen

Input Plus One is a set of tools for learning the Swahili language through understanding the language in its natural spoken and written form.

Planned integrations include
- NHK Swahili Radio podcasts with Google Cloud Speech-to-text for transcripts
- Swahili Wikipedia integration via browser extension
- GPT Chat integration for language assistance


## Technologies

This is the monorepo for a React Native and Next.js apps.

- [Solito](https://solito.dev/)
- [TUKI Dictionary](https://sw.wikipedia.org/wiki/Taasisi_ya_Taaluma_za_Kiswahili)
- [Algolia search](https://www.algolia.com/)
## Set up

### Requirements
- Download Expo Go on Android or iOS
- Yarn
- Algolia Application ID and API Key

### Clone this repository
```sh
git clone git@github.com:yosevu/input-plus-one.git
```

### Add environment variables
- Create a .env in the project root
- Add Algolia Application ID and API key for dictionary data
### Install dependencies
```sh
yarn
```
### Run the native app and follow the instructions in the terminal
```sh
yarn native
```

## Features

### Dictionary Screen
- Search for an English word in the English-Swahili index
- Search for a Swahili word in the Swahili-English index
- Click the green button to switch between Englihs-Swahili and Swahili-English indices
- Click on a word to go to the Word Detail screen

### Vocabulary Screen
- View word, translation, and derivations
- Add word to vocabulary
- Remove word from vocabulary

### Word Detail Screen
- Click the Vocabulary link in the header to go to the Vocabulary screen
- View words added to vocabulary from the Word Detail screen
- Click on a word to go to the Word Detail screen
