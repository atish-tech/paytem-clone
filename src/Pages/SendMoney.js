import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { transfermMoneyRoute } from "../ApiRoutes/routes";
import axios from "axios";
import { useRef, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import SuccessTran from "../Assect/sucess-animation.gif";
import { LogoImage } from "../Component/LogoImage";
export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("key");
  const userName = searchParams.get("userName");
  const [amount, setAmount] = useState();
  const toast = useToast();
  const navigateTo = useNavigate();
  const [moneyTransferProcess, setMoneyTransferProcess] = useState(false);
  const manageRef = useRef();
  const [sucessTransection, setSucessTransation] = useState(false);

  const handleTost = async ({ title, description, status }) => {
    await toast({
      title,
      description,
      status,
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };

  const handelSendMoney = async () => {
    try {
      setMoneyTransferProcess(true);

      const token = await JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        transfermMoneyRoute,
        {
          to: id,
          amount: amount,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      handleTost({ title: response.data.message, status: "success" });
      setMoneyTransferProcess(false);
      setSucessTransation(true);

      setTimeout(() => {
        setSucessTransation(false);
        navigateTo("/");
      }, 5000);
    } catch (error) {
      console.log(error);
      handleTost({ title: error.response.data.message, status: "error" });
      setMoneyTransferProcess(false);
    }
  };

  return (
    <div ref={manageRef} class="flex justify-center h-screen bg-gray-950">
      <div className="h-full flex flex-col justify-center">
        {sucessTransection ? (
          // sucess transation logo
          <div class=" h-min text-card-foreground max-w-md p-4 space-y-8 w-[90vw] sm:w-[400px] bg-gray-900 text-white shadow-lg rounded-lg">
            <LogoImage src={SuccessTran} width={"w-full"} />
          </div>
        ) : (
          // transation process
          <div class=" h-min text-card-foreground max-w-md p-4 space-y-8 w-[90vw] sm:w-[400px] bg-gray-900 text-white shadow-lg rounded-lg">
            <div>
              <NavLink to="/" class="text-2xl font-bold text-left">
                Back
              </NavLink>
            </div>

            <div class="flex flex-col space-y-1.5 p-6">
              <h2 class="text-3xl font-bold text-center">Send Money</h2>
            </div>

            <div class="p-6">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span class="text-2xl text-white">
                    {" "}
                    {userName[0].toLocaleUpperCase()}{" "}
                  </span>
                </div>
                <h3 class="text-2xl font-semibold"> {userName} </h3>
              </div>
              <div class="space-y-4">
                <div class="space-y-2">
                  <label
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    type="number"
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-black text-sm"
                    id="amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <button
                  onClick={handelSendMoney}
                  class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                >
                  {moneyTransferProcess ? <Spinner /> : "Initiate Transfer"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
