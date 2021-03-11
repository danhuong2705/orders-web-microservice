import styled from "@emotion/styled";
import React from "react";
import { ORDER_STATE } from "../../contansts";
import { orderStateMapping } from "../../helpers";
import { IOrderLine } from "../../interface/OrderLine";

interface OrderItemProps {
  orderId: string;
  createdAt: string;
  orderItems: Array<IOrderLine>;
  state: ORDER_STATE;
  onViewOrderDetail: (orderId: string) => void;
}
interface StyledOrderItemProps {
  state: ORDER_STATE;
}
const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0 1rem 0;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  :hover {
    background-color: #e0e0e0;
  }
`;

const DateTime = styled.div``;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2rem;
  margin-right: 2rem;
  flex: 1;
`;

const State = styled.div<StyledOrderItemProps>(
  ({ state }: StyledOrderItemProps) => `
  color: ${
    state === ORDER_STATE.CONFIRMED
      ? "#dede01"
      : state === ORDER_STATE.DELIVERED
      ? "#71e463"
      : state === ORDER_STATE.CANCELLED
      ? "#de4444"
      : "#000000"
  };
  font-weight: 500;
  `
);
const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  orderItems,
  createdAt,
  state,
  onViewOrderDetail,
}: OrderItemProps) => {
  return (
    <Wrapper onClick={() => onViewOrderDetail(orderId)}>
      <DateTime>{createdAt.substring(0, 10)}</DateTime>
      <Info>
        {orderItems[0].name}{" "}
        {orderItems.length > 1 &&
          `and ${orderItems.length - 1} other product(s)`}{" "}
      </Info>
      <State state={state}>{orderStateMapping(state)}</State>
    </Wrapper>
  );
};

export default OrderItem;
