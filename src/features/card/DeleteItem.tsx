import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { DispatchType } from "../../Store";
import { deleteItem } from "./CartSlice";

interface DeleteItemPropItem{
    id:number
}

const DeleteItem = ({id}:DeleteItemPropItem) => {
    const dispatch=useDispatch<DispatchType>()
  return <Button type="small" onClick={()=>dispatch(deleteItem(id))}>delete</Button>;
};

export default DeleteItem;
