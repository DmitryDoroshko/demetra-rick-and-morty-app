import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../utils/constants";
import {ICharacter} from "../model/types";

export const rickAndMortyApi = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}
  ),
  tagTypes: ["Characters", "SingleCharacter"],
  endpoints: (builder) => ({
    getAllCharacters: builder.query<ICharacter[], string>({
      query: () => ({url: `/character`}),
      transformResponse: (response: any) => response.results,
      providesTags: () => ["Characters"],
    }),
    getSingleCharacterById: builder.query<ICharacter, string>({
      query: (id) => ({url: `/character/${id}`}),
      providesTags: () => ["SingleCharacter"]
    }),
  }),
});

export const {useGetAllCharactersQuery, useGetSingleCharacterByIdQuery} = rickAndMortyApi;