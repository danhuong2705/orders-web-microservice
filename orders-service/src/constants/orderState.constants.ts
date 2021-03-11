import configuration from '../config/configuration';

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

export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
export const CREATED_ORDER_EVENT = 'created-order-event';
export const VERIFIED_ORDER_EVENT = 'verified-order-event';

