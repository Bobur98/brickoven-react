import { Box, Button, Container, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

export function HomeNavbar() {
    const authMember = null;
    return (
        <div className="home-navbar">
            <Container className="navbar-container">
                <Stack className="menu">
                    <Box className={'hoover-line'}>
                        <NavLink to="/">
                            <img
                                className="brand-logo"
                                src="/icons/burak.svg"
                            />
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
                                <NavLink
                                    to="/orders"
                                    activeClassName="underline"
                                >
                                    Orders Page
                                </NavLink>
                            </Box>
                        ) : null}
                        {authMember ? (
                            <Box className={'hoover-line'}>
                                <NavLink
                                    to="/member-page"
                                    activeClassName="underline"
                                >
                                    My Page
                                </NavLink>
                            </Box>
                        ) : null}
                        <Box className={'hoover-line'}>
                            <NavLink to="/help" activeClassName="underline">
                                Help Page
                            </NavLink>
                        </Box>
                        {/* BASKET */}
                        {!authMember ? (
                            <Box>
                                <Button
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
                <Stack>TEst</Stack>
            </Container>
        </div>
    );
}
