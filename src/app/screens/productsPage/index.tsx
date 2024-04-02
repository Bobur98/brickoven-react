import { Route, Router, Switch, useRouteMatch } from 'react-router-dom';
import ChosenProduct from './ChosenProduct';
import Products from './Products';

export default function ProductsPage() {
  //productsdan qaytyabkan path bn urlni nima farqi bor?
  const products = useRouteMatch();
  console.log(products);

  return (
    <div className="products-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChosenProduct />
        </Route>
        <Route path={`${products.path}`}>
          <Products />
        </Route>
      </Switch>
    </div>
  );
}
