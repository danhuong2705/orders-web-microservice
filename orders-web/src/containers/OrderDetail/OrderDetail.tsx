import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import OrderLine from "../../components/OrderLine";
import { IOrderLine } from "../../interface/OrderLine";
import { IOrder } from "../../interface/Order";
import orderSerice from "../../services/orders";
import { formatCurrency, orderStateMapping } from "../../helpers";
import { DELAY_TIME, ORDER_STATE } from "../../contansts";
import AlertDiaLog from "../../components/AlerDialog";
import { useToast } from "@chakra-ui/react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
const EmptyState = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 7rem;
  margin-bottom: 1rem;
  text-align: center;
`;
const CancelButton = styled.div`
  padding: 0.25rem 2rem;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  :hover {
    border: 1px solid #000000;
  }
`;
const Status = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const StatusWrapper = TotalWrapper.withComponent("aside");
const OrderDetailPage: React.FC = (props: any) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [orderDetail, setOrderDetail] = useState<IOrder>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const getOrderDetail = async (orderId: string) => {
    setLoading(true);
    await orderSerice.getOrderDetail(orderId).then((res) => {
      setLoading(false);
      if (res && res.data) {
        setOrderDetail(res.data);
      }
    });
  };
  const cancelOrder = async () => {
    if (orderDetail) {
      const res = await orderSerice.updateOrderState(
        orderDetail?.orderId,
        ORDER_STATE.CANCELLED
      );
      if (res && res.data) {
        await toast({
          title: "Cancelled order successfully",
          status: "success",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
        window.location.reload();
      }
    }
  };
  useEffect(() => {
    getOrderDetail(props.match.params.orderId);
    const orderDetailInterval = setInterval(
      () => getOrderDetail(props.match.params.orderId),
      DELAY_TIME
    );
    return () => clearInterval(orderDetailInterval);
  }, [props.match.params.orderId]);
  return (
    <Wrapper>
      {!loading && (
        <>
          {!orderDetail ? (
            <>
              <EmptyState>Order Not Found</EmptyState>
            </>
          ) : (
            <>
              <Title>Order Detail</Title>
              <StatusWrapper>
                <div>
                  ORDER STATE:{" "}
                  <Status>{orderStateMapping(orderDetail.state)}</Status>
                </div>

                {orderDetail.state === ORDER_STATE.CONFIRMED && (
                  <CancelButton onClick={() => setOpenDialog(true)}>
                    CANCEL
                  </CancelButton>
                )}
              </StatusWrapper>
              {orderDetail.orderItems.map((orderLine: IOrderLine) => (
                <OrderLine {...orderLine} key={orderLine.sku} />
              ))}
              <TotalWrapper>
                <Label>Total</Label>
                <Price>
                  {formatCurrency(orderDetail.totalPrice as number)}
                </Price>
              </TotalWrapper>
            </>
          )}
          <AlertDiaLog
            description="Do you really want to cancel order?"
            isOpen={openDialog}
            onClose={() => setOpenDialog(false)}
            onActionDialog={() => cancelOrder()}
          />
        </>
      )}
    </Wrapper>
  );
};

export default OrderDetailPage;
