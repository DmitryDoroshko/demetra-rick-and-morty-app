import React, {useEffect} from "react";
import {UserAuth} from "../../context/auth-context";
import {Navigate, useSearchParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {setFilterCharacterString} from "../../store/rick-and-morty/rickAndMortySlice";

const Protected = ({children}: any) => {
  const {user} = UserAuth();
  const [params] = useSearchParams();
  const filterStringFromParams = params.get("filterString");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filterStringFromParams) {
      dispatch(setFilterCharacterString(filterStringFromParams))
    }
  }, []);

  if (!user) {
    return <Navigate to={"/login"}/>;
  }

  return children;
};

export default Protected;