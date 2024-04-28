import '../css/app.css';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
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
import { useState } from 'react';
import { CartItem } from '../lib/types/search';

function App() {
  const location = useLocation();

  const cartJson: string | null = localStorage.getItem('cartData');
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);
  /*** HANDLERS ***/
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find(
      (item: CartItem) => item._id === input._id
    );
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) => {
        return item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item;
      });
      setCartItems(cartUpdate);
    } else {
      const cartUpdate = [...cartItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem('cartData', JSON.stringify(cartUpdate));
    }
  };
  return (
    <>
      {location.pathname === '/' ? (
        <HomeNavbar cartItems={cartItems} />
      ) : (
        <OtherNavbar cartItems={cartItems} />
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
    </>
  );
}

export default App;
