// import { useEffect } from "react";
import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import User from "../components/User";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(10000);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.log("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <Appbar />
      <Balance value={balance} />
      <User />
    </div>
  );
};

export default Dashboard;
