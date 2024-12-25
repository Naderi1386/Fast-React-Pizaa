import { PizzaType } from "./Cart";
import { formatCurrency } from "../../utiles/helpers";
import DeleteItem from "./DeleteItem";
import UpdateQuantityItem from "./UpdateQuantityItem";



interface CartItemPropType{
  item:PizzaType
}

function CartItem({ item }:CartItemPropType) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center  justify-between sm:justify-start sm:gap-3">
        <p className="font-semibold"> {formatCurrency(totalPrice)}</p>
        <UpdateQuantityItem pizzaId={pizzaId}/>
        <DeleteItem id={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
