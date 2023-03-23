import React from "react";
import {Link} from "react-router-dom";
import {ICharacter} from "../../model/types";

const Character = (props: ICharacter) => {
  return (
      <div className="characters__character">
        <Link to={`${props.id}`} className="characters__link">
          <img src={props.image} alt={`A character ${props.name}`} className="character__img"/>
        </Link>
        <div className="characters__info">
          <p className="characters__name">{props.name}</p>
          <p className="characters__species">{props.species}</p>
        </div>
      </div>
  );
};

export default Character;