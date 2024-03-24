import React from 'react';
import '../css/app.css';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { RippleBadge } from './MaterialTheme/styled';
import { Link, Route, Switch } from 'react-router-dom';
import { About } from './screens/About';
import { Users } from './screens/Users';
import { HomePage } from './screens/homePage';
import { UserPage } from './screens/userPage';
import { ProductPage } from './screens/productsPage';
import { OrdersPage } from './screens/ordersPage';

function App() {

// Q-TASK
  function hasProperty(obj:any, str:string) {
    let has = false
    for (let key in obj) {
        if(key === str) has = true
        else has = false
    }
    return has
}
console.log('MIT TASK Q-TASK:');
console.log(hasProperty({name: "BMW", model: "M3"}, "moddel"));

  return  <div>
  <nav>
    <ul>
    <li>
        <Link to="/">HomePage</Link>
      </li>
      <li>
        <Link to="/products">ProductsPage</Link>
      </li>
      <li>
        <Link to="/orders">OrdersPage</Link>
      </li>
      <li>
        <Link to="/member-page">UserPage</Link>
      </li>
    </ul>
  </nav>


  <Switch>
    <Route path="/products">
      <ProductPage />
    </Route>
    <Route path="/orders">
      <OrdersPage />
    </Route>
    <Route path="/member-page">
      <UserPage />
    </Route>
    <Route path="/">
      <HomePage />
    </Route>
  </Switch>
</div>
}

export default App;

