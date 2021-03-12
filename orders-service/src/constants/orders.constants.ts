export enum ORDER_STATE {
  CREATED,
  CONFIRMED,
  DELIVERED,
  CANCELLED,
}
export enum PAYMENT_STATE {
  DECLINED,
  CONFIRMED,
}
export const DELAY_TIME = 15000;

export const CREATE_ORDER_MSG_PARTTEN = 'create-order';
export const VERIFY_ORDER_MSG_PARTTEN = 'verify-order';
export const UPDATE_ORDER_MSG_PARTTEN = 'update-order';
export const GET_ORDER_DETAIL_MSG_PARTTEN = 'get-order-detail';
export const GET_ORDER_LIST_MSG_PARTTEN = 'get-order-list';
export const HANDLE_CREATED_ORDER_MSG_PARTTEN = 'handle-created-order';

export const UPDATE_STATE_CONDITION_GROUP = [
  { current: ORDER_STATE.CREATED, update: ORDER_STATE.CANCELLED },
  { current: ORDER_STATE.CONFIRMED, update: ORDER_STATE.CANCELLED },
  { current: ORDER_STATE.CREATED, update: ORDER_STATE.CONFIRMED },
  { current: ORDER_STATE.CONFIRMED, update: ORDER_STATE.DELIVERED },
];
