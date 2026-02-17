import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Check,
  Clock,
  Package,
  XCircle,
  RefreshCw,
  AlertCircle
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
  const [fetchError, setFetchError] = useState(null);

  // Fetch orders when panel opens
  useEffect(() => {
    if (isOpen && user) {
      loadOrders();
    }
  }, [isOpen, user]);

  // Update local orders when context orders change
  useEffect(() => {
    if (contextOrders && contextOrders.length > 0) {
      setLocalOrders(contextOrders);
    }
  }, [contextOrders]);

  // Load orders from API
  const loadOrders = async () => {
    setFetchError(null);
    try {
      const response = await fetchMyOrders({
        limit: 50,
        orderStatus: 'all'
      });
      
      if (response?.success) {
        // Handle different response structures
        const ordersData = response.data || [];
        setLocalOrders(ordersData);
        
        if (ordersData.length === 0) {
          toast('No orders found', { icon: '📭' });
        }
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      const errorMsg = error.message || 'Failed to load orders';
      setFetchError(errorMsg);
      toast.error(errorMsg);
    }
  };

  // Handle order cancellation
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;

    setCancelling(orderId);
    try {
      const response = await cancelOrder(orderId, 'Customer cancellation request');
      if (response?.success) {
        toast.success('Order cancelled successfully');
        // Update local state
        setLocalOrders(prev => 
          prev.map(order => 
            (order.orderId === orderId || order.id === orderId)
              ? { 
                  ...order, 
                  orderStatus: 'cancelled', 
                  status: 'cancelled', 
                  canCancel: false 
                }
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
  
  // Get status configuration for UI
  const getStatusConfig = (status) => {
    const normalizedStatus = (status || 'pending').toLowerCase();
    
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
        bg: "bg-purple-100",
        text: "text-purple-700",
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

    return configs[normalizedStatus] || configs.pending;
  };

  const orderPanelStyles = styles?.ordersPanelStyles || {};

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="My Orders"
      styles={styles}
    >
      <div className={orderPanelStyles.contentContainer || "p-4"}>
        {/* Header with refresh button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Your Orders</h2>
          <button
            onClick={loadOrders}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Refresh orders"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-orange-500' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Error State */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-700 font-medium">Failed to load orders</p>
              <p className="text-red-600 text-sm">{fetchError}</p>
              <button 
                onClick={loadOrders}
                className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !fetchError && (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
            <span className="ml-3 text-gray-600">Loading your orders...</span>
          </div>
        )}

        {/* Orders List */}
        {!loading && !fetchError && localOrders.length > 0 ? (
          <div className="space-y-4">
            {localOrders.map(order => {
              const orderId = order.orderId || order.id;
              const orderStatus = order.orderStatus || order.status || 'pending';
              const statusConfig = getStatusConfig(orderStatus);
              const StatusIcon = statusConfig.icon;
              const items = order.items || [];
              const itemsList = order.itemsList || items.map(i => i.name) || [];
              const canCancel = order.canCancel !== undefined 
                ? order.canCancel 
                : ['pending', 'confirmed', 'preparing'].includes(orderStatus);

              return (
                <div
                  key={orderId}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {orderId || 'Order'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.date || new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Items */}
                  {items.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">
                        {items.length} {items.length === 1 ? 'item' : 'items'}:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {items.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{item.subtotal?.toFixed(2)}</span>
                          </li>
                        ))}
                        {items.length > 3 && (
                          <li className="text-gray-400">
                            +{items.length - 3} more items
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <span className="font-semibold text-gray-900">
                      Total: ₹{order.total?.toFixed(2)}
                    </span>

                    {canCancel && orderStatus !== 'cancelled' && (
                      <button
                        onClick={() => handleCancelOrder(orderId)}
                        disabled={cancelling === orderId}
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                      >
                        {cancelling === orderId ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Cancelling...
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" />
                            Cancel Order
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : !loading && !fetchError && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              No orders yet
            </p>
            <p className="text-gray-400 text-sm mb-5">
              When you place orders, they will appear here
            </p>
            <NavLink
              to={'/'}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse Restaurants
            </NavLink>
          </div>
        )}
      </div>
    </SlidePanel>
  );
};

export default OrdersPanel;