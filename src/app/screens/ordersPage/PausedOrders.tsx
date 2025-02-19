import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TabPanel from '@mui/lab/TabPanel';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Messages, serverApi } from '../../../lib/config';
import { Product } from '../../../lib/types/products';
import { retrievePausedOrders } from './selector';
import { Order, OrderItem, OrderUpdateInput } from '../../../lib/types/orders';
import { T } from '../../../lib/types/common';
import { sweetErrorHandling } from '../../../lib/sweetAlert';
import { OrderStatus } from '../../../lib/enums/order.enum';
import { useGlobals } from '../../hooks/useGlobals';
import OrderService from '../../services/OrderService';

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  /** HANDLERS **/
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm('Do you want to delete the order?');
      if (confirmation) {
        const order = new OrderService();
        order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      // PAYMENT PROCESS
      // ...

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        'Do you want to procceed with paymnet?'
      );
      if (confirmation) {
        const order = new OrderService();
        order.updateOrder(input);
        setValue('2');
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={'1'}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={'order-main-box'}>
              <Box className={'order-box-scroll'}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order?.productData?.filter(
                    (ele: Product) => item?.productId === ele?._id
                  )[0];
                  const imagePath = `${serverApi}/${product?.productImages[0]}`;
                  return (
                    <Box key={item._id} className={'orders-name-price'}>
                      <img
                        src={imagePath}
                        className={'order-dish-img'}
                        alt=""
                      />
                      <p className={'title-dish'}>{product?.productName}</p>
                      <Box className={'price-box'}>
                        <p>${item.itemPrice}</p>
                        <img src={'/icons/close.svg'} alt="" />
                        <p>{item.itemQuantity}</p>
                        <img src={'/icons/pause.svg'} alt="" />
                        <p style={{ marginLeft: '15px' }}>
                          ${item?.itemQuantity * item?.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className={'total-price-box'}>
                <Button
                  value={order._id}
                  variant="contained"
                  color="secondary"
                  className={'cancel-button'}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  onClick={processOrderHandler}
                  variant="contained"
                  className={'pay-button'}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          );
        })}
        {!pausedOrders ||
          (pausedOrders?.length === 0 && (
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
            >
              <img
                src={'/icons/noimage-list.svg'}
                style={{ width: 300, height: 300 }}
                alt=""
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
