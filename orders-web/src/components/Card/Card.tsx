import React from "react";
import styled from "@emotion/styled";
import { IProduct } from "../../interface/Product";
import { formatCurrency } from "../../helpers";
interface CardProps {
  sku: string;
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart: (product: IProduct) => void;
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Name = styled.div`
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;
const Image = styled.img`
  width: 315px;
  height: 425px;
  object-fit: contain;
  :hover {
    box-shadow: 1px 1px 7px 2px #e0e0e0;
  }
`;
const Price = styled.div`
  margin-top: 8px;
  font-size: 14px;
`;
const AddToCartBtn = styled.button`
  font-size: 2rem;
  background-color: #fff;
  width: 100%;
  margin-top: 1rem;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  :hover {
    border: 1px solid #000000;
  }
`;
const Card: React.FC<CardProps> = ({
  sku,
  name,
  price,
  imageUrl,
  onAddToCart,
}: CardProps) => {
  return (
    <Wrapper>
      <Image src={imageUrl} />
      <Name>{name}</Name>
      <Price>
        {formatCurrency(price)}
      </Price>
      <AddToCartBtn onClick={() => onAddToCart({ sku, price, imageUrl, name })}>
        +
      </AddToCartBtn>
    </Wrapper>
  );
};

export default Card;
