import { Box, Button, Container, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Basket from './Basket';
import { useEffect, useState } from 'react';

export default function HomeNavbar() {
  const authMember = null;

  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<boolean>(true);

  useEffect(() => {
    console.log('componentDidMount');
    setCount(count + 1);

    return () => {
      console.log('componentWillUnmount');
    };
  }, [value]); // componentDidUpdate()

  /** HANDLERS **/
  const buttonHandler = () => {
    setValue(!value);
  };
  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box className={'hoover-line'}>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/burak.svg" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={'hoover-line'}>
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
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
            {/* BASKET */}
            <Basket />

            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
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
            <Box className="head-main-txt">World's Most Delicious Cousine</Box>
            <Box className="welcome-txt">The Choice, not just a choice</Box>
            <Box className="service-txt">{count} hours service</Box>
            <Box className="signup">
              {!authMember ? (
                <Button
                  variant="contained"
                  className="signup-button"
                  onClick={buttonHandler}
                >
                  SIGN UP
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Stack className="logo-frame">
            <div className="logo-image"></div>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
