# graphiql-app

### This application is a copy of the [GraphiQL](https://www.npmjs.com/package/@graphiql/react) playground made by the team ([Gregory](https://github.com/gregory-vinokur), [Sergey](https://github.com/m0rl0ck), [Artem](https://github.com/artemkamyshenkov)) as part of the final project for [React Course](https://rs.school/react/).
+ Deploy: https://graphiql-party-team.vercel.app/
+ Backend, Database: https://firebase.google.com/
+ GraphQL API: https://rickandmortyapi.com/graphql

## Stack
+ TypeScript
+ CSS Modules
+ Next.js
+ Redux - RTK + RTK Query

## Libraries
+ [react-intl](https://www.npmjs.com/package/react-intl) (The library that help you setup internationalization in any project whether it's React or no)
+ [MUI 5](https://mui.com/) (MUI offers a comprehensive suite of UI tools to help you ship new features faster.)
+ [firebase](https://firebase.google.com/) (Database, backend for user authentication)
+ [formik](https://formik.org/) (Formik is the world's most popular open source form library for React and React Native.)
+ [@uiw/react-codemirror](https://github.com/uiwjs/react-codemirror) (React wrapper for CodeMirror text editor.)
+ [cm6-graphql](https://www.npmjs.com/package/cm6-graphql) (Provides CodeMirror 6 extension with a parser mode for GraphQL along with autocomplete and linting powered by your GraphQL Schema.)


## Setup and Running

### Clone this repository:
`$ git clone https://github.com/Gregory-Vinokur/graphiql-app.git`

### Install dependencies:
`$ npm install`

### Add the following keys for firebase auth to work in `.env.local` file:

``` NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Running the app
`$ npm run dev`

### Prepare for production
`$ npm run build`
### App
![Welcome_page](https://github.com/Gregory-Vinokur/graphiql-app/assets/98179706/e54bfe87-bbee-4da1-905d-5b85587fd530)
![Main page](https://github.com/Gregory-Vinokur/graphiql-app/assets/98179706/368626c5-d41a-419f-81bf-dac5cb85d231)
