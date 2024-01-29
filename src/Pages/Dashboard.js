import React, { useEffect, useState } from "react";
import { Appbar } from "../Component/Appbar";
import { Balance } from "../Component/Balance";
import { Users } from "../Component/Users";
import { balanceRoute, getUserDataRoute } from "../ApiRoutes/routes";
import axios from "axios";
export const Dashboard = () => {
  const [balence, setBalence] = useState(0);
  const [users , setUsers] = useState(null);
  const [search , setSearch] = useState("");

  useEffect(() => {
    const fetchBalence = async () => {
      try {
        const token = await JSON.parse(localStorage.getItem("token"));
        const balenceResponse = await axios.get(balanceRoute, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        
        const allUserData = await axios.get(`${getUserDataRoute}/?filter=${search}`);

        setUsers(allUserData.data);
        setBalence(balenceResponse.data.balence);

      } catch (error) {
        console.log(error);
      }
    };

    fetchBalence();
  }, []);

  return (
    <div className="bg-zinc-800 text-white w-screen h-screen">
      <Appbar />
      <div className="m-8">
        <Balance value={balence} />
        <Users users={users} />
      </div>
    </div>
  );
};
