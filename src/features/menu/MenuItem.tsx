import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utiles/helpers";
import { PizzaMenuItemType } from "./Menu";
import { DispatchType, StoreType } from "../../Store";
import { addItem, getQuantitiesOfPizza } from "../card/CartSlice";
import { PizzaType } from "../card/Cart";
import DeleteItem from "../card/DeleteItem";
import { useSelector } from "react-redux";
import UpdateQuantityItem from "../card/UpdateQuantityItem";

interface MenuItemPropType {
  pizza: PizzaMenuItemType;
}

function MenuItem({ pizza }: MenuItemPropType) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // Jonas's way 👇

  const pizzaQuantity = useSelector<StoreType>(getQuantitiesOfPizza(id));
  const quantity = pizzaQuantity as number;

  const isInCart = quantity > 0;

  // My way 👇
  // const cart=useSelector<StoreType>(getCart)
  // const cartItems=cart as PizzaType[]
  // const pizzas=cartItems.map((c)=>c.name)
  // const isCart=pizzas.includes(name)

  const dispacth = useDispatch<DispatchType>();
  const handleAddToCart = () => {
    const newItem: PizzaType = {
      name,
      unitPrice,
      pizzaId: id,
      quantity: 1,
      totalPrice: unitPrice,
    };
    dispacth(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut && "opacity-70 grayscale"}`}
      />
      <div className="flex w-full flex-col justify-between">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm capitalize italic text-stone-500">
            {ingredients.join(", ")}
          </p>
        </div>
        <div className="flex items-end justify-between text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}
          {isInCart && (
            <div className="flex gap-2 md:gap-3">
              <UpdateQuantityItem pizzaId={id} />
              <DeleteItem id={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button isDisabled={soldOut} type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
