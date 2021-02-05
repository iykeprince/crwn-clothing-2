import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";

import { auth } from "../../firebase/firebase.util";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { HeaderContainer, LogoContainer, OptionContainer, OptionsContainer } from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionContainer to="/shop">
        SHOP
      </OptionContainer>
      <OptionContainer to="/shop">
        CONTACT
      </OptionContainer>
      {currentUser ? (
        <OptionContainer as="div" onClick={() => auth.signOut()}>SIGN OUT</OptionContainer>
      ) : (
        <OptionContainer to="/signin">SIGN IN</OptionContainer>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Header);
