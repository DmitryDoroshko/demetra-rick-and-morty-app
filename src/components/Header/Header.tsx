import React from "react";
import mainThemeImage from "../../assets/img/mainThemeImage.png";

const Header = () => {
  return (
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <img src={mainThemeImage} alt="Rick And Morty main theme picture" className={"header__main-img"}/>
          </div>
        </div>
      </header>
  );
};

export default Header;