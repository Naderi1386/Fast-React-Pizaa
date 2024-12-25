import { useState } from "react";
import { useNavigate } from "react-router";

const SearchOrder = () => {
  const navigate = useNavigate();
  const [searchOrder, setSearchOrder] = useState("");
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchOrder) {
      navigate(`/order/${searchOrder}`);
      setSearchOrder("");
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="search order #"
        value={searchOrder}
        onChange={(e) => setSearchOrder(e.target.value)}
        className="inline-block text-xs w-[7.4rem] rounded-full sm:text-sm bg-yellow-100 px-4 py-2  transition-all duration-200 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 sm:w-60 sm:focus:w-72"
      />
    </form>
  );
};

export default SearchOrder;
