import React from "react";
import {ICharacter} from "../../model/types";

const CharacterSpecific = ({gender, id, name, species, origin, type, status, image}: ICharacter) => {
  return (
      <div className="character-specific">

        <div className="character-specific__preview">
          <img src={image} alt="A character image"/>
          <h2>{name}</h2>
        </div>

        <div className="character-specific__info">
          <h3>Information</h3>
          <div className="character-specific__item">
            <h4>Gender</h4>
            <p>{gender}</p>
          </div>

          <div className="character-specific__item">
            <h4>Status</h4>
            <p>{status}</p>
          </div>

          <div className="character-specific__item">
            <h4>Species</h4>
            <p>{species}</p>
          </div>

          <div className="character-specific__item">
            <h4>Origin</h4>
            <p>{origin?.name}</p>
          </div>

          <div className="character-specific__item">
            <h4>Type</h4>
            <p>{type || "Unknown"}</p>
          </div>
        </div>
      </div>
  );
};

export default CharacterSpecific;