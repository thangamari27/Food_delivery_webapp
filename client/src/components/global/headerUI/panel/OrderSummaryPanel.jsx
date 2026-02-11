import { CheckCircle, RefreshCw, Clock, ChefHat, Bike, Package, Phone, MapPin, Mail, Star, HelpCircle, IndianRupee, XCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

function OrderSummaryPanel({
  order,
  cartItems,
  subtotal,
  discount,
  tax,
  deliveryFee,
  total,
  onClose,
  onNewOrder,
  styles
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [loadingSteps, setLoadingSteps] = useState(false);
  
  // Initialize steps based on order data
  useEffect(() => {
    if (order) {
      initializeSteps();
      updateCurrentStep();
    }
  }, [order]);

  // Initialize steps dynamically based on order data
  const initializeSteps = () => {
    const baseSteps = [
      { 
        icon: <Package />, 
        label: 'Order Placed', 
        time: getOrderTime('placed'),
        status: 'placed'
      },
      { 
        icon: <ChefHat />, 
        label: order?.orderStatus === 'confirmed' ? 'Confirmed' : 'Preparing', 
        time: getPreparationTime(),
        status: 'preparing'
      },
      { 
        icon: <Bike />, 
        label: getDeliveryLabel(), 
        time: getDeliveryTime(),
        status: 'delivering'
      },
      { 
        icon: order?.isCancelled ? <XCircle /> : <CheckCircle />, 
        label: order?.isCancelled ? 'Cancelled' : 'Delivered', 
        time: getCompletionTime(),
        status: order?.isCancelled ? 'cancelled' : 'delivered'
      },
    ];
    
    // Adjust steps based on actual backend data
    const adjustedSteps = baseSteps.map(step => {
      // If we have status history from backend, use it
      if (order?.tracking?.statusHistory?.length > 0) {
        const historyEntry = order.tracking.statusHistory.find(h => 
          h.status.toLowerCase().includes(step.status)
        );
        if (historyEntry) {
          return {
            ...step,
            time: new Date(historyEntry.timestamp).toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            }),
            timestamp: historyEntry.timestamp,
            note: historyEntry.note
          };
        }
      }
      return step;
    });
    
    setSteps(adjustedSteps);
  };

  // Update current step based on order status from backend
  const updateCurrentStep = () => {
    if (!order?.orderStatus) return;

    const statusMap = {
      'pending': 0,
      'confirmed': 1,
      'preparing': 1,
      'ready': 2,
      'picked_up': 2,
      'on_the_way': 2,
      'out_for_delivery': 2,
      'delivered': 3,
      'cancelled': 3,
      'failed': 3
    };

    const step = statusMap[order.orderStatus] || 0;
    setCurrentStep(step);
  };

  // Helper functions for dynamic step data
  const getOrderTime = (step) => {
    if (order?.orderDate) {
      return new Date(order.orderDate).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    if (order?.tracking?.statusHistory?.length > 0) {
      const placedHistory = order.tracking.statusHistory.find(h => 
        h.status.toLowerCase().includes('pending') || 
        h.status.toLowerCase().includes('placed')
      );
      if (placedHistory?.timestamp) {
        return new Date(placedHistory.timestamp).toLocaleString('en-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }
    
    return 'Just now';
  };

  const getPreparationTime = () => {
    if (order?.tracking?.preparationTime) {
      return `Estimated: ${order.tracking.preparationTime} min`;
    }
    
    if (order?.tracking?.estimatedDeliveryTime) {
      const estTime = new Date(order.tracking.estimatedDeliveryTime);
      const now = new Date();
      const diffMinutes = Math.max(10, Math.round((estTime - now) / (1000 * 60)));
      return `Estimated: ${diffMinutes} min`;
    }
    
    return 'Estimated: 15-20 min';
  };

  const getDeliveryLabel = () => {
    if (order?.orderStatus === 'on_the_way' || order?.orderStatus === 'out_for_delivery') {
      return 'On the Way';
    }
    if (order?.orderStatus === 'picked_up') {
      return 'Picked Up';
    }
    if (order?.orderStatus === 'ready') {
      return 'Ready for Pickup';
    }
    return 'Delivery';
  };

  const getDeliveryTime = () => {
    if (order?.tracking?.estimatedDeliveryTime) {
      const deliveryTime = new Date(order.tracking.estimatedDeliveryTime);
      return `Estimated: ${deliveryTime.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }
    
    if (order?.tracking?.actualDeliveryTime) {
      return `Delivered at ${new Date(order.tracking.actualDeliveryTime).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }
    
    return 'Estimated: 30-45 min';
  };

  const getCompletionTime = () => {
    if (order?.isCancelled && order?.cancelledAt) {
      return `Cancelled at ${new Date(order.cancelledAt).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }
    
    if (order?.tracking?.actualDeliveryTime) {
      return `Delivered at ${new Date(order.tracking.actualDeliveryTime).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }
    
    if (order?.orderStatus === 'delivered') {
      return 'Delivered';
    }
    
    return order?.isCancelled ? 'Cancelled' : 'Pending delivery';
  };

  // Poll for order updates (optional - for real-time tracking)
  useEffect(() => {
    if (order?.orderId && !order.isCancelled && order.orderStatus !== 'delivered') {
      const pollInterval = setInterval(() => {
        // You could fetch order updates here
        
      }, 30000); // Poll every 30 seconds

      return () => clearInterval(pollInterval);
    }
  }, [order]);

  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <p className={styles.loadingText}>Loading order details...</p>
        </div>
      </div>
    );
  }

  // Use order.items if available, fallback to cartItems
  const displayItems = order.items && order.items.length > 0 ? order.items : cartItems;

  // Extract pricing from order or use props
  const orderPricing = order.pricing || {
    subtotal: subtotal,
    tax: tax,
    deliveryFee: deliveryFee,
    discount: { amount: discount, type: 'percentage' },
    tip: order.tip || 0,
    total: total
  };

  // Calculate estimated delivery time
  const getETA = () => {
    if (order.tracking?.estimatedDeliveryTime) {
      const estTime = new Date(order.tracking.estimatedDeliveryTime);
      const now = new Date();
      const diffMinutes = Math.max(1, Math.round((estTime - now) / (1000 * 60)));
      return `${diffMinutes} minutes`;
    }
    
    if (order.tracking?.preparationTime) {
      return `${order.tracking.preparationTime + 30} minutes`;
    }
    
    return '45-60 minutes';
  };

  return (
    <div className={styles.container}>
      {/* Success Header */}
      <div className={styles.successHeader}>
        <div className={styles.successIconContainer}>
          {order.isCancelled ? (
            <XCircle className={`${styles.successIcon} text-red-500`} />
          ) : (
            <CheckCircle className={`${styles.successIcon} ${
              order.orderStatus === 'delivered' ? 'text-green-500' : 'text-orange-500'
            }`} />
          )}
        </div>
        <h2 className={styles.successTitle}>
          {order.isCancelled ? 'Order Cancelled' : 
           order.orderStatus === 'delivered' ? 'Order Delivered!' : 
           'Order Confirmed!'}
        </h2>
        <p className={styles.successSubtitle}>
          {order.isCancelled 
            ? `Order #${order.orderId} has been cancelled`
            : order.orderStatus === 'delivered'
            ? `Your order #${order.orderId} has been delivered successfully`
            : `Your order #${order.orderId} has been placed successfully`
          }
        </p>
      </div>

      {/* Order Tracking - Only show if not cancelled */}
      {!order.isCancelled && steps.length > 0 && (
        <div className={styles.trackingSection}>
          <h3 className={styles.sectionTitle}>Order Status</h3>
          
          <div className={styles.timeline}>
            {steps.map((step, index) => {
              const isActive = index <= currentStep;
              const StepIcon = step.icon.type || step.icon;
              
              return (
                <div key={index} className={styles.timelineStep}>
                  <div className={styles.timelineContent}>
                    <div className={`${styles.stepIcon} ${
                      isActive ? styles.stepIconActive : styles.stepIconInactive
                    }`}>
                      {step.icon}
                    </div>
                    <div className={styles.stepInfo}>
                      <span className={`${styles.stepLabel} ${
                        isActive ? 'font-semibold' : 'font-normal'
                      }`}>
                        {step.label}
                      </span>
                      <span className={styles.stepTime}>{step.time}</span>
                      {step.note && (
                        <span className="text-xs text-gray-500 mt-1 block">
                          Note: {step.note}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`${styles.connector} ${
                      index < currentStep ? styles.connectorActive : ''
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className={styles.etaContainer}>
            <Clock className={styles.etaIcon} />
            <span className={styles.etaText}>
              {order.orderStatus === 'delivered' ? (
                <>Delivered successfully</>
              ) : (
                <>
                  Estimated delivery: <strong>{getETA()}</strong>
                </>
              )}
            </span>
          </div>
          
          {/* Delivery Partner Info (if available) */}
          {order.tracking?.deliveryPartner && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <Bike className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Delivery Partner: {order.tracking.deliveryPartner.name}
                  </p>
                  <p className="text-sm text-blue-700">
                    Phone: {order.tracking.deliveryPartner.phone}
                    {order.tracking.deliveryPartner.vehicleNumber && (
                      <> • Vehicle: {order.tracking.deliveryPartner.vehicleNumber}</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Order Details */}
      <div className={styles.detailsSection}>
        <h3 className={styles.sectionTitle}>Order Details</h3>
        
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>
              <MapPin />
            </div>
            <div>
              <p className={styles.detailLabel}>Delivery Address</p>
              <p className={styles.detailValue}>
                {order.delivery?.address?.fullAddress || 
                 (order.delivery?.address ? 
                  `${order.delivery.address.street || ''}, ${order.delivery.address.city || ''}, ${order.delivery.address.state || ''} - ${order.delivery.address.zipCode || ''}` :
                  order.address || 'Address not available')}
              </p>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>
              <Phone />
            </div>
            <div>
              <p className={styles.detailLabel}>Contact</p>
              <p className={styles.detailValue}>
                {order.customer?.name || order.customerName || 'Customer'} • {order.customer?.phone || order.phone || 'N/A'}
              </p>
            </div>
          </div>

          {order.customer?.email && (
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <Mail />
              </div>
              <div>
                <p className={styles.detailLabel}>Email</p>
                <p className={styles.detailValue}>{order.customer.email}</p>
              </div>
            </div>
          )}

          {order.restaurant && (
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <ChefHat />
              </div>
              <div>
                <p className={styles.detailLabel}>Restaurant</p>
                <p className={styles.detailValue}>
                  {order.restaurant.name || 'Restaurant'}
                  {order.restaurant.phone && <> • {order.restaurant.phone}</>}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {(order.notes || order.specialRequests || order.delivery?.instructions) && (
          <div className={styles.instructions}>
            <p className={styles.instructionsLabel}>Special Instructions:</p>
            <p className={styles.instructionsText}>
              {order.notes || order.specialRequests || order.delivery?.instructions}
            </p>
          </div>
        )}

        {order.isCancelled && order.cancelReason && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-800">Cancellation Reason:</p>
            <p className="text-sm text-red-700">{order.cancelReason}</p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className={styles.itemsSection}>
        <h3 className={styles.sectionTitle}>Order Items</h3>
        
        <div className={styles.itemsList}>
          {displayItems.length > 0 ? (
            displayItems.map((item, index) => {
              // Handle both backend and frontend item structures
              const itemName = item.name || `Item ${index + 1}`;
              const itemPrice = parseFloat(item.price) || 0;
              const itemQuantity = parseInt(item.quantity) || 1;
              const itemCategory = item.category || 'Main Course';
              const itemId = item.foodId || item.id || item._id || index;
              const itemSubtotal = item.subtotal || (itemPrice * itemQuantity);

              return (
                <div key={itemId} className={styles.orderItem}>
                  <div className={styles.itemImage}>
                    <div className={styles.imagePlaceholder}>
                      {itemName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                      <h4 className={styles.itemName}>{itemName}</h4>
                      <span className={styles.itemQuantity}>×{itemQuantity}</span>
                    </div>
                    <p className={styles.itemCategory}>{itemCategory}</p>
                    <div className={styles.itemFooter}>
                      <span className={styles.itemPrice}>
                        <IndianRupee className="inline w-3 h-3" />
                        {itemSubtotal.toFixed(2)}
                      </span>
                      {item.rating && (
                        <span className={styles.itemRating}>
                          <Star className="inline w-3 h-3" /> {item.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No items found in this order</p>
            </div>
          )}
        </div>
      </div>

      {/* Price Summary */}
      <div className={styles.priceSection}>
        <h3 className={styles.sectionTitle}>Price Summary</h3>
        
        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>Subtotal</span>
            <span>
              <IndianRupee className="inline w-4 h-4" />
              {orderPricing.subtotal?.toFixed(2) || '0.00'}
            </span>
          </div>
          
          {orderPricing.discount && orderPricing.discount.amount > 0 && (
            <div className={styles.priceRow}>
              <span>
                Discount 
                {orderPricing.discount.type !== 'none' && 
                  ` (${orderPricing.discount.type})`
                }
              </span>
              <span className={styles.discount}>
                - <IndianRupee className="inline w-4 h-4" />
                {orderPricing.discount.amount.toFixed(2)}
              </span>
            </div>
          )}
          
          <div className={styles.priceRow}>
            <span>Tax ({orderPricing.taxRate || 9}%)</span>
            <span>
              <IndianRupee className="inline w-4 h-4" />
              {orderPricing.tax?.toFixed(2) || '0.00'}
            </span>
          </div>
          
          <div className={styles.priceRow}>
            <span>Delivery Fee</span>
            <span>
              <IndianRupee className="inline w-4 h-4" />
              {orderPricing.deliveryFee?.toFixed(2) || '0.00'}
            </span>
          </div>

          {orderPricing.tip > 0 && (
            <div className={styles.priceRow}>
              <span>Tip</span>
              <span>
                <IndianRupee className="inline w-4 h-4" />
                {orderPricing.tip.toFixed(2)}
              </span>
            </div>
          )}
          
          <div className={`${styles.priceRow} ${styles.totalRow}`}>
            <span>Total Amount</span>
            <span className={styles.totalAmount}>
              <IndianRupee className="inline w-5 h-5" />
              {orderPricing.total?.toFixed(2) || '0.00'}
            </span>
          </div>
          
          <div className={`${styles.priceRow} ${styles.paymentRow}`}>
            <span>Payment Method</span>
            <span className={styles.paymentMethod}>
              {order.payment?.method === 'cash' ? 'Cash on Delivery' : 
               order.payment?.method === 'upi' ? 'UPI Payment' : 
               order.payment?.method === 'card' ? 'Credit/Debit Card' :
               order.payment?.method === 'online' ? 'Online Payment' :
               order.payment?.method === 'wallet' ? 'Wallet' :
               order.paymentMethod === 'COD' ? 'Cash on Delivery' :
               order.paymentMethod === 'UPI' ? 'UPI Payment' :
               'Credit/Debit Card'}
            </span>
          </div>

          <div className={`${styles.priceRow} ${styles.paymentRow}`}>
            <span>Payment Status</span>
            <span className={`${styles.paymentStatus} ${
              order.payment?.status === 'paid' ? 'text-green-600' :
              order.payment?.status === 'failed' ? 'text-red-600' :
              order.payment?.status === 'refunded' ? 'text-blue-600' :
              order.payment?.status === 'partially_refunded' ? 'text-blue-500' :
              'text-orange-600'
            }`}>
              {order.payment?.status === 'paid' ? 'Paid' :
               order.payment?.status === 'failed' ? 'Failed' :
               order.payment?.status === 'refunded' ? 'Refunded' :
               order.payment?.status === 'partially_refunded' ? 'Partially Refunded' :
               'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className={styles.supportSection}>
        <h4 className={styles.supportTitle}>
          <HelpCircle className="inline w-5 h-5 mr-2" />
          Need Help?
        </h4>
        <p className={styles.supportText}>
          <Phone className="inline w-4 h-4 mr-1" /> Call us at <strong>1800-123-4567</strong>
        </p>
        <p className={styles.supportText}>
          <Mail className="inline w-4 h-4 mr-1" /> Email: support@fooddelivery.com
        </p>
        <p className={styles.supportNote}>
          {order.orderStatus === 'delivered' 
            ? 'Thank you for your order!' 
            : 'You\'ll receive order updates via SMS and email'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button
          onClick={onClose}
          className={styles.trackBtn}
        >
          {order.isCancelled ? 'Close' : 
           order.orderStatus === 'delivered' ? 'View Details' : 
           'Track Order'}
        </button>
        {/* {!order.isCancelled && order.orderStatus !== 'delivered' && (
          <button
            onClick={() => {
              // You could implement order tracking or refresh here
              console.log('Refresh order status:', order.orderId);
            }}
            className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100"
          >
            <RefreshCw className="inline w-4 h-4 mr-1" />
            Refresh Status
          </button>
        )} */}
        <button
          onClick={onNewOrder}
          className={styles.newOrderBtn}
        >
          Order Again
        </button>
      </div>
    </div>
  );
}

export default OrderSummaryPanel;