import React from "react";
import { IProductCart } from "../interface/OrderLine";
import { IProduct } from "../interface/Product";

interface CartContextState {
  totalProduct: number;
  totalPrice: number;
  products: Array<IProductCart>;
  addProducts: (product: IProduct) => void;
  descreaseProduct: (product: IProduct) => void;
  clearCart: () => void;
}

export const CartContext = React.createContext<CartContextState>({
  totalProduct: 0,
  totalPrice: 0,
  products: [],
  addProducts: () => {},
  descreaseProduct: () => {},
  clearCart: () => {},
});
