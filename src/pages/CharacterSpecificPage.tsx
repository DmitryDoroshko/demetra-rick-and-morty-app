import React, {useContext, useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import AuthContext, {UserAuth} from "../context/auth-context";
import arrowBackImg from "../assets/arrowBack.png";
import CharacterSpecific from "../components/CharacterSpecific/CharacterSpecific";
import {useGetSingleCharacterByIdQuery} from "../services/rick-and-morty.service";
import {useAppSelector} from "../hooks/redux-hooks";
import {selectFilterCharacterString} from "../store/rick-and-morty/rickAndMortySlice";

function CharacterSpecificPage() {
  const {characterId} = useParams();
  const navigate = useNavigate();
  const {signOut} = UserAuth();
  const filterStringFromStore = useAppSelector(selectFilterCharacterString);

  const {data: loadedCharacter, isLoading, isError} = useGetSingleCharacterByIdQuery(characterId!);

  const logoutHandler = async () => {
    await signOut();
    navigate("/login");
  };

  let dataToShow;

  if (loadedCharacter) {
    dataToShow = <CharacterSpecific id={loadedCharacter.id} name={loadedCharacter.name}
                           species={loadedCharacter.species} image={loadedCharacter.image}
                           gender={loadedCharacter.gender} origin={loadedCharacter.origin}
                           status={loadedCharacter.status} type={loadedCharacter.type}/>;
  }

  if (isLoading) {
    dataToShow = <h1 className={"center-text"}>Character with id {characterId} is loading...</h1>;
  }

  if (isError) {
    dataToShow = <h1 className={"center-text"}>Error loading character with id {characterId}</h1>;
  }

  return (
      <>
        <button className="logout-btn" onClick={logoutHandler}>Log Out</button>
        <Link className="go-back-btn" to={`/characters?filterString=${filterStringFromStore}`}>
          <img src={arrowBackImg} alt="Arrow back"/>
          <p>GO BACK</p>
        </Link>
        {dataToShow}
      </>
  );
}

export default CharacterSpecificPage;