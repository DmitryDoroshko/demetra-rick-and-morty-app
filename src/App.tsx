import React, {useEffect, useState} from "react";
import MainPage from "./pages/MainPage";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import CharacterSpecificPage from "./pages/CharacterSpecificPage";
import {AuthProvider} from "./context/auth-context";
import Protected from "./components/Protected/Protected";

const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: <LoginPage/>,
        errorElement: <ErrorPage/>,
      },
      {
        path: "characters/*",
        errorElement: <ErrorPage/>,
        children: [
          {
            index: true,
            element: (
                <Protected>
                  <MainPage/>
                </Protected>
            ),
          },
          {
            path: ":characterId",
            element: (
                <Protected>
                  <CharacterSpecificPage/>,
                </Protected>
            ),
            errorElement: <ErrorPage/>
          }
        ]
      },
      {
        path: "*",
        element: <Navigate to={"login"} replace/>
      }
    ],
);

function App() {
  return (
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
  );
}

export default App;
