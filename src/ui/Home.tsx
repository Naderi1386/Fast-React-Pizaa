import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { StoreType } from "../Store";
import { UserType } from "../features/user/userSlice";
import Button from "./Button";

function Home() {
  const userState = useSelector<StoreType>((store) => store.user);
  const { userName } = userState as UserType;

  return (
    <div className="px-4 py-8 text-center sm:py-16">
      <h1 className="mb-4 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {userName == "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          continue ordering, test
        </Button>
      )}
    </div>
  );
}

export default Home;
