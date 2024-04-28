import { Container, Stack, Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Basket from './Basket';
import { CartItem } from '../../../lib/types/search';

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    setSignupOpen,
    setLoginOpen,
  } = props;
  const authMember = true;

  return (
    <div className="other-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className={'hoover-line'}>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={'hoover-line'}>
              <NavLink to="/">Home</NavLink>
            </Box>
            <Box className={'hoover-line'}>
              <NavLink to="/products" activeClassName="underline">
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={'hoover-line'}>
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={'hoover-line'}>
                <NavLink to="/member-page" activeClassName="underline">
                  MyPage
                </NavLink>
              </Box>
            ) : null}
            <Box className={'hoover-line'}>
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Box>
                <Button
                  onClick={() => setLoginOpen(true)}
                  variant="contained"
                  className="login-button"
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={'/icons/default-user.svg'}
                aria-haspopup={'true'}
              />
            )}
          </Stack>
        </Stack>
        <Stack className="header-frame">
          <Stack className="detail">
            {/* <Box className="head-main-txt">
                            World's Most Delicious Cousine
                        </Box>
                        <Box className="welcome-txt">
                            The Choice, not just a choice
                        </Box>
                        <Box className="service-txt">24 hours service</Box> */}
            {/* <Box className="signup">
                            {!authMember ? (
                                <Button
                                    variant="contained"
                                    className="signup-button"
                                >
                                    SIGN UP
                                </Button>
                            ) : null}
                        </Box> */}
          </Stack>
          <Stack className="logo-frame">
            <div className="logo-image"></div>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
