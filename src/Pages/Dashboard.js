import React, { useEffect, useState } from "react";
import { Appbar } from "../Component/Appbar";
import { Balance } from "../Component/Balance";
import { Users } from "../Component/Users";
import { balanceRoute } from "../ApiRoutes/routes";
import axios from "axios";
export const Dashboard = () => {
  const [balence, setBalence] = useState(0);

  useEffect(() => {
    const fetchBalence = async () => {
      try {
        const token = await JSON.parse(localStorage.getItem("token"));
        console.log(token);
        const response = await axios.get(balanceRoute, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setBalence(response.data.balence);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBalence();
  }, []);

  return (
    <div className="bg-zinc-800 text-white">
      <Appbar />
      <div className="m-8">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
};
