import { ordersContent } from '@/utils/constant/admin/AdminDashboard';
import { ordersStyles } from '@/utils/styles/AdminStyle';
import OrdersManagement from './features/orders/OrdersManagement';

const generateSampleOrders = () => {
  const customers = ['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emily Brown', 'David Lee', 'Emma Wilson', 'James Taylor', 'Olivia Davis'];
  const orders = [];
  
  for (let i = 1; i <= 50; i++) {
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let subtotal = 0;
    
    for (let j = 0; j < itemCount; j++) {
      const item = ordersContent.foodItems[Math.floor(Math.random() * ordersContent.foodItems.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({ ...item, quantity });
      subtotal += item.price * quantity;
    }
    
    const tax = subtotal * 0.09;
    const deliveryFee = Math.random() > 0.5 ? 5.00 : 4.00;
    const total = subtotal + tax + deliveryFee;
    
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
    
    orders.push({
      id: `ORD-2024-${String(i).padStart(3, '0')}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      address: `${Math.floor(Math.random() * 999) + 1} Main St, Apt ${Math.floor(Math.random() * 50) + 1}, City, State ${Math.floor(Math.random() * 90000) + 10000}`,
      orderDate: date.toISOString(),
      items,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      deliveryFee,
      total: parseFloat(total.toFixed(2)),
      orderStatus: ordersContent.orderStatuses[Math.floor(Math.random() * ordersContent.orderStatuses.length)].value,
      paymentStatus: ordersContent.paymentStatuses[Math.floor(Math.random() * ordersContent.paymentStatuses.length)].value,
      notes: Math.random() > 0.7 ? 'Please ring doorbell' : ''
    });
  }
  
  return orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
};

const OrdersSection = () => {
  const content = ordersContent;
  const styles = ordersStyles;

  return (
    <OrdersManagement 
      content={content}
      generateSampleOrders={generateSampleOrders}
      styles={styles}
    />
  )
}

export default OrdersSection