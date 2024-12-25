import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { PizzaType } from "../card/Cart";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { DispatchType, store, StoreType } from "../../Store";
import { fetchAddress, getUserState, UserType } from "../user/userSlice";
import {
  clearCart,
  getCart,
  getPriceOfPizza,
  getUserName,
} from "../card/CartSlice";
import EmptyCart from "../card/EmptyCart";
import { formatCurrency } from "../../utiles/helpers";
import { useState } from "react";
import { useDispatch } from "react-redux";

export interface PositionType {
  latitude: number;
  longitude: number;
}

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export interface FormPizzaType {
  customer: string;
  phone: string;
  address: string;
  cart: PizzaType[];
  priority: boolean;
}

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch<DispatchType>();
  const {
    userName,

    address,
    status: positionStatus,
    error: positionError,
    position,
  } = useSelector<StoreType>(getUserState) as UserType;
  const positionValue = position as PositionType;
  const isloadingPosition = positionStatus === "loading";

  const cart = useSelector<StoreType>(getCart) as PizzaType[];
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting" ? true : false;
  const actionData = useActionData();
  const error = actionData as ErrorType;
  const total = useSelector<StoreType>(getPriceOfPizza) as number;
  const priorityPrice = withPriority ? total * 0.2 : 0;
  const totalPrices = total + priorityPrice;
  

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-5 py-8">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="inline-block sm:basis-[25%]">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={userName}
            required
            className="input grow"
          />
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-[25%]">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {error != undefined && error.phone && (
              <p className="mt-[0.40rem] w-full rounded-md bg-red-100 px-1 py-2 text-xs text-red-700">
                {error.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-[25%]">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              required
              disabled={isloadingPosition}
              defaultValue={address}
            />
            {positionStatus == "error" && (
              <p className="mt-[0.40rem] w-full rounded-md bg-red-100 px-[0.35rem] py-2 text-center text-xs text-red-700">
                {positionError}
              </p>
            )}
          </div>
          {!address && (
            <span className="absolute right-2 top-[0.07rem] md:top-[0.45rem]">
              <Button
                type="rounded"
                onClick={() => dispatch(fetchAddress())}
                isDisabled={isloadingPosition}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-6 flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="mr-2 h-5 w-5 accent-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-1"
            value={String(withPriority)}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={positionValue ? `${positionValue.latitude},${positionValue.longitude}` : ''}
          />
          <Button type="small" isDisabled={isSubmitting || isloadingPosition}>
            {isSubmitting
              ? "placing order...."
              : `Order now from ${formatCurrency(totalPrices)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

interface ErrorType {
  phone?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(String(data.cart)),
    priority: data.priority ? true : false,
  };
  

  const orderError = order as FormPizzaType;

  const errors: ErrorType = {};
  if (!isValidPhone(orderError.phone))
    errors.phone =
      "Please give us your correct phone number.We might need it to contact you.";

  if (errors.phone) return errors;

  const response = await createOrder(order as FormPizzaType);
  store.dispatch(clearCart());
  return redirect(`/order/${response.id}`);
};

export default CreateOrder;
