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
import { Product } from '../../../lib/types/products';
import { retrieveProducts } from './selector';
import { useEffect } from 'react';
import ProductService from '../../services/ProductService';
import { ProductCollection } from '../../../lib/enums/product.enum';
import { useDispatch, useSelector } from 'react-redux';
import { serverApi } from '../../../lib/config';

// slice
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

// selector
const productRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productRetriever);
  console.log(products, '------------');
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: 'createdAt',
        productCollection: ProductCollection.DISH,
        search: '',
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={'column'} alignItems={'center'}>
          <Stack className="avatar-big-box">
            <Stack className="title">Burak Restaurent</Stack>
            <Stack className="input-wrapper">
              <InputBase
                className="text-field"
                placeholder="Type here"
                inputProps={{ 'aria-label': 'Type here' }}
              />
              <IconButton
                type="button"
                className="icon-btn"
                aria-label="search"
              >
                search
                <Search sx={{ width: '18px', height: '18px' }} />
              </IconButton>
            </Stack>
          </Stack>

          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button variant="contained" color="primary" className="order">
                New
              </Button>
              <Button variant="contained" color="secondary" className="order">
                Price
              </Button>
              <Button variant="contained" color="secondary" className="order">
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className="list-category-section">
            <Stack className="product-category">
              <Button variant="contained" color="primary" className="order">
                dish
              </Button>
              <Button variant="contained" color="secondary" className="order">
                salad
              </Button>
              <Button variant="contained" color="secondary" className="order">
                drink
              </Button>
              <Button variant="contained" color="secondary" className="order">
                desert
              </Button>
              <Button variant="contained" color="secondary" className="order">
                other
              </Button>
            </Stack>
            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + 'l'
                      : product.productSize + 'SIZE';
                  return (
                    <Stack key={product._id} className="product-card">
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{sizeVolume}</div>
                        <Button className="shop-btn">
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
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{ previous: ArrowBack, next: ArrowForward }}
                  {...item}
                  color="secondary"
                />
              )}
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
