import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../Store";
import { useNavigate } from "react-router";
import { setUserName } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch=useDispatch<DispatchType>()
  const naviagte=useNavigate()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(username){
      dispatch(setUserName(username))
      naviagte('/menu')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <p className="mb-3 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input w-2/4 mb-5"
      />

      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
