import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserAuth} from "../context/auth-context";
import {useAppSelector} from "../hooks/redux-hooks";
import {selectFilterCharacterString} from "../store/rick-and-morty/rickAndMortySlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const {user, signInWithGoogle} = UserAuth();
  const filterStringFromStore = useAppSelector(selectFilterCharacterString);

  useEffect(() => {
    console.log("LoginPage useEffect filterStringFromStore", filterStringFromStore);
    if (user != null) {
      navigate(`/characters?filterString=${filterStringFromStore}`);
    }
  }, [user]);

  const loginWithGoogleHandler = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  let contentToDisplay;
  if (user) {
    contentToDisplay = (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <Link to={`/characters?filterString=${filterStringFromStore}`} className={"login-btn"}>Go to characters</Link>
        </>
    );
  } else {
    contentToDisplay = (
        <button className="login-btn" onClick={loginWithGoogleHandler}>
          Log In With Google
        </button>
    );
  }

  return (
      <div className={"center-item"}>
        <h1>Login Page</h1>
        {contentToDisplay}
      </div>
  );
};

export default LoginPage;