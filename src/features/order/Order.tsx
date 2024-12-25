// Test ID: IIDSAT

import { LoaderFunction, useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utiles/helpers";
import OrderItem from "./OrderItem";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

export interface MenuPizzaType {
  name: string;
  id: number;
  ingredients: string[];
}

export interface CartItemType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
export interface OrderProperitesType {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  priorityPrice: number;
  status: string;
  orderPrice: number;
  cart: CartItemType[];
}

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const data = useLoaderData() as OrderProperitesType;
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = data ;
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state == "idle") fetcher.load("/menu");
  }, [fetcher]);
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcherItems = fetcher.data ? (fetcher.data as MenuPizzaType[]) : [];
  // console.log(fetcher.data);

  return (
    <div className="space-y-8 px-3 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div>
          {priority && (
            <span className="mr-2 rounded-full bg-red-500 px-3 py-1 text-center text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-center text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-stone-200 px-3 py-2">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y-2 divide-stone-200 border-b-2 border-t-2 border-stone-200">
        {cart.map((c) => (
          <OrderItem isLoadingIngredients={fetcher.state==='loading'} item={c} key={c.pizzaId} ingredients={fetcherItems.find((p)=>p.id===c.pizzaId)?.ingredients ?? []} />
        ))}
      </ul>

      <div className="space-y-3 rounded-md bg-stone-200 px-3 py-3">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder/>}
    </div>
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const response = await getOrder(params.orderId as string);

  return response;
};

export default Order;
