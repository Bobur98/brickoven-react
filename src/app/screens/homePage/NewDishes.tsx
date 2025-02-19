import React from 'react';
import { Box, Container, Stack } from '@mui/material';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import CardOverflow from '@mui/joy/CardOverflow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '../../components/divider';
import { AspectRatio, CssVarsProvider } from '@mui/joy';
import { useSelector } from 'react-redux';
import { retrieveNewDishes } from './selector';
import { createSelector } from '@reduxjs/toolkit';
import { serverApi } from '../../../lib/config';
import { Product } from '../../../lib/types/products';
import { ProductCollection } from '../../../lib/enums/product.enum';
import { CartItem } from '../../../lib/types/search';

const newDishesRetreiver = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetreiver);
  console.log('newDishes log', newDishes);

  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Fresh Menu</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes
                  .filter((product) => product.productAvailable) // Filter available products
                  .slice(0, 4)
                  .map((product: Product) => {
                    console.log(product.productAvailable);
                    if (!product.productAvailable) {
                      return null;
                    }
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + 'l'
                        : product.productSize + ' SIZE';

                    return (
                      <Card
                        key={product._id}
                        variant="outlined"
                        className="card"
                      >
                        <CardOverflow>
                          <div className="product-sale">{sizeVolume}</div>
                          <AspectRatio ratio="1">
                            <img src={imagePath} alt="" />
                          </AspectRatio>
                        </CardOverflow>

                        <CardOverflow variant="soft" className="product-detail">
                          <Stack className="info">
                            <Stack flexDirection={'row'}>
                              <Typography className="title">
                                {product.productName}
                              </Typography>
                              <Divider width="2" height="2" bg="#d9d9d9" />
                              <Typography className="price">
                                ${product.productPrice}
                              </Typography>
                            </Stack>
                            <Stack>
                              <Typography className="views">
                                {product.productViews}
                                <VisibilityIcon
                                  sx={{
                                    fontSize: 20,
                                    marginLeft: '5px',
                                    color: '#fff0ff',
                                  }}
                                />
                              </Typography>
                            </Stack>
                          </Stack>
                        </CardOverflow>
                      </Card>
                    );
                  })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
