import React, { useEffect, useState } from "react";
import { Appbar } from "../Component/Appbar";
import { Balance } from "../Component/Balance";
import { Users } from "../Component/Users";
import { balanceRoute, getUserDataRoute } from "../ApiRoutes/routes";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { useDebouncing } from "../Hoock/useDebouncing";

export const Dashboard = () => {
  const [balence, setBalence] = useState(0);
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const navigateTo = useNavigate();
  const searchValueDebounce = useDebouncing(search);

  // check user is login or not
  useEffect(() => {
    if(!localStorage.getItem("token"))
    navigateTo("/login");
  } , []);

  // Fetch balence 
  useEffect(() => {

    const fetchBalence = async () => {
      try {
        const token = await JSON.parse(localStorage.getItem("token"));

        const balenceResponse = await axios.get(balanceRoute, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setBalence(balenceResponse.data.balence);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBalence();
  }, []);

  // Fetch all user or searched user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await JSON.parse(localStorage.getItem("token"));
        const allUserData = await axios.get(
          `${getUserDataRoute}/?filter=${search}`,
          { headers: { authorization: `Bearer ${token}` } }
        );

        setUsers(allUserData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [searchValueDebounce]);

  return (
    <div className="bg-zinc-800 text-white w-screen h-screen">
      <Appbar />
      <div className="m-8">
        <Balance value={balence} />
        <Users searchValue={search} setSearch={setSearch} users={users} />
      </div>
    </div>
  );
};