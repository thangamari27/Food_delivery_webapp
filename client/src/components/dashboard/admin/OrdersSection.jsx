import { ordersContent } from '@/utils/constant/admin/AdminDashboard';
import { ordersStyles } from '@/utils/styles/AdminStyle';
import OrdersManagement from './features/orders/OrdersManagement';

const OrdersSection = () => {
  const content = ordersContent;
  const styles = ordersStyles;

  return (
    <OrdersManagement 
      content={content}
      styles={styles}
    />
  )
}

export default OrdersSection