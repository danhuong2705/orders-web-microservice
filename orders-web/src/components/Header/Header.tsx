import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import CartIcon from "../../assets/cart.svg";
import LogoIcon from "../../assets/logo.svg";
import UserIcon from "../../assets/user.svg";
import { CartContext } from "../../contexts/cartContext";
const Wrapper = styled.div`
  height: 5rem;
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
  top: 0;
  z-index: 1050;
  background: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  width: 1264px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 5rem;
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  object-fit: contain;
`;
const Logo = styled(Icon)`
  width: 3rem;
  height: 3rem;
`;
const Badge = styled.div`
  background-color: red;
  color: #ffffff;
  font-size: 0.65rem;
  border-radius: 100%;
  position: absolute;
  bottom: 45%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 55%;
`;
const MenuItem = styled(Link)`
  margin: 0 1rem;
  position: relative;
`;
const RightMenuWrapper = styled.div`
  display: flex;
`;
const Header: React.FC = () => {
  const cartContext = useContext(CartContext);
  return (
    <Wrapper>
      <Content>
        <div>
          <Link to="/">
            <Logo src={LogoIcon} alt="logo" />
          </Link>
        </div>
        <RightMenuWrapper>
          <MenuItem to="/cart">
            <Icon src={CartIcon} alt="cart-icon" />
            {cartContext.totalProduct > 0 && (
              <Badge>{cartContext.totalProduct}</Badge>
            )}
          </MenuItem>
          <MenuItem to="/order-list">
            <Icon src={UserIcon} alt="user-icon" />
          </MenuItem>
        </RightMenuWrapper>
      </Content>
    </Wrapper>
  );
};

export default Header;
