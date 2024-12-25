import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
export interface PizzaMenuItemType {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
}

function Menu() {
  const menu=useLoaderData()
  const menuPizza=menu as PizzaMenuItemType[]
  
  return (
    <ul className=" divide-y-2 divide-stone-200  px-3">
      {menuPizza.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export const loader=async ()=>{
  const response=await getMenu()
  return response 

}
export default Menu;
