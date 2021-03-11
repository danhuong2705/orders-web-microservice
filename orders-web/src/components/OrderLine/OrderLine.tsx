import styled from "@emotion/styled";
import React, { useState } from "react";
import { formatCurrency } from "../../helpers";
import { IOrderLine } from "../../interface/OrderLine";

interface OrderLineProps {
  sku: string;
  name: string;
  quantity: number;
  imageUrl: string;
  price: number;
  onIncreaseProduct?: (product: IOrderLine) => void;
  onDecreaseProduct?: (product: IOrderLine) => void;
}
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.25rem;
  align-items: center;
`;
const Image = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: contain;
`;
const Name = styled.div`
  margin-left: 0.5rem;
`;
const QuantityBlock = styled.div`
  margin-right: 3rem;
  display: flex;
  justify-content: space-between;
`;
const IncreaseBtn = styled.button`
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  width: 2.5rem;
  height: 1.5rem;
  :hover {
    border: 1px solid #000000;
  }
`;
const Price = styled.div``;
const DecreaseBtn = styled(IncreaseBtn)``;
const Quantity = styled.div`
  margin: 0 1rem;
`;
const BlockRight = styled.div`
  display: flex;
`;
const OrderLine: React.FC<OrderLineProps> = ({
  sku,
  name,
  quantity,
  imageUrl,
  price,
  onDecreaseProduct,
  onIncreaseProduct,
}: OrderLineProps) => {
  const [quantityValue, setQuantityValue] = useState(quantity);

  return (
    <Wrapper>
      <Wrapper>
        <Image src={imageUrl} alt="product-image" />
        <Name>{name}</Name>
      </Wrapper>
      <BlockRight>
        <QuantityBlock>
          {onIncreaseProduct && (
            <IncreaseBtn
              onClick={() => {
                onIncreaseProduct({
                  sku,
                  name,
                  price,
                  imageUrl,
                  quantity: quantityValue,
                });
                setQuantityValue(quantityValue + 1);
              }}
            >
              +
            </IncreaseBtn>
          )}
          <Quantity>{quantityValue}</Quantity>
          {onDecreaseProduct && (
            <DecreaseBtn
              onClick={() => {
                onDecreaseProduct({
                  sku,
                  name,
                  price,
                  imageUrl,
                  quantity: quantityValue,
                });
                setQuantityValue(quantityValue - 1);
              }}
            >
              -
            </DecreaseBtn>
          )}
        </QuantityBlock>
        <Price>{formatCurrency(price)}</Price>
      </BlockRight>
    </Wrapper>
  );
};
export default OrderLine;
