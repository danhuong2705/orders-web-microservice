import configuaration from "../config/configuaration";
import { ORDER_STATE } from "../contansts";
import { TOKEN } from "../contansts/data-dummy";

const BASE_URL = configuaration().baseURL;
const createOrder = async (data: any) => {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const result = await res.json();
  return result;
};

const getListOrder = async () => {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const result = await res.json();
  return result;
};

const getOrderDetail = async (orderId: string) => {
  const res = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const result = await res.json();
  return result;
};

export const updateOrderState = async (orderId: string, state: ORDER_STATE) => {
  const res = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ state }),
  });
  const result = await res.json();
  return result;
};
const orderService = {
  createOrder,
  getListOrder,
  getOrderDetail,
  updateOrderState,
};
export default orderService;
