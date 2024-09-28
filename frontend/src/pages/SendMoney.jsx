import { useState } from "react";
import Heading from "../components/Heading";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className=" rounded-lg p-4 bg-white shadow-md w-96 ">
        <div className="text-center mb-[4rem]">
          <Heading label={"Send Money"} />
        </div>
        <div className="flex justify-start items-center">
          <div className="bg-green-500 rounded-full w-12 h-12 mr-2 flex justify-center">
            <div className="text-white text-2xl font-medium flex justify-center items-center">
              {name[0].toUpperCase()}
            </div>
          </div>
          <div className="text-xl font-semibold">{name}</div>
        </div>
        <div className="font-semibold ml-1 mt-2 ">Amount (in Rs)</div>
        <div className="my-4 w-full ml-3">
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            className="w-full outline-none"
            type="text"
            placeholder="Enter Amount"
          />
        </div>
        <div className=" bg-green-500 text-white text-center p-2 rounded-md font-medium hover:bg-green-600">
          <button
            onClick={() => {
              axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: id,
                  amount,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
            }}
            className="pointer w-full"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
