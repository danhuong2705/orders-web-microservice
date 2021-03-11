import styled from "@emotion/styled";
import React, { useContext } from "react";
import Card from "../../components/Card";
import { DATA_PRODUCT_DUMMY } from "../../contansts/data-dummy";
import { CartContext } from "../../contexts/cartContext";
import { IProduct } from "../../interface/Product";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 7rem;
  margin-bottom: 1rem;
  text-align: center;
`;
const HomePage: React.FC = () => {
  const cartContext = useContext(CartContext);
  return (
    <>
      <Title>NEW ARRIVALS</Title>
      <Wrapper>
        {DATA_PRODUCT_DUMMY.map((product: IProduct) => (
          <Card {...product} onAddToCart={cartContext.addProducts} key={product.sku} />
        ))}
      </Wrapper>
    </>
  );
};

export default HomePage;
