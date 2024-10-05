import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import Appbar from "../components/Appbar";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-400 h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center p-2 h-max px-8">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signin",
                    {
                      username,
                      password,
                    }
                  );

                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  console.error(
                    "Error signing in",
                    error.response ? error.response.data : error.message
                  );
                }
              }}
              label={"Sign In"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
