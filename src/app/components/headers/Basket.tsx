import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useHistory } from 'react-router-dom';
import { CartItem } from '../../../lib/types/search';
import { Messages, serverApi } from '../../../lib/config';
import { sweetErrorHandling } from '../../../lib/sweetAlert';
import { useGlobals } from '../../hooks/useGlobals';
import OrderService from '../../services/OrderService';
import {
  DeliveryDining,
  DoNotDisturbOnTotalSilence,
  InfoSharp,
  PriceChangeOutlined,
  PriceChangeSharp,
  PriceCheck,
  PriceCheckRounded,
} from '@mui/icons-material';

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onDelete, onDeleteAll, onRemove } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  let itemPrice = null;
  const history = useHistory();
  const itemsPrice = cartItems.reduce(
    (a: number, c: CartItem) => a + c.quantity * c.price,
    0
  );

  const shippingCost: number = itemsPrice < 100 ? 5 : 0;
  const totalPrice: any = (itemsPrice + shippingCost).toFixed(1);
  const freeDelivery: any = 100 - totalPrice + shippingCost;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();

      // REFRESH VIA CONTEXT
      setOrderBuilder(new Date());
      history.push('/orders');
    } catch (err) {
      console.log('Error on processOrderHandler', err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box className={'hover-line'}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src={'/icons/shopping-cart.svg'} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack
          className={'basket-frame'}
          sx={{
            height: totalPrice >= 100 ? '515px ' : '560px',
          }}
        >
          <Box className={'all-check-box'}>
            {cartItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack
                flexDirection={'row'}
                width={500}
                justifyContent={'space-between'}
              >
                <div>Cart Products: </div>
                <DeleteForeverIcon
                  color={'primary'}
                  sx={{ ml: '5px', cursor: 'pointer' }}
                  onClick={() => onDeleteAll()}
                />
              </Stack>
            )}
          </Box>

          <Box className={'orders-main-wrapper'}>
            <Box className={'orders-wrapper'}>
              {cartItems.map((item: CartItem) => {
                const imagePath = `${serverApi}/${item.image}`;

                itemPrice = item.quantity * item.price;
                return (
                  <Box className={'basket-info-box'} key={item._id}>
                    <Stack className="info-wrapper">
                      <img src={imagePath} className={'product-img'} />
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <span className={'product-name'}>{item.name} </span>

                        <span className={'product-price'}>${itemPrice}</span>
                      </Box>
                    </Stack>

                    <Box className="button-wrapper">
                      <div className="col-2">
                        <button
                          onClick={() => onRemove(item)}
                          className="remove"
                        >
                          -
                        </button>
                        {item.quantity}
                        <button onClick={() => onAdd(item)} className="add">
                          +
                        </button>
                      </div>
                      <div className={'cancel-btn'}>
                        <CancelIcon
                          color={'primary'}
                          onClick={() => onDelete(item)}
                        />
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {cartItems.length !== 0 ? (
            <Box className={'basket-order'}>
              {totalPrice >= 100 ? (
                ''
              ) : (
                <span className="free-delivery">
                  <InfoSharp /> spend <span>${freeDelivery}</span> for free
                  delivery
                </span>
              )}
              <span className="delivery-fee">
                <span>Delivery fee:</span>
                <span>${5}</span>
              </span>

              <span className={'price'}>
                <span> Total product price:</span>
                <span>${itemPrice}</span>
              </span>
              <span className={'price'}>
                <span>Delivery fee:</span>
                <span> {totalPrice >= 100 ? 'free' : '$' + shippingCost}</span>
              </span>
              <span className={'total'}>
                <span>Total:</span>
                <span>${totalPrice}</span>
              </span>
              <Button
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={'contained'}
              >
                Order
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
