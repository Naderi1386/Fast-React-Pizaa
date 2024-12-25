import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StoreType } from "../../Store";
import { getCountOfPizza, getPriceOfPizza } from "./CartSlice";



function CartOverview() {
  const totalPrice=useSelector<StoreType>(getPriceOfPizza)
  
  const totalPizza = useSelector<StoreType>(getCountOfPizza)

  if(!totalPizza) return null

   
  

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-3 font-semibold text-stone-300 sm:space-x-5">
        <span>{totalPizza as number} pizzas</span>
        <span>${totalPrice as number}.00</span>
      </p>
      <Link to={"/cart"} className="inline-block">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
