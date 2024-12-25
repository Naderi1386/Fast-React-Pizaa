import { createSlice } from "@reduxjs/toolkit";
import { PizzaType } from "./Cart";
import { UserType } from "../user/userSlice";

export interface CartStateType {
  cart: PizzaType[];
}
const initialState: CartStateType = {
  cart: [],
  // cart: [
  //   {
  //     name: "susage",
  //     pizzaId: 666,
  //     quantity: 2,
  //     unitPrice: 17,
  //     totalPrice: 34,
  //   },
  // ],
};

type ActionUpdateCart = { payload: PizzaType };
type ActionDeleteItem = { payload: number };
type ActionChangedItems = { payload: number };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: ActionUpdateCart) {
      state.cart = [...state.cart, action.payload];
    },
    deleteItem(state, action: ActionDeleteItem) {
      state.cart = state.cart.filter((c) => c.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action: ActionChangedItems) {
      state.cart = state.cart.map((item) =>
        item.pizzaId === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.totalPrice + item.unitPrice,
            }
          : item,
      );
    },
    decreaseItemQuantity(state, action: ActionChangedItems) {
      const item = state.cart.find(
        (c) => c.pizzaId === action.payload,
      ) as PizzaType;
      item.quantity--;
      item.totalPrice -= item.unitPrice;
      if(item.quantity==0) cartSlice.caseReducers.deleteItem(state,action)
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

export interface StateType {
  cart: CartStateType;
  user: UserType;
}

// Jonas's way 👇

export const getQuantitiesOfPizza = (id: number) => (store: StateType) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const ShowQuantity=(id:number)=>(store:StateType)=>store.cart.cart.find((item)=>item.pizzaId==id)?.quantity as number

export const getUserName = (store: StateType) => store.user;

export const getCart = (store: StateType) => store.cart.cart;

export const getCountOfPizza = (store: StateType) =>
  store.cart.cart.reduce(getPizza, 0);

export const getPriceOfPizza = (stote: StateType) =>
  stote.cart.cart.reduce(getPrices, 0);

function getPizza(total: number, item: PizzaType): number {
  return (total + item.quantity) as number;
}
function getPrices(total: number, value: PizzaType) {
  return total + value.totalPrice;
}
