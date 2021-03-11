import React, { Suspense, useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CartPage from "./containers/Cart";
import HomePage from "./containers/Home";
import { createBrowserHistory } from "history";
import { CartContext } from "./contexts/cartContext";
import { IOrderLine, IProductCart } from "./interface/OrderLine";
import { IProduct } from "./interface/Product";
import OrdersManagementPage from "./containers/OrdersManagement";
import OrderDetailPage from "./containers/OrderDetail";
import { useToast } from "@chakra-ui/react";
export const browserHistory = createBrowserHistory();

function App() {
  const [products, setProducts] = useState<Array<IProductCart>>([]);
  const toast = useToast();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("cart");
      if (cart) {
        setProducts(JSON.parse(cart));
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(products));
    }
  }, [products]);
  const addProducts = (product: IProduct) => {
    const isContain = products.findIndex(
      (orderLine: IProductCart) => orderLine.sku === product.sku
    );
    if (isContain < 0) {
      const newOrderLine: Array<IProductCart> = [
        {
          ...product,
          quantity: 1,
          addedAt: new Date(),
        },
      ];
      setProducts(
        [...products, ...newOrderLine].sort(
          (productA: IProductCart, productB: IProductCart) =>
            productA.addedAt.valueOf() - productB.addedAt.valueOf()
        )
      );
      toast({
        title: "Add to cart successfully",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    } else {
      const containedProduct = products.find(
        (orderLine: IProductCart) => orderLine.sku === product.sku
      );
      const newOrderLines = products.filter(
        (orderLine: IProductCart) => orderLine.sku !== product.sku
      );
      if (containedProduct) {
        const newOrderLine = [
          {
            ...containedProduct,
            quantity: containedProduct.quantity + 1,
          },
        ];
        setProducts(
          [...newOrderLines, ...newOrderLine].sort(
            (productA: IProductCart, productB: IProductCart) =>
              productA.addedAt.valueOf() - productB.addedAt.valueOf()
          )
        );
      }
    }
  };

  const descreaseProduct = (product: IProduct) => {
    const containedProduct = products.find(
      (orderLine: IOrderLine) => orderLine.sku === product.sku
    );
    const newOrderLines = products.filter(
      (orderLine: IOrderLine) => orderLine.sku !== product.sku
    );
    if (containedProduct) {
      const newOrderLine = [
        {
          ...containedProduct,
          quantity: containedProduct.quantity - 1,
        },
      ];
      if (newOrderLine[0].quantity > 0) {
        setProducts(
          [...newOrderLines, ...newOrderLine].sort(
            (productA: IProductCart, productB: IProductCart) =>
              productA.addedAt.valueOf() - productB.addedAt.valueOf()
          )
        );
      } else {
        setProducts(
          newOrderLines.sort(
            (productA: IProductCart, productB: IProductCart) =>
              productA.addedAt.valueOf() - productB.addedAt.valueOf()
          )
        );
      }
    }
  };

  const clearCart = () => {
    setProducts([]);
  };
  return (
    <CartContext.Provider
      value={{
        products: products,
        totalProduct: products.reduce(
          (acc: number, currProduct: IOrderLine) => acc + currProduct.quantity,
          0
        ),
        totalPrice: products.reduce(
          (acc: number, currProduct: IOrderLine) =>
            acc + currProduct.quantity * currProduct.price,
          0
        ),
        addProducts: addProducts,
        descreaseProduct: descreaseProduct,
        clearCart,
      }}
    >
      <Router history={browserHistory}>
        <div className="App">
          <Header />
          <div className="content">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/cart" component={CartPage} />
                <Route
                  exact
                  path="/order-list"
                  component={OrdersManagementPage}
                />
                <Route path="/order/:orderId" component={OrderDetailPage} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
