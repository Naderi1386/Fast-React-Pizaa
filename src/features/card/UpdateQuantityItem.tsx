import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { DispatchType, StoreType } from "../../Store";
import { decreaseItemQuantity, increaseItemQuantity, ShowQuantity } from "./CartSlice";
import { useSelector } from "react-redux";

interface UpdateQuantityItemPropType {
  pizzaId:number
}

const UpdateQuantityItem = ({ pizzaId }: UpdateQuantityItemPropType) => {
    const dispatch=useDispatch<DispatchType>()
    const quantity=useSelector<StoreType>(ShowQuantity(pizzaId))
    

  return (
    <div className="flex gap-2 md:gap-3
     items-center">
        <Button type="rounded" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span>{quantity as number}</span>
        <Button type="rounded" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  );
};

export default UpdateQuantityItem;
