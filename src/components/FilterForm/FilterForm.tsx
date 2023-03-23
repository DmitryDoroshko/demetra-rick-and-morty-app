import React, {useEffect, useState} from "react";
import searchIcon from "../../assets/img/searchIcon.png";
import {useDebounce} from "../../hooks/useDebounce";
import {setFilterCharacterString} from "../../store/rick-and-morty/rickAndMortySlice";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {useNavigate, useSearchParams} from "react-router-dom";

const FilterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterStringFromParams = searchParams.get("filterString") || "";
  const [filterString, setFilterString] = useState<string>(filterStringFromParams);
  const debouncedFilterString = useDebounce<string>(filterString, 1000);

  const filterStringChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterString(event.target.value);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setFilterCharacterString(debouncedFilterString));
    navigate({pathname: "/characters", search: `?filterString=${debouncedFilterString}`});
  };

  useEffect(() => {
    dispatch(setFilterCharacterString(debouncedFilterString));
    navigate({pathname: "/characters", search: `?filterString=${debouncedFilterString}`});
  }, [debouncedFilterString]);

  return (
      <form className="filter-form" onSubmit={formSubmitHandler}>
        <div className="container">
          <div className="filter-form__inner">
            <div className="filter-form__search">
              <button className={"filter-form__btn"}>
                <img src={searchIcon} alt="Search icon" className={"filter-form__icon"}/>
              </button>
              <input type={"text"} className="filter-form__input" placeholder={"Filter by name..."} value={filterString}
                     onChange={filterStringChangeHandler}/>
            </div>
          </div>
        </div>
      </form>
  );
};

export default FilterForm;