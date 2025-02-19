import { Box, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TabPanel from '@mui/lab/TabPanel';
import moment from 'moment';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Messages, serverApi } from '../../../lib/config';
import { Product } from '../../../lib/types/products';
import { retrieveProcessOrders } from './selector';
import { Order, OrderItem, OrderUpdateInput } from '../../../lib/types/orders';
import { useGlobals } from '../../hooks/useGlobals';
import { T } from '../../../lib/types/common';
import { OrderStatus } from '../../../lib/enums/order.enum';
import OrderService from '../../services/OrderService';
import { sweetErrorHandling } from '../../../lib/sweetAlert';

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}
export default function ProcessOrder(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  /** HANDLERS **/
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm('Have you received your order?');
      if (confirmation) {
        const order = new OrderService();
        order.updateOrder(input);
        setValue('3');
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err, '*-*-*-*-*-*-*-*-*-*');

      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value={'2'}>
      <Stack>
        {processOrders.map((order: Order) => {
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
                      <p className={'title-dish'}>{product.productName}</p>
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
                <p className={'data-compl'}>
                  Date: {moment().format('YY-MM-DD HH:mm')}
                </p>
                <Button
                  value={order._id}
                  onClick={finishOrderHandler}
                  variant="contained"
                  className={'verify-button'}
                >
                  Verify to Fulfil
                </Button>
              </Box>
            </Box>
          );
        })}
        {!processOrders ||
          (processOrders?.length === 0 && (
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


