import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { browserHistory } from "../../App";
import OrderItem from "../../components/OrderItem";
import { DELAY_TIME } from "../../contansts";
import { IOrder } from "../../interface/Order";
import orderSerice from "../../services/orders";
const Wrapper = styled.div`
  margin-top: 7rem;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 7rem;
  margin-bottom: 1rem;
  text-align: center;
`;
const OrdersManagementPage: React.FC = () => {
  const [listOrder, setlistOrder] = useState<Array<IOrder>>([]);

  const getOrderList = async () => {
    await orderSerice.getListOrder().then((res: any) => {
      if (res && res.data) {
        setlistOrder(res.data);
      }
    });
  };
  useEffect(() => {
    getOrderList();

    const orderListInterval = setInterval(() => getOrderList(), DELAY_TIME);
    return () => clearInterval(orderListInterval);
  }, []);

  return (
    <Wrapper>
      <Title>Ordered List</Title>
      {listOrder
        .sort(
          (orderA: IOrder, orderB: IOrder) =>
            new Date(orderB.createdAt).valueOf() -
            new Date(orderA.createdAt).valueOf()
        )
        .map((order: IOrder) => (
          <OrderItem
            key={order.orderId}
            {...order}
            onViewOrderDetail={() => {
              browserHistory.push(`order/${order.orderId}`);
            }}
          />
        ))}
    </Wrapper>
  );
};
export default OrdersManagementPage;
