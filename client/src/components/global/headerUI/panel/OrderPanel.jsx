import { useEffect, useState } from "react";
import {
  Check,
  Clock,
  Package,
  XCircle,
  RefreshCw
} from "lucide-react";
import SlidePanel from "./SlidePanel";
import { useOrder } from '../../../../context/admin/Ordercontext'; 
import { useAuthContext } from '../../../../context/AuthContext'; 
import { toast } from 'react-hot-toast'; 

const OrdersPanel = ({
  isOpen,
  onClose,
  styles
}) => {
  const { fetchMyOrders, cancelOrder, loading, orders: contextOrders } = useOrder(); 
  const { user } = useAuthContext(); 
  const [localOrders, setLocalOrders] = useState([]);
  const [cancelling, setCancelling] = useState(null);

  //  Fetch orders when panel opens
  useEffect(() => {
    if (isOpen && user) {
      loadOrders();
    }
  }, [isOpen, user]);

  //  Load orders from API
  const loadOrders = async () => {
    try {
      const response = await fetchMyOrders();
      if (response.success) {
        setLocalOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders');
    }
  };

  //  Handle order cancellation
  const handleCancelOrder = async (orderId) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    setCancelling(orderId);
    try {
      const response = await cancelOrder(orderId, 'Customer cancellation request');
      if (response.success) {
        toast.success('Order cancelled successfully');
        // Update local state
        setLocalOrders(prev => 
          prev.map(order => 
            order.orderId === orderId 
              ? { ...order, orderStatus: 'cancelled', status: 'cancelled', canCancel: false }
              : order
          )
        );
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error(error.message || 'Failed to cancel order');
    } finally {
      setCancelling(null);
    }
  };

  const getStatusConfig = status => {
    const configs = {
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: Check,
        label: "Delivered"
      },
      preparing: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        icon: Clock,
        label: "Preparing"
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: Clock,
        label: "Pending"
      },
      confirmed: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: Check,
        label: "Confirmed"
      },
      on_the_way: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: Package,
        label: "On the Way"
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        label: "Cancelled"
      }
    };

    return configs[status] || configs.pending;
  };

  const orderPanelStyles = styles.ordersPanelStyles;

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="My Orders"
      styles={styles}
    >
      <div className={orderPanelStyles.contentContainer}>
        {/*  Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
            <span className="ml-3 text-gray-600">Loading orders...</span>
          </div>
        )}

        {/*  Orders List */}
        {!loading && localOrders.length > 0 ? (
          localOrders.map(order => {
            const statusConfig = getStatusConfig(order.orderStatus || order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.orderId || order.id}
                className={orderPanelStyles.orderItem.container}
              >
                <div className={orderPanelStyles.orderItem.header}>
                  <div>
                    <h3 className={orderPanelStyles.orderItem.orderNumber}>
                      {order.orderId || order.orderNumber}
                    </h3>
                    <p className={orderPanelStyles.orderItem.orderDate}>
                      {order.date || new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`${orderPanelStyles.orderItem.statusBadge} ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    <StatusIcon className={orderPanelStyles.orderItem.statusIcon} />
                    {statusConfig.label}
                  </span>
                </div>

                <div className={orderPanelStyles.orderItem.itemsContainer}>
                  <p className={orderPanelStyles.orderItem.itemsTitle}>
                    {order.items?.length || order.itemsList?.length} items:
                  </p>
                  <ul className={orderPanelStyles.orderItem.itemsList}>
                    {(order.itemsList || order.items?.map(i => i.name))?.map((item, idx) => (
                      <li
                        key={idx}
                        className={orderPanelStyles.orderItem.itemBullet}
                      >
                        • {typeof item === 'string' ? item : item.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={orderPanelStyles.orderItem.footer}>
                  <span className={orderPanelStyles.orderItem.total}>
                    ₹{order.total?.toFixed(2)}
                  </span>

                  {order.canCancel && (
                    <button
                      onClick={() => handleCancelOrder(order.orderId || order.id)}
                      disabled={cancelling === (order.orderId || order.id)}
                      className={orderPanelStyles.orderItem.cancelBtn}
                    >
                      {cancelling === (order.orderId || order.id) ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <XCircle className={orderPanelStyles.orderItem.cancelIcon} />
                          Cancel Order
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : !loading && (
          <div className={orderPanelStyles.emptyState.container}>
            <Package className={orderPanelStyles.emptyState.icon} />
            <p className={orderPanelStyles.emptyState.title}>
              No orders yet
            </p>
            <p className={orderPanelStyles.emptyState.description}>
              Your order history will appear here
            </p>
          </div>
        )}
      </div>
    </SlidePanel>
  );
};

export default OrdersPanel;