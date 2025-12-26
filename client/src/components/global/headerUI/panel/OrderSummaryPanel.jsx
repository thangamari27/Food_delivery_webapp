import { CheckCircle, Clock, ChefHat, Bike, Package, Phone, MapPin, Mail, Star, HelpCircle } from "lucide-react";
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
  
  const steps = [
    { icon: <Package />, label: 'Order Placed', time: order?.placedAt },
    { icon: <ChefHat />, label: 'Preparing', time: 'Estimated: 10-15 min' },
    { icon: <Bike />, label: 'On the Way', time: 'Estimated: 20-30 min' },
    { icon: <CheckCircle />, label: 'Delivered', time: order?.estimatedDelivery },
  ];

  // Simulate step progression
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Success Header */}
      <div className={styles.successHeader}>
        <div className={styles.successIconContainer}>
          <CheckCircle className={styles.successIcon} />
        </div>
        <h2 className={styles.successTitle}>Order Confirmed!</h2>
        <p className={styles.successSubtitle}>
          Your order #{order.orderId} has been placed successfully
        </p>
      </div>

      {/* Order Tracking */}
      <div className={styles.trackingSection}>
        <h3 className={styles.sectionTitle}>Order Status</h3>
        
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={index} className={styles.timelineStep}>
              <div className={styles.timelineContent}>
                <div className={`${styles.stepIcon} ${
                  index <= currentStep ? styles.stepIconActive : styles.stepIconInactive
                }`}>
                  {step.icon}
                </div>
                <div className={styles.stepInfo}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  <span className={styles.stepTime}>{step.time}</span>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`${styles.connector} ${
                  index < currentStep ? styles.connectorActive : ''
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.etaContainer}>
          <Clock className={styles.etaIcon} />
          <span className={styles.etaText}>
            Estimated delivery: <strong>{order.estimatedDelivery}</strong>
          </span>
        </div>
      </div>

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
              <p className={styles.detailValue}>{order.deliveryAddress}</p>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>
              <Phone />
            </div>
            <div>
              <p className={styles.detailLabel}>Contact</p>
              <p className={styles.detailValue}>{order.customerName} • {order.phone}</p>
            </div>
          </div>
        </div>
        
        {order.instructions && (
          <div className={styles.instructions}>
            <p className={styles.instructionsLabel}>Special Instructions:</p>
            <p className={styles.instructionsText}>{order.instructions}</p>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className={styles.itemsSection}>
        <h3 className={styles.sectionTitle}>Order Items</h3>
        
        <div className={styles.itemsList}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.orderItem}>
              <div className={styles.itemImage}>
                <div className={styles.imagePlaceholder}>
                  {item.name.charAt(0)}
                </div>
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.itemHeader}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <span className={styles.itemQuantity}>×{item.quantity}</span>
                </div>
                <p className={styles.itemCategory}>{item.category}</p>
                <div className={styles.itemFooter}>
                  <span className={styles.itemPrice}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                  {item.rating && (
                    <span className={styles.itemRating}>
                      <Star className="inline w-3 h-3" /> {item.rating}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <div className={styles.priceSection}>
        <h3 className={styles.sectionTitle}>Price Summary</h3>
        
        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className={styles.priceRow}>
            <span>Discount (10%)</span>
            <span className={styles.discount}>- ₹{discount.toFixed(2)}</span>
          </div>
          
          <div className={styles.priceRow}>
            <span>Tax (8%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          
          <div className={styles.priceRow}>
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          
          <div className={`${styles.priceRow} ${styles.totalRow}`}>
            <span>Total Amount</span>
            <span className={styles.totalAmount}>₹{total.toFixed(2)}</span>
          </div>
          
          <div className={`${styles.priceRow} ${styles.paymentRow}`}>
            <span>Payment Method</span>
            <span className={styles.paymentMethod}>
              {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 
               order.paymentMethod === 'UPI' ? 'UPI Payment' : 'Credit/Debit Card'}
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
          You'll receive order updates via SMS and email
        </p>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button
          onClick={onClose}
          className={styles.trackBtn}
        >
          Track Order
        </button>
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