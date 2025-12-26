import { User, Phone, MapPin, Clock, MessageSquare, CreditCard, Home, Navigation, Plus, Wallet, Smartphone, Globe } from "lucide-react";

function OrderFormPanel({
  orderData,
  onUpdateOrder,
  onSubmit,
  onBack,
  isSubmitting,
  styles
}) {
  const handleInputChange = (field, value) => {
    onUpdateOrder({ ...orderData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(orderData);
  };

  // Sample saved addresses
  const savedAddresses = [
    { id: 1, type: 'Home', address: '123 Main St, Mumbai - 400001' },
    { id: 2, type: 'Office', address: '456 Business Park, Andheri - 400053' },
  ];

  return (
    <div className={styles.container}>
      <form id="order-form" onSubmit={handleSubmit} className={styles.form}>
        {/* Saved Addresses */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Navigation className={styles.sectionIcon} />
            Saved Addresses
          </h3>
          
          <div className={styles.addressGrid}>
            {savedAddresses.map(address => (
              <button
                key={address.id}
                type="button"
                onClick={() => {
                  // Parse address (simplified)
                  const parts = address.address.split(', ');
                  onUpdateOrder({
                    ...orderData,
                    address: parts[0],
                    city: parts[1]?.split(' - ')[0] || '',
                    pincode: parts[1]?.split(' - ')[1] || ''
                  });
                }}
                className={`${styles.addressCard} ${
                  orderData.address === address.address.split(', ')[0] 
                    ? styles.addressCardActive 
                    : ''
                }`}
              >
                <div className={styles.addressCardHeader}>
                  {address.type === 'Home' ? (
                    <Home className={styles.addressIcon} />
                  ) : (
                    <Navigation className={styles.addressIcon} />
                  )}
                  <span className={styles.addressType}>{address.type}</span>
                </div>
                <p className={styles.addressText}>{address.address}</p>
              </button>
            ))}
            
            <button
              type="button"
              className={styles.newAddressCard}
              onClick={() => {
                onUpdateOrder({
                  ...orderData,
                  address: '',
                  city: '',
                  pincode: ''
                });
              }}
            >
              <Plus className={styles.plusIcon} />
              <span>Add New Address</span>
            </button>
          </div>
        </div>

        {/* Personal Details */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <User className={styles.sectionIcon} />
            Contact Details
          </h3>
          
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                value={orderData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={styles.input}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number *
              </label>
              <div className={styles.phoneInput}>
                <span className={styles.phonePrefix}>+91</span>
                <input
                  id="phone"
                  type="tel"
                  value={orderData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`${styles.input} ${styles.phoneInputField}`}
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <p className={styles.inputHint}>10-digit mobile number</p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MapPin className={styles.sectionIcon} />
            Delivery Address
          </h3>
          
          <div className={styles.inputGroup}>
            <label htmlFor="address" className={styles.label}>
              Complete Address *
            </label>
            <textarea
              id="address"
              value={orderData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={styles.textarea}
              placeholder="House/Flat No, Building, Street, Landmark"
              rows="3"
              required
            />
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="city" className={styles.label}>
                City *
              </label>
              <select
                id="city"
                value={orderData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="pincode" className={styles.label}>
                Pincode *
              </label>
              <input
                id="pincode"
                type="text"
                value={orderData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className={styles.input}
                placeholder="400001"
                pattern="[0-9]{6}"
                required
              />
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Clock className={styles.sectionIcon} />
            Delivery Time
          </h3>
          
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="deliveryTime"
                value="ASAP"
                checked={orderData.deliveryTime === 'ASAP'}
                onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioText}>ASAP Delivery</span>
                <span className={styles.radioSubtext}>45-60 minutes • No extra charge</span>
              </div>
            </label>
            
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="deliveryTime"
                value="SCHEDULE"
                checked={orderData.deliveryTime === 'SCHEDULE'}
                onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                className={styles.radioInput}
              />
              <div className={styles.radioContent}>
                <span className={styles.radioText}>Schedule for later</span>
                <span className={styles.radioSubtext}>Choose your preferred time</span>
              </div>
            </label>
          </div>

          {orderData.deliveryTime === 'SCHEDULE' && (
            <div className={styles.inputGroup}>
              <label htmlFor="scheduledTime" className={styles.label}>
                Preferred Date & Time
              </label>
              <input
                id="scheduledTime"
                type="datetime-local"
                value={orderData.scheduledTime}
                onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                className={styles.input}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          )}
        </div>

        {/* Special Instructions */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MessageSquare className={styles.sectionIcon} />
            Special Instructions
          </h3>
          
          <div className={styles.inputGroup}>
            <textarea
              value={orderData.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              className={styles.textarea}
              placeholder="Any delivery instructions, allergies, or preferences... (Optional)"
              rows="2"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <CreditCard className={styles.sectionIcon} />
            Payment Method
          </h3>
          
          <div className={styles.paymentOptions}>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={orderData.paymentMethod === 'COD'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className={styles.paymentRadio}
              />
              <div className={styles.paymentContent}>
                <div className={styles.paymentIcon}>
                  <Wallet className="w-6 h-6" />
                </div>
                <div className={styles.paymentText}>
                  <div className={styles.paymentTitle}>Cash on Delivery</div>
                  <div className={styles.paymentDesc}>Pay when you receive your order</div>
                </div>
              </div>
            </label>

            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={orderData.paymentMethod === 'UPI'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className={styles.paymentRadio}
              />
              <div className={styles.paymentContent}>
                <div className={styles.paymentIcon}>
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className={styles.paymentText}>
                  <div className={styles.paymentTitle}>UPI Payment</div>
                  <div className={styles.paymentDesc}>Pay instantly via UPI</div>
                </div>
              </div>
            </label>

            <label className={styles.paymentOption}>
              <input
                type="radio"
                name="paymentMethod"
                value="CARD"
                checked={orderData.paymentMethod === 'CARD'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                className={styles.paymentRadio}
              />
              <div className={styles.paymentContent}>
                <div className={styles.paymentIcon}>
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className={styles.paymentText}>
                  <div className={styles.paymentTitle}>Credit/Debit Card</div>
                  <div className={styles.paymentDesc}>Secure card payment</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onBack}
            className={styles.backBtn}
            disabled={isSubmitting}
          >
            Back to Cart
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles.submitBtn} ${isSubmitting ? styles.submitBtnLoading : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderFormPanel;