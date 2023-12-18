import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ResponseCurrency } from './types'

// Define a service using a base URL and expected endpoints
export const currenciesApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coinbase.com/v2/' }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<ResponseCurrency, string>({
      query: () => `currencies`,
    }),
  }),
})

export const { useGetCurrenciesQuery, useLazyGetCurrenciesQuery } = currenciesApi