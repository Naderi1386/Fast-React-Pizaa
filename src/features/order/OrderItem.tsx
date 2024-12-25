import { formatCurrency } from "../../utiles/helpers";
import { CartItemType } from "./Order";
interface OrderItemPropType{
  item:CartItemType
  ingredients:string[]
  isLoadingIngredients:boolean
}

function OrderItem({item,ingredients,isLoadingIngredients}:OrderItemPropType) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2">
      <div className="flex items-center justify-between text-sm mb-2">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">{isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}</p>
    </li>
  );
}

export default OrderItem;
