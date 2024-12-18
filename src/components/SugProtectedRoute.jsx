/* eslint-disable react/prop-types */
import React from "react";
import { useEffect, useState } from "react";
import useSug from "../hooks/useSug";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function SugProtectedRoute({ children }) {
  const { userId, token } = useSug();
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const session = token;

  useEffect(() => {
    async function getAuthSug(userId) {
      try {
        setLoad(true);
        const response = await fetch(
          `https://student-plug.onrender.com/api/school/getSug/${userId}`
        );
        const result = await response.json();

        console.log(result);
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setLoad(false);
      }
    }
    getAuthSug(userId);
  }, [userId]);

  useEffect(() => {
    if (!session) navigate("/sugsignin");
  });

  if (load) {
    return <Loader />;
  }
  if (session) {
    return children;
  }
}
