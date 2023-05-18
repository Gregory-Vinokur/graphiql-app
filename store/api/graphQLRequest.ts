import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BaseUrl = 'https://rickandmortyapi.graphcdn.app/';
export type IBodyQuery = {
  bodyQuery: string;
  var?: { [key: string]: unknown };
};
interface ISchemaResponse {
  data: {
    __schema: {
      [key: string]: unknown;
    };
  };
}
const schema =
  '\n    query IntrospectionQuery {\n      __schema {\n        \n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          \n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      \n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n      \n      \n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ';

const graphQLRequest = createApi({
  reducerPath: 'graphQLRequest',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({
    getResponse: builder.query<{ [key: string]: unknown }, IBodyQuery>({
      query: (body: IBodyQuery) => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: body.bodyQuery,
          variables: body.var || {},
        }),
      }),
    }),
    getSchema: builder.query<ISchemaResponse, string>({
      query: () => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: schema,
        }),
      }),
    }),
  }),
});

export { graphQLRequest };
export const { useGetSchemaQuery, useLazyGetResponseQuery } = graphQLRequest;
