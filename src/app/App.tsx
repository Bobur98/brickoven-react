import '../css/app.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './screens/homePage';
import UserPage from './screens/userPage';
import OrdersPage from './screens/ordersPage';
import ProductPage from './screens/productsPage';
import HomeNavbar from './components/headers/HomeNavbar';
import OtherNavbar from './components/headers/OtherNavbar';
import Footer from './components/footer';
import '../css/app.css';
import '../css/navbar.css';
import '../css/footer.css';
import HelpPage from './screens/helpPage';
import useBasket from './hooks/useBasket';
import { useState } from 'react';
import AuthenticationModal from './components/auth';

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  /** HANDLERS **/

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <>
      {location.pathname === '/' ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
        />
      )}

      <Switch>
        <Route path="/products">
          <ProductPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
      />
    </>
  );
}

export default App;
