import { Outlet, useNavigation } from "react-router";
import CartOverview from "../features/card/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading" ? true : false;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
       {isLoading && <Loader/>}

      <div className="overflow-auto">
        <main className="  max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
};

export default AppLayout;
