import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, IndianRupee, ForkKnifeCrossedIcon } from "lucide-react";
import SlidePanel from "./SlidePanel";
import OrderFormPanel from "./OrderFormPanel";
import OrderSummaryPanel from "./OrderSummaryPanel";
import { useCart } from '@/context/Cartcontext';
import { useOrder } from '@/context/admin/Ordercontext'; 
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

function CartPanel({ isOpen, onClose, styles }) {
  const [step, setStep] = useState('cart');
  const [orderData, setOrderData] = useState({
    // Customer fields
    name: '',
    phone: '',
    email: '',
    
    // Delivery address fields
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    
    // Delivery options
    deliveryTime: 'ASAP',
    scheduledTime: '',
    
    // Additional fields
    instructions: '',
    paymentMethod: 'cash',
  });
  const [orderDetails, setOrderDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  // Get cart context - NOW including getCartRestaurantId
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getCartTotal,
    getCartRestaurantId //  NOW IMPORTED
  } = useCart();

  const { createOrder } = useOrder(); 
  const { user } = useAuthContext();

  const calculateTotals = () => {
    const subtotal = getCartTotal();
    const discount = subtotal * 0.1; // 10% discount
    const taxRate = 9; // 9% tax
    const tax = (subtotal - discount) * (taxRate / 100);
    const deliveryFee = 50; // Fixed ₹50 delivery fee
    const total = subtotal - discount + tax + deliveryFee;
    
    return { subtotal, discount, tax, taxRate, deliveryFee, total };
  };

  const { subtotal, discount, tax, taxRate, deliveryFee, total } = calculateTotals();

  const handleProceedToCheckout = () => {
    // Check if cart has items
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Validate restaurant before proceeding
    const restaurantId = getCartRestaurantId(); //  NOW WORKS
    if (!restaurantId) {
      toast.error('Unable to identify restaurant. Please clear your cart and try again.', {
        duration: 4000
      });
      console.error('Restaurant validation failed. Cart items:', items);
      return;
    }

    // Pre-fill form with user data if logged in
    if (user) {
      setOrderData(prev => ({
        ...prev,
        name: user.fullname || user.username || prev.name,
        phone: user.phone || prev.phone,
        email: user.email || prev.email
      }));
    }
    
    setStep('checkout');
  };

  /**
   * Handle order placement with proper backend structure
   */
  const handlePlaceOrder = async (orderFormData) => {
    try {
      setIsSubmitting(true);
      
      // Get restaurant ID from cart using the imported function
      const restaurantId = getCartRestaurantId(); //  NOW WORKS
      
      if (!restaurantId) {
        toast.error('Cannot determine restaurant for this order');
        console.error('No restaurant ID found in cart');
        return;
      }

      // Validate cart items have _id
      const invalidItems = items.filter(item => !item._id);
      if (invalidItems.length > 0) {
        console.error('Cart items missing _id:', invalidItems);
        toast.error('Some items in your cart are invalid. Please remove them and try again.');
        return;
      }
      
      // Call createOrder with the correct parameters
      const response = await createOrder(items, orderFormData, restaurantId);
      
      if (response.success) {
        // Show success
        toast.success('Order placed successfully!');
        
        // Set order details for summary
        setOrderDetails(response.data);
        
        // Move to summary step
        setStep('summary');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToCart = () => {
    setStep('cart');
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('cart');
      setOrderData({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: 'Maharashtra',
        pincode: '',
        deliveryTime: 'ASAP',
        scheduledTime: '',
        instructions: '',
        paymentMethod: 'cash',
      });
      setOrderDetails(null);
    }, 300);
  };

  const renderContent = () => {
    switch(step) {
      case 'checkout':
        return (
          <OrderFormPanel
            orderData={orderData}
            onUpdateOrder={setOrderData}
            onSubmit={handlePlaceOrder}
            onBack={handleBackToCart}
            isSubmitting={isSubmitting}
            styles={styles.cartItemPanel.orderForm}
          />
        );
        
      case 'summary':
        return (
          <OrderSummaryPanel
            order={orderDetails}
            cartItems={items}
            subtotal={subtotal}
            discount={discount}
            tax={tax}
            deliveryFee={deliveryFee}
            total={total}
            onClose={handleClose}
            onNewOrder={() => {
              clearCart();
              handleClose();
            }}
            styles={styles.cartItemPanel.orderSummary}
          />
        );
        
      default:
        return renderCartContent();
    }
  };

  const renderCartContent = () => (
    <div className={styles.cartItemPanel.contentWrapper}>
      {items.length > 0 ? (
        <>
          <div className={styles.cartItemPanel.headerContainer}>
            <p className={styles.cartItemPanel.itemCount}>
              {items.length} {items.length === 1 ? 'item' : 'items'} in cart
            </p>

            <button
              onClick={clearCart}
              className={styles.cartItemPanel.clearBtn}
              aria-label="Clear all items"
            >
              <Trash2 className={styles.cartItemPanel.clearIcon} />
              Clear All
            </button>
          </div>

          <div className={styles.cartItemPanel.itemsContainer}>
            {items.map(item => {
              // Get rating value - handle both object and number
              const ratingValue = typeof item.rating === 'object' 
                ? item.rating?.average || 4 
                : item.rating || 4;

              return (
                <div
                  key={item._id || item.id}
                  className={styles.cartItemPanel.container}
                >
                  <div className={styles.cartItemPanel.innerContainer}>
                    <div className={styles.cartItemPanel.imageContainer}>
                      <ForkKnifeCrossedIcon className="w-8 h-8 text-orange-500" />
                    </div>

                    <div className={styles.cartItemPanel.contentContainer}>
                      <div className={styles.cartItemPanel.header}>
                        <div className={styles.cartItemPanel.nameContainer}>
                          <h3 className={styles.cartItemPanel.name}>
                            {item.name}
                          </h3>
                          <p className={styles.cartItemPanel.category}>
                            {item.category} • ⭐ {Number(ratingValue).toFixed(1)}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id || item.id)}
                          className={styles.cartItemPanel.removeBtn}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className={styles.cartItemPanel.removeIcon} />
                        </button>
                      </div>

                      <div className={styles.cartItemPanel.controlsContainer}>
                        <div className={styles.cartItemPanel.quantityControls}>
                          <button
                            onClick={() => updateQuantity(item._id || item.id, -1)}
                            disabled={item.quantity <= 1}
                            className={`${styles.cartItemPanel.quantityBtn} ${
                              item.quantity <= 1 ? styles.cartItemPanel.quantityBtnDisabled : ''
                            }`}
                            aria-label="Decrease quantity"
                          >
                            <Minus className={styles.cartItemPanel.quantityBtnIcon} />
                          </button>

                          <span className={styles.cartItemPanel.quantityText}>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item._id || item.id, 1)}
                            className={styles.cartItemPanel.quantityBtn}
                            aria-label="Increase quantity"
                          >
                            <Plus className={styles.cartItemPanel.quantityBtnIcon} />
                          </button>
                        </div>

                        <div className={styles.cartItemPanel.priceContainer}>
                          <p className={styles.cartItemPanel.unitPrice}>
                            ₹{Number(item.price).toFixed(2)} each
                          </p>
                          <p className={styles.cartItemPanel.totalPrice}>
                            ₹{(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.cartItemPanel.emptyState.container}>
          <ShoppingCart className={styles.cartItemPanel.emptyState.icon} />
          <p className={styles.cartItemPanel.emptyState.title}>
            Your cart is empty
          </p>
          <p className={styles.cartItemPanel.emptyState.description}>
            Add some delicious food to get started!
          </p>
          <button
            onClick={onClose}
            className={styles.cartItemPanel.emptyState.continueBtn}
          >
            Browse Menu
          </button>
        </div>
      )}
    </div>
  );

  const getTitle = () => {
    switch(step) {
      case 'checkout': return 'Delivery Details';
      case 'summary': return 'Order Confirmed!';
      default: return 'My Cart';
    }
  };

  const getFooter = () => {
    if (step === 'cart' && items.length > 0) {
      return (
        <div className={styles.cartItemPanel.footerStyles.container}>
          <div 
            className="flex items-center justify-between cursor-pointer mb-3"
            onClick={() => setIsFooterExpanded(!isFooterExpanded)}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Order Summary</span>
            </div>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={isFooterExpanded ? "Minimize order summary" : "Expand order summary"}
            >
              {isFooterExpanded ? (
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full">
                  <span className="text-gray-600">Close</span>
                  <Minus className="w-5 h-5 text-gray-600" />
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full">
                  <span className="text-gray-600">Open</span>
                  <Plus className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </button>
          </div>

          {isFooterExpanded && (
            <>
              <div className={styles.cartItemPanel.footerStyles.wrapper}>
                <div className={styles.cartItemPanel.footerStyles.subtotalContainer}>
                  <span className={styles.cartItemPanel.footerStyles.subtotalLabel}>
                    Subtotal
                  </span>
                  <span className={styles.cartItemPanel.footerStyles.subtotalValue}>
                    <IndianRupee className="inline w-4 h-4" />
                    {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className={styles.cartItemPanel.footerStyles.discountContainer}>
                  <span>Discount (10%)</span>
                  <span>
                    - <IndianRupee className="inline w-4 h-4" />
                    {discount.toFixed(2)}
                  </span>
                </div>

                <div className={styles.cartItemPanel.footerStyles.taxContainer}>
                  <span className={styles.cartItemPanel.footerStyles.taxLabel}>Tax ({taxRate}%)</span>
                  <span className={styles.cartItemPanel.footerStyles.taxValue}>
                    <IndianRupee className="inline w-4 h-4" />
                    {tax.toFixed(2)}
                  </span>
                </div>

                <div className={styles.cartItemPanel.footerStyles.deliveryContainer}>
                  <span>Delivery Fee</span>
                  <span>
                    <IndianRupee className="inline w-4 h-4" />
                    {deliveryFee.toFixed(2)}
                  </span>
                </div>

                <div className={styles.cartItemPanel.footerStyles.totalContainer}>
                  <span>Total</span>
                  <span className={styles.cartItemPanel.footerStyles.totalValue}>
                    <IndianRupee className="inline w-5 h-5" />
                    {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button 
                  onClick={handleProceedToCheckout}
                  className={styles.cartItemPanel.footerStyles.checkoutBtn}
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={onClose}
                  className={styles.cartItemPanel.footerStyles.continueBtn}
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}

          {!isFooterExpanded && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-700">
                      {items.length} {items.length === 1 ? 'item' : 'items'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Click to view details
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-500">
                    <IndianRupee className="inline w-4 h-4" />
                    {total.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Total amount
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      styles={styles}
      footer={getFooter()}
      showBackButton={step !== 'cart'}
      onBack={step !== 'cart' ? handleBackToCart : null}
    >
      {renderContent()}
    </SlidePanel>
  );
}

export default CartPanel;