import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, IndianRupee, ForkKnifeCrossedIcon } from "lucide-react";
import SlidePanel from "./SlidePanel";
import OrderFormPanel from "./OrderFormPanel";
import OrderSummaryPanel from "./OrderSummaryPanel";

function CartPanel({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  styles
}) {
  const [step, setStep] = useState('cart'); // 'cart', 'checkout', 'summary'
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    deliveryTime: 'ASAP',
    scheduledTime: '',
    instructions: '',
    paymentMethod: 'COD',
  });
  const [orderDetails, setOrderDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * 0.1;
    const tax = (subtotal - discount) * 0.08;
    const deliveryFee = 20;
    const total = subtotal - discount + tax + deliveryFee;
    
    return { subtotal, discount, tax, deliveryFee, total };
  };

  const { subtotal, discount, tax, deliveryFee, total } = calculateTotals();

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const handlePlaceOrder = async (orderData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const orderId = `ORD${Date.now().toString().slice(-6)}`;
    const placedAt = new Date().toLocaleString();
    
    const details = {
      orderId,
      placedAt,
      deliveryAddress: `${orderData.address}, ${orderData.city} - ${orderData.pincode}`,
      estimatedDelivery: orderData.deliveryTime === 'ASAP' 
        ? '45-60 minutes' 
        : new Date(orderData.scheduledTime).toLocaleString(),
      deliveryFee,
      customerName: orderData.name,
      phone: orderData.phone,
      instructions: orderData.instructions,
      paymentMethod: orderData.paymentMethod,
    };
    
    setOrderDetails(details);
    setStep('summary');
    setIsSubmitting(false);
  };

  const handleBackToCart = () => {
    setStep('cart');
  };

  const handleClose = () => {
    onClose();
    // Reset to initial state after a delay
    setTimeout(() => {
      setStep('cart');
      setOrderData({
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        deliveryTime: 'ASAP',
        scheduledTime: '',
        instructions: '',
        paymentMethod: 'COD',
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
              onClearCart();
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
              onClick={onClearCart}
              className={styles.cartItemPanel.clearBtn}
              aria-label="Clear all items"
            >
              <Trash2 className={styles.cartItemPanel.clearIcon} />
              Clear All
            </button>
          </div>

          <div className={styles.cartItemPanel.itemsContainer}>
            {items.map(item => (
              <div
                key={item.id}
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
                          {item.category} • ⭐ {item.rating}
                        </p>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className={styles.cartItemPanel.removeBtn}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className={styles.cartItemPanel.removeIcon} />
                      </button>
                    </div>

                    <div className={styles.cartItemPanel.controlsContainer}>
                      <div className={styles.cartItemPanel.quantityControls}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
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
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className={styles.cartItemPanel.quantityBtn}
                          aria-label="Increase quantity"
                        >
                          <Plus className={styles.cartItemPanel.quantityBtnIcon} />
                        </button>
                      </div>

                      <div className={styles.cartItemPanel.priceContainer}>
                        <p className={styles.cartItemPanel.unitPrice}>
                          ₹{item.price.toFixed(2)} each
                        </p>
                        <p className={styles.cartItemPanel.totalPrice}>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        {/* Collapsible Header */}
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
              <>
                <p className="flex items-center gap-2 bg-gray-100 p-2 rounded-full">
                  <span className="text-gray-600">Close</span>
                  <Minus className=" w-5 h-5 text-gray-600" />
                </p>
              </>
            ) : (
              <>
              <p className="flex items-center gap-2 bg-gray-100 p-2 rounded-full">
                  <span className="text-gray-600">open</span>
                  <Plus className=" w-5 h-5 text-gray-600" />
                </p>
              </>
            )}
          </button>
        </div>

        {/* Collapsible Content */}
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
                <span className={styles.cartItemPanel.footerStyles.taxLabel}>Tax (8%)</span>
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

        {/* Show minimal view when collapsed */}
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