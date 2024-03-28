import '../css/app.css';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { HomePage } from './screens/homePage';
import { UserPage } from './screens/userPage';
import { OrdersPage } from './screens/ordersPage';
import { ProductPage } from './screens/productsPage';
import { HomeNavbar } from './components/headers/HomeNavbar';
import { OtherNavbar } from './components/headers/OtherNavbar';
import { Footer } from './components/footer';

function App() {
    const location = useLocation();

    return (
        <>
            {location.pathname === '/' ? <HomeNavbar /> : <OtherNavbar />}

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

            <Footer />
        </>
    );
}

export default App;
