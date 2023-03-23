import React, {useEffect} from "react";
import Header from "../components/Header/Header";
import FilterForm from "../components/FilterForm/FilterForm";
import Characters from "../components/Characters/Characters";
import {UserAuth} from "../context/auth-context";
import {useNavigate, useSearchParams} from "react-router-dom";
import {rickAndMortyApi} from "../services/rick-and-morty.service";
import {useAppDispatch, useAppSelector} from "../hooks/redux-hooks";
import {
  selectCharactersFiltered,
  setCharactersError,
  setCharactersFiltered,
  setCharactersLoaded, setFilterCharacterString
} from "../store/rick-and-morty/rickAndMortySlice";
import {ICharacter} from "../model/types";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {signOut} = UserAuth();
  const characters = useAppSelector(selectCharactersFiltered);
  const [triggerGetAllCharacters] = rickAndMortyApi.useLazyGetAllCharactersQuery();
  const [searchParams] = useSearchParams();
  const filterStringFromSearchParams = searchParams.get("filterString");

  useEffect(() => {
    if (filterStringFromSearchParams) {
      dispatch(setFilterCharacterString(filterStringFromSearchParams));
    }
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      const {data: charactersLoaded, error} = await triggerGetAllCharacters("", false);
      if (charactersLoaded) {
        let filteredCharactersData = [...charactersLoaded];
        if (filterStringFromSearchParams) {
          filteredCharactersData = charactersLoaded
              .filter(character => {
                if (character.name.toLowerCase().includes(filterStringFromSearchParams.toLowerCase())) {
                  return true;
                } else {
                  return false;
                }
              })
              .sort((character1: ICharacter, character2: ICharacter) => character1.name.localeCompare(character2.name));
        }
        dispatch(setCharactersLoaded(charactersLoaded));
        dispatch(setCharactersFiltered(filteredCharactersData));
      }
      if (error) {
        dispatch(setCharactersError(error.toString()));
      }
    };
    fetchCharacters();
  }, []);

  const logoutHandler = async () => {
    await signOut();
    navigate(`/login`);
  };

  return (
      <>
        <button className="logout-btn" onClick={logoutHandler}>Log Out</button>
        <Header/>
        <FilterForm/>
        <Characters characters={characters}/>
      </>
  );
};

export default MainPage;