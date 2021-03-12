import styled from "@emotion/styled";
import React, { useContext } from "react";
import OrderLine from "../../components/OrderLine";
import { CartContext } from "../../contexts/cartContext";
import { IOrderLine } from "../../interface/OrderLine";
import { browserHistory } from "../../App";
import orderService from "../../services/orders";
import { cookNewOrder, formatCurrency } from "../../helpers";
import { useToast } from "@chakra-ui/react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 7rem;
`;
const TotalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;
const Label = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
`;
const Price = styled.div`
  font-size: 1.5rem;
`;

const PaymentBtn = styled.button`
  padding: 1rem 2rem;
  background-color: #000000;
  color: #ffffff;
  width: fit-content;
  cursor: pointer;
  font-weight: bold;
  :hover {
    opacity: 0.8;
  }
`;
const EmptyState = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;
const PaymentWrapper = styled.div`
  text-align: center;
  margin-top: 2rem;
`;
const CartPage: React.FC = () => {
  const cartContext = useContext(CartContext);
  const toast = useToast();

  const createOrder = async () => {
    const newOrder = cookNewOrder(cartContext.products, cartContext.totalPrice);
    const res = await orderService.createOrder(newOrder);
    if (res && !res.statusCode) {
      await toast({
        title: "Created order successfully",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      browserHistory.push("/");
      cartContext.clearCart();
    }
  };
  return (
    <Wrapper>
      {!cartContext.products.length ? (
        <>
          <EmptyState>Your cart is empty. Shopping now!!</EmptyState>
        </>
      ) : (
        <>
          {cartContext.products.map((orderLine: IOrderLine) => (
            <OrderLine
              {...orderLine}
              onIncreaseProduct={cartContext.addProducts}
              onDecreaseProduct={cartContext.descreaseProduct}
              key={orderLine.sku}
            />
          ))}
          <TotalWrapper>
            <Label>Total</Label>
            <Price>{formatCurrency(cartContext.totalPrice as number)}</Price>
          </TotalWrapper>
          <PaymentWrapper>
            <PaymentBtn onClick={() => createOrder()}>CHECKOUT</PaymentBtn>
          </PaymentWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default CartPage;
