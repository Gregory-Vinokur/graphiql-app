import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';

const BaseUrl = 'https://rickandmortyapi.graphcdn.app/';
export type IBodyQuery = {
  bodyQuery: string;
  var?: { [key: string]: unknown };
};
interface IShemaResponce {
  data: IntrospectionQuery;
}

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
    getShema: builder.query<IShemaResponce, void>({
      query: () => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
        }),
      }),
    }),
  }),
});

export { graphQLRequest };
export const { useGetShemaQuery, useLazyGetResponseQuery } = graphQLRequest;
