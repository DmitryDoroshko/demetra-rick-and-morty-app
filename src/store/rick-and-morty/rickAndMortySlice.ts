import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import {ICharacter} from "../../model/types";

export interface RickAndMortyState {
  charactersLoaded: ICharacter[];
  charactersSortedByName: ICharacter[];
  charactersLoading: boolean;
  charactersError: null | string;
  singleSpecificCharacterLoaded: ICharacter | null;
  filterCharactersString: string;
  charactersFiltered: ICharacter[];
}

const initialState: RickAndMortyState = {
  charactersLoaded: [],
  charactersSortedByName: [],
  charactersLoading: false,
  charactersError: null,
  singleSpecificCharacterLoaded: null,
  filterCharactersString: "",
  charactersFiltered: [],
};

const rickAndMortySlice = createSlice({
  name: "rickAndMorty",
  initialState,
  reducers: {
    setCharactersLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.charactersLoading = payload;
    },
    setCharactersError: (state, {payload}: PayloadAction<string>) => {
      state.charactersError = payload;
    },
    setCharactersLoaded: (state, {payload}: PayloadAction<ICharacter[]>) => {
      state.charactersLoaded = payload;
      state.charactersFiltered = [...state.charactersLoaded]
          .sort((character1: ICharacter, character2: ICharacter) => character1.name.localeCompare(character2.name));
    },
    setFilterCharacterString: (state, {payload}: PayloadAction<string>) => {
      state.filterCharactersString = payload;

      if (payload.trim() === "") {
        state.charactersFiltered = [...state.charactersLoaded]
            .sort((character1: ICharacter, character2: ICharacter) => character1.name.localeCompare(character2.name));
      } else {
        state.charactersFiltered = state.charactersLoaded
            .filter(character => {
              if (character.name.toLowerCase().includes(payload.toLowerCase())) {
                return true;
              } else {
                return false;
              }
            })
            .sort((character1: ICharacter, character2: ICharacter) => character1.name.localeCompare(character2.name));
      }

    },
    setCharactersFiltered: (state, {payload}: PayloadAction<ICharacter[]>) => {
      state.charactersFiltered = payload
          .sort((character1: ICharacter, character2: ICharacter) => character1.name.localeCompare(character2.name));
    }
  },
});

export const {
  setCharactersLoading,
  setCharactersError,
  setCharactersLoaded,
  setFilterCharacterString,
  setCharactersFiltered,
} = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;

export const selectCharactersLoaded = (state: RootState) => state.rickAndMortyReducer.charactersLoaded;
export const selectCharactersFiltered = (state: RootState) => state.rickAndMortyReducer.charactersFiltered;
export const selectCharactersLoading = (state: RootState) => state.rickAndMortyReducer.charactersLoading;
export const selectCharactersError = (state: RootState) => state.rickAndMortyReducer.charactersError;
export const selectFilterCharacterString= (state: RootState) => state.rickAndMortyReducer.filterCharactersString;
