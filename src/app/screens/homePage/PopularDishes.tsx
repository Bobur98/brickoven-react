import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import { CssVarsProvider } from '@mui/joy/styles';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import CardOverflow from '@mui/joy/CardOverflow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { retrievePopularDishes } from './selector';
import { serverApi } from '../../../lib/config';
import { Product } from '../../../lib/types/products';
import { useHistory } from 'react-router-dom';

import {
  PlusOne,
  PlusOneSharp,
  ShoppingBasketSharp,
  ShoppingCart,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { CartItem } from '../../../lib/types/search';

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);
interface PopularDishesProps {
  onAdd: (item: CartItem) => void;
}

export default function PopularDishes(props: PopularDishesProps) {
  const { onAdd } = props;
  const { popularDishes } = useSelector(popularDishesRetriever);
  const history = useHistory(); // Initialize the useNavigate hook

  const handleCardClick = (id: string) => {
    history.push(`/products/${id}`); // Navigate to the product page with the product ID
  };
  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="category-title">Popular Dishes</Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes
                .filter((product) => product.productAvailable) // Filter available products
                .slice(0, 4)
                .map((ele: Product) => {
                  const imagePath = `${serverApi}/${ele.productImages[0]}`;

                  return (
                    <CssVarsProvider key={ele._id}>
                      <Card className="card">
                        <CardCover>
                          <img src={imagePath} alt="" />
                        </CardCover>
                        <CardCover className="card-cover" />
                        <CardContent
                          sx={{
                            justifyContent: 'flex-end',
                          }}
                        ></CardContent>
                        <CardOverflow
                          className="card-overflow"
                          sx={{
                            gap: 1.5,
                            py: 1.5,
                          }}
                        >
                          <Stack
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                          >
                            <Typography
                              level="h2"
                              fontSize="lg"
                              textColor="rgb(255, 255, 255)"
                              mb={1}
                              sx={{ cursor: 'pointer' }}
                              onClick={() => handleCardClick(ele._id)}
                            >
                              {ele.productName}
                            </Typography>
                            <Typography
                              sx={{
                                fontWeight: 'md',
                                color: 'neutral.100',
                                alignItems: 'center',
                                display: 'flex',
                              }}
                            >
                              {ele.productViews}
                              <VisibilityIcon
                                sx={{
                                  fontSize: 25,
                                  marginLeft: '5px',
                                }}
                              />
                            </Typography>
                          </Stack>
                          <Stack
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              height: '40px',
                            }}
                          >
                            <Typography
                              sx={{ color: 'rgb(146, 163, 175)' }}
                              startDecorator={<DescriptionOutlined />}
                            >
                              {ele.productDesc}
                            </Typography>
                            <Box
                              className="shopping-card-wrapper"
                              onClick={(e) => {
                                onAdd({
                                  _id: ele._id,
                                  quantity: 1,
                                  name: ele.productName,
                                  price: ele.productPrice,
                                  image: ele.productImages[0],
                                });
                                e.stopPropagation();
                              }}
                            >
                              <ShoppingCartOutlined className="shopping-card" />
                            </Box>
                          </Stack>
                        </CardOverflow>
                      </Card>
                    </CssVarsProvider>
                  );
                })
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
