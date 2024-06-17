import {
  ArrowBack,
  ArrowForward,
  Search,
  MonetizationOn,
  RemoveRedEye,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Pagination,
  PaginationItem,
  Stack,
  Badge,
  InputBase,
  IconButton,
} from '@mui/material';
import { Dispatch, createSelector } from '@reduxjs/toolkit';
import { setProducts } from './slice';
import { Product, ProductInquiry } from '../../../lib/types/products';
import { retrieveProducts } from './selector';
import { ChangeEvent, useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import { ProductCollection } from '../../../lib/enums/product.enum';
import { useDispatch, useSelector } from 'react-redux';
import { serverApi } from '../../../lib/config';
import { useHistory } from 'react-router-dom';
import { CartItem } from '../../../lib/types/search';

// slice
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

// selector
const productRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductPageProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductPageProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productRetriever);
  const [searchText, setSearchText] = useState<string>('');
  const history = useHistory();
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 2,
    order: 'createdAt',
    productCollection: ProductCollection.PIZZA,
    search: '',
  });

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === '') {
      productSearch.search = '';
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const serachOrderHandler = (order: string) => {
    // order = productPrice
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  // why we are not using e: ChangeEvent
  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={'column'} alignItems={'center'}>
          <Stack className="avatar-big-box">
            <Stack className="title">Brick Oven Restaurent</Stack>
            <Stack className="input-wrapper">
              <InputBase
                type="search"
                className="text-field"
                placeholder="Type here"
                inputProps={{ 'aria-label': 'Type here' }}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') searchProductHandler();
                }}
              />
              <IconButton
                type="button"
                className="icon-btn"
                aria-label="search"
                onClick={searchProductHandler}
              >
                search
                <Search sx={{ width: '18px', height: '18px' }} />
              </IconButton>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button
                variant="contained"
                color={
                  productSearch.order === 'createdAt' ? 'primary' : 'secondary'
                }
                className="order"
                onClick={() => serachOrderHandler('createdAt')}
              >
                New
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.order === 'productPrice'
                    ? 'primary'
                    : 'secondary'
                }
                className="order"
                onClick={() => serachOrderHandler('productPrice')}
              >
                Price
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.order === 'productViews'
                    ? 'primary'
                    : 'secondary'
                }
                className="order"
                onClick={() => serachOrderHandler('productViews')}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            <Stack className="product-category">
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.PIZZA
                    ? 'primary'
                    : 'secondary'
                }
                className="order"
                onClick={() => searchCollectionHandler(ProductCollection.PIZZA)}
              >
                Pizza
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.PASTA
                    ? 'primary'
                    : 'secondary'
                }
                className="order"
                onClick={() => searchCollectionHandler(ProductCollection.PASTA)}
              >
                Pasta
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.SALAD
                    ? 'primary'
                    : 'secondary'
                }
                className="order"
                onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
              >
                Salad
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection ===
                  ProductCollection.APPETIZERS
                    ? 'primary'
                    : 'secondary'
                }
                className="order"
                onClick={() =>
                  searchCollectionHandler(ProductCollection.APPETIZERS)
                }
              >
                Appetizers
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.productCollection === ProductCollection.DRINK
                    ? 'primary'
                    : 'secondary'
                }
                className="order"
                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
              >
                Drink
              </Button>
            </Stack>
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + ' l'
                      : product.productSize + ' SIZE';
                  return (
                    <Stack
                      key={product._id}
                      className="product-card"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                          className="shop-btn"
                        >
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: 'flex' }}
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: '36px' }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEye
                              sx={{
                                color: product.productViews ? 'gray' : 'white',
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOn />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box>No data</Box>
              )}
            </Stack>
          </Stack>

          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBack, next: ArrowForward }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className="brands-logo">
        <Stack className="brand-title">Our family brands</Stack>
        <Stack className="image-container">
          <Stack className="image-wrapper">
            <img src="/img/gurme.webp" />
          </Stack>
          <Stack className="image-wrapper">
            <img src="/img/seafood.webp" />
          </Stack>
          <Stack className="image-wrapper">
            <img src="/img/sweets.webp" />
          </Stack>
          <Stack className="image-wrapper">
            <img src="/img/doner.webp" />
          </Stack>
        </Stack>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
