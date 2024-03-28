import '../css/app.css';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { HomePage } from './screens/homePage';
import { UserPage } from './screens/userPage';
import { OrdersPage } from './screens/ordersPage';
import { ProductPage } from './screens/productsPage';
import { HomeNavbar } from './components/headers/HomeNavbar';
import { OtherNavbar } from './components/headers/OtherNavbar';
import { Footer } from './components/footer';

// Questions:
// Why we need reportWebVitals();?
// Is it good use case to open two terminal and use one of them to run the project, the another one to commit changes?

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
