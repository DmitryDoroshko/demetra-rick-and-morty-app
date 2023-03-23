import React, {useContext, useEffect} from "react";
import defaultCharacterImage from "../../assets/img/defaultCharacterImage.png";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/redux-hooks";
import {
  selectCharactersError, selectCharactersFiltered,
  selectCharactersLoaded,
  selectCharactersLoading
} from "../../store/rick-and-morty/rickAndMortySlice";
import Character from "../Character/Character";
import {ICharacter} from "../../model/types";
import AuthContext from "../../context/auth-context";

type CharactersProps = {
  characters: ICharacter[];
};

const Characters: React.FC<CharactersProps> = ({characters}) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const charactersLoading = useAppSelector(selectCharactersLoading);
  const charactersError = useAppSelector(selectCharactersError);

  let dataToDisplay: any = characters.map(character => {
    return <Character key={character.id} id={character.id} name={character.name} species={character.species}
                      image={character.image}/>
  });

  if (dataToDisplay.length === 0) {
    dataToDisplay = <h1>No characters found...</h1>;
  }

  if (charactersLoading) {
    dataToDisplay = <h1 className={"center-text"}>Loading...</h1>;
  }

  if (charactersError) {
    dataToDisplay = <h1 className={"center-text"}>Error {charactersError}...</h1>;
  }

  return (
      <main className="characters">
        <div className="container">
          <div className="characters__inner">
            {dataToDisplay}
          </div>
        </div>
      </main>
  );
};

export default Characters;