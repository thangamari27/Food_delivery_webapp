import { User, Phone, MapPin, Clock, MessageSquare, CreditCard, Home, Navigation, Plus, Wallet, Smartphone } from "lucide-react";
import { useState } from "react";

function OrderFormPanel({
  orderData,
  onUpdateOrder,
  onSubmit,
  onBack,
  isSubmitting,
  styles
}) {
  const [usesSavedAddress, setUsesSavedAddress] = useState(false);

  const handleInputChange = (field, value) => {
    onUpdateOrder({ ...orderData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!orderData.name?.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!orderData.phone?.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!orderData.address?.trim()) {
      alert('Please enter delivery address');
      return;
    }
    if (!orderData.city?.trim()) {
      alert('Please select a city');
      return;
    }
    if (!orderData.pincode?.trim()) {
      alert('Please enter pincode');
      return;
    }

    // Submit the form
    onSubmit(orderData);
  };

  // Sample saved addresses (in production, fetch from user profile)
  const savedAddresses = [
    { 
      id: 1, 
      type: 'Home', 
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    },
    { 
      id: 2, 
      type: 'Office', 
      street: '456 Business Park, Andheri',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053'
    },
  ];

  const selectSavedAddress = (address) => {
    setUsesSavedAddress(true);
    onUpdateOrder({
      ...orderData,
      address: address.street,
      city: address.city,
      state: address.state || 'Maharashtra',
      pincode: address.pincode
    });
  };

  const clearAddress = () => {
    setUsesSavedAddress(false);
    onUpdateOrder({
      ...orderData,
      address: '',
      city: '',
      state: '',
      pincode: ''
    });
  };

  return (
    <div className={styles.container}>
      <form id="order-form" onSubmit={handleSubmit} className={styles.form}>
        
        {/* Saved Addresses Section */}
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
                onClick={() => selectSavedAddress(address)}
                className={`${styles.addressCard} ${
                  orderData.address === address.street 
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
                <p className={styles.addressText}>
                  {address.street}, {address.city} - {address.pincode}
                </p>
              </button>
            ))}
            
            <button
              type="button"
              className={styles.newAddressCard}
              onClick={clearAddress}
            >
              <Plus className={styles.plusIcon} />
              <span>Add New Address</span>
            </button>
          </div>
        </div>

        {/* Contact Details - Maps to customer: { name, phone, email } */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <User className={styles.sectionIcon} />
            Contact Details
          </h3>
          
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={orderData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={styles.input}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className={styles.phoneInput}>
                <span className={styles.phonePrefix}>+91</span>
                <input
                  id="phone"
                  type="tel"
                  value={orderData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`${styles.input} ${styles.phoneInputField}`}
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                />
              </div>
              <p className={styles.inputHint}>10-digit mobile number</p>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                value={orderData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={styles.input}
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>

        {/* Delivery Address - Maps to delivery.address: { street, city, state, zipCode, country } */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MapPin className={styles.sectionIcon} />
            Delivery Address
          </h3>
          
          <div className={styles.inputGroup}>
            <label htmlFor="address" className={styles.label}>
              Complete Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              value={orderData.address || ''}
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
                City <span className="text-red-500">*</span>
              </label>
              <select
                id="city"
                value={orderData.city || ''}
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
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="state" className={styles.label}>
                State
              </label>
              <input
                id="state"
                type="text"
                value={orderData.state || 'Maharashtra'}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={styles.input}
                placeholder="State"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="pincode" className={styles.label}>
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                id="pincode"
                type="text"
                value={orderData.pincode || ''}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className={styles.input}
                placeholder="400001"
                pattern="[0-9]{6}"
                maxLength="6"
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
                value={orderData.scheduledTime || ''}
                onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                className={styles.input}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          )}
        </div>

        {/* Special Instructions - Maps to notes field */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <MessageSquare className={styles.sectionIcon} />
            Special Instructions
          </h3>
          
          <div className={styles.inputGroup}>
            <textarea
              value={orderData.instructions || ''}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              className={styles.textarea}
              placeholder="Any delivery instructions, allergies, or preferences... (Optional)"
              rows="3"
            />
          </div>
        </div>

        {/* Payment Method - Maps to payment.method */}
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
                value="cash"
                checked={orderData.paymentMethod === 'cash'}
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
                value="upi"
                checked={orderData.paymentMethod === 'upi'}
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
                value="card"
                checked={orderData.paymentMethod === 'card'}
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