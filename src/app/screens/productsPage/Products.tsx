import {
  ArrowBack,
  ArrowForward,
  Search,
  MonetizationOn,
  RemoveRedEye,
  DescriptionOutlined,
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
  Card,
  CardContent,
  Typography,
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
import { CardCover, CardOverflow } from '@mui/joy';
import { branches } from '../../../lib/data/branches';
import Visibility from '@mui/icons-material/Visibility';

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
    limit: 4,
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
          </Stack>
          <Stack className="search-wrapper">
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

            <Stack className="dishes-filter-section">
              <Stack className="dishes-filter-box">
                <Stack className="filter">Filter by:</Stack>
                <Button
                  variant="contained"
                  color={
                    productSearch.order === 'createdAt'
                      ? 'primary'
                      : 'secondary'
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
          </Stack>

          <Stack className="list-category-section">
            <Stack className="menu">Menu</Stack>
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
                        <Button className="view-btn" sx={{ right: '36px' }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEye
                              sx={{
                                color: 'white',
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                          }}
                        >
                          <div className="product-title">
                            {product.productName}
                          </div>
                          <div className="product-price">
                            <MonetizationOn />
                            {product.productPrice}
                          </div>
                        </div>
                        {product.productCollection ===
                        ProductCollection.DRINK ? (
                          ''
                        ) : (
                          <div className="product-ingridients">
                            <span>
                              Ingredients: estsejts, jhebrsej, hrbsehjrsehjr
                            </span>
                          </div>
                        )}

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
        <Stack className="brand-title">Our branches</Stack>
        <Stack display={'flex'} flexDirection={'row'}>
          {branches.map((ele, index) => (
            <Card
              key={index}
              sx={{
                width: 300,
                height: 450,
                margin: '5px',
              }}
            >
              <CardContent>
                <Stack
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  height={'50px'}
                  alignContent={'center'}
                  alignItems={'center'}
                >
                  <Typography
                    variant="h6"
                    color="#000"
                    sx={{ fontSize: '12px !important' }}
                  >
                    {ele.location}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 'medium',
                      color: 'neutral.700',
                      alignItems: 'center',
                      display: 'flex',
                      fontSize: '12px !important',
                    }}
                  >
                    {ele.address}
                  </Typography>
                </Stack>
              </CardContent>
              <CardContent
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  py: 1.5,
                  px: 'var(--Card-padding)',
                  borderColor: 'divider',
                  height: 'auto',
                  backgroundColor: '#fafbfb',
                }}
              >
                <Typography>
                  <img
                    src={ele.img}
                    alt={ele.location}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </div>

      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.203402019367!2d127.0277778!3d37.5030556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3e296de9ba3%3A0x11e6877524a675fc!2sBrick%20Oven%20New%20York%20Pizza!5e0!3m2!1sen!2sus!4v1624124537000!5m2!1sen!2sus"
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
