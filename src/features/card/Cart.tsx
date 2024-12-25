import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { DispatchType, StoreType } from "../../Store";
import { UserType } from "../user/userSlice";
import {  clearCart, getCart, getUserName } from "./CartSlice";
import { useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";
export interface PizzaType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}



function Cart() {
  const dispatch=useDispatch<DispatchType>()
  const cart = useSelector<StoreType>(getCart);
  const cartItems = cart as PizzaType[];

  const userState = useSelector<StoreType>(getUserName);
  const { userName } = userState as UserType;

  if(cartItems.length==0) return <EmptyCart/>


  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu"> &larr; Back to menu</LinkButton>

      <h2 className="mb-1 mt-4 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="mb-5 divide-y-2 divide-stone-200 border-b-2">
        {cartItems.map((c) => (
          <CartItem item={c} key={c.pizzaId} />
        ))}
      </ul>

      <div className="space-x-3">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={()=>dispatch(clearCart())}>clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
