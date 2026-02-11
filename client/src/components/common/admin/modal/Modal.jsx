import { X, AlertCircle, Search, Minus, Plus, IndianRupee, Loader2, ChevronDown, ChevronUp, MapPin, Clock, User, Package, CreditCard, Truck, FileText } from "lucide-react";
import { useState, useMemo } from "react";

function Modal({ 
  modalState, 
  formData, 
  formErrors, 
  selectedFoodItems,
  allFoodItems = [], 
  foodsLoading = false,
  restaurants = [],
  restaurantsLoading = false,
  content,
  styles,
  getStatusBadge,
  formatDate,
  calculateTotal,
  closeModal,
  handleSubmit,
  handleDelete,
  setFormData,
  handleFoodItemToggle,
  updateQuantity,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  user // Current authenticated user
}) {
  const { type, data } = modalState;
  const modalContent = content.modalContent[type];

  // Section collapse states
  const [expandedSections, setExpandedSections] = useState({
    customer: true,
    delivery: true,
    restaurant: true,
    items: true,
    pricing: true,
    tracking: false,
    additional: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div 
        className={`${styles.modalContainer} max-w-6xl max-h-[90vh] overflow-y-auto`} 
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader 
          title={modalContent?.title || ''}
          closeModal={closeModal}
          styles={styles}
        />
        
        <div className={styles.modalBody}>
          {type === 'add' || type === 'edit' ? (
            <AddEditForm 
              formData={formData}
              formErrors={formErrors}
              selectedFoodItems={selectedFoodItems}
              allFoodItems={allFoodItems}
              foodsLoading={foodsLoading}
              restaurants={restaurants}
              restaurantsLoading={restaurantsLoading}
              content={content}
              styles={styles}
              calculateTotal={calculateTotal}
              setFormData={setFormData}
              handleFoodItemToggle={handleFoodItemToggle}
              updateQuantity={updateQuantity}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              expandedSections={expandedSections}
              toggleSection={toggleSection}
              user={user}
              isEdit={type === 'edit'}
            />
          ) : type === 'view' ? (
            <ViewOrderDetails 
              order={data}
              getStatusBadge={getStatusBadge}
              formatDate={formatDate}
              styles={styles}
            />
          ) : type === 'delete' ? (
            <DeleteConfirmation 
              message={modalContent?.message}
              styles={styles}
            />
          ) : null}
        </div>

        <ModalFooter 
          type={type}
          modalContent={modalContent}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          handleDelete={() => handleDelete(data?.id || data?.orderId)}
          styles={styles}
        />
      </div>
    </div>
  );
}

// Modal Header Component
function ModalHeader({ title, closeModal, styles }) {
  return (
    <div className={styles.modalHeader}>
      <h2 className={styles.modalTitle}>{title}</h2>
      <button 
        onClick={closeModal} 
        className={styles.modalCloseButton}
      >
        <X className={styles.modalCloseIcon} />
      </button>
    </div>
  );
}

// Add/Edit Form Component
function AddEditForm({ 
  formData, 
  formErrors, 
  selectedFoodItems, 
  allFoodItems,
  foodsLoading,
  restaurants,
  restaurantsLoading,
  content, 
  styles, 
  calculateTotal, 
  setFormData, 
  handleFoodItemToggle, 
  updateQuantity,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  expandedSections,
  toggleSection,
  user,
  isEdit
}) {
  const total = calculateTotal();
  
  // Handle restaurant selection
  const handleRestaurantChange = (e) => {
    const restaurantId = e.target.value;
    const restaurant = restaurants.find(r => r.id === restaurantId || r._id === restaurantId);
    
    if (restaurant) {
      setFormData({
        ...formData,
        restaurantId: restaurant.id || restaurant._id,
        restaurantName: restaurant.name,
        restaurantPhone: restaurant.phone
      });
    }
  };
  
  return (
    <div className="space-y-4">
      {/* CUSTOMER INFORMATION SECTION */}
      <CollapsibleSection
        title="Customer Information"
        icon={User}
        isExpanded={expandedSections.customer}
        onToggle={() => toggleSection('customer')}
        hasError={formErrors.customerName || formErrors.phone || formErrors.email}
      >
        <CustomerSection 
          formData={formData}
          formErrors={formErrors}
          content={content}
          styles={styles}
          setFormData={setFormData}
          user={user}
        />
      </CollapsibleSection>

      {/* DELIVERY DETAILS SECTION */}
      <CollapsibleSection
        title="Delivery Details"
        icon={MapPin}
        isExpanded={expandedSections.delivery}
        onToggle={() => toggleSection('delivery')}
        hasError={formErrors.street || formErrors.city || formErrors.state || formErrors.zipCode}
      >
        <DeliverySection 
          formData={formData}
          formErrors={formErrors}
          content={content}
          styles={styles}
          setFormData={setFormData}
        />
      </CollapsibleSection>

      {/* RESTAURANT SELECTION SECTION */}
      <CollapsibleSection
        title="Restaurant Selection"
        icon={Package}
        isExpanded={expandedSections.restaurant}
        onToggle={() => toggleSection('restaurant')}
        hasError={formErrors.restaurantId}
      >
        <RestaurantSection 
          formData={formData}
          formErrors={formErrors}
          restaurants={restaurants}
          restaurantsLoading={restaurantsLoading}
          content={content}
          styles={styles}
          handleRestaurantChange={handleRestaurantChange}
        />
      </CollapsibleSection>

      {/* ORDER ITEMS SECTION */}
      <CollapsibleSection
        title="Order Items"
        icon={Package}
        isExpanded={expandedSections.items}
        onToggle={() => toggleSection('items')}
        hasError={formErrors.foodItems}
        badge={selectedFoodItems.length > 0 ? selectedFoodItems.length : null}
      >
        {selectedFoodItems.length > 0 && (
          <SelectedItemsSummary 
            selectedFoodItems={selectedFoodItems}
            onClearAll={() => selectedFoodItems.forEach(item => handleFoodItemToggle(item))}
          />
        )}
        
        <FoodItemsSection 
          selectedFoodItems={selectedFoodItems}
          allFoodItems={allFoodItems}
          foodsLoading={foodsLoading}
          content={content}
          styles={styles}
          handleFoodItemToggle={handleFoodItemToggle}
          updateQuantity={updateQuantity}
          formErrors={formErrors}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </CollapsibleSection>

      {/* PRICING & PAYMENT SECTION */}
      <CollapsibleSection
        title="Pricing & Payment"
        icon={CreditCard}
        isExpanded={expandedSections.pricing}
        onToggle={() => toggleSection('pricing')}
      >
        <PricingPaymentSection 
          formData={formData}
          formErrors={formErrors}
          selectedFoodItems={selectedFoodItems}
          total={total}
          content={content}
          styles={styles}
          setFormData={setFormData}
        />
      </CollapsibleSection>

      {/* DELIVERY TRACKING SECTION (Edit Mode Only) */}
      {isEdit && (
        <CollapsibleSection
          title="Delivery Tracking"
          icon={Truck}
          isExpanded={expandedSections.tracking}
          onToggle={() => toggleSection('tracking')}
        >
          <TrackingSection 
            formData={formData}
            formErrors={formErrors}
            content={content}
            styles={styles}
            setFormData={setFormData}
          />
        </CollapsibleSection>
      )}

      {/* ADDITIONAL INFORMATION SECTION */}
      <CollapsibleSection
        title="Additional Information"
        icon={FileText}
        isExpanded={expandedSections.additional}
        onToggle={() => toggleSection('additional')}
      >
        <AdditionalInfoSection 
          formData={formData}
          content={content}
          styles={styles}
          setFormData={setFormData}
        />
      </CollapsibleSection>
    </div>
  );
}

// Collapsible Section Component
function CollapsibleSection({ title, icon: Icon, isExpanded, onToggle, hasError, badge, children }) {
  return (
    <div className={`border rounded-lg ${hasError ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${hasError ? 'text-red-500' : 'text-gray-600'}`} />
          <h3 className={`text-base font-semibold ${hasError ? 'text-red-700' : 'text-gray-800'}`}>
            {title}
          </h3>
          {badge && (
            <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
              {badge}
            </span>
          )}
          {hasError && (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

// Customer Section Component
function CustomerSection({ formData, formErrors, content, styles, setFormData, user }) {
  return (
    <div className="space-y-4">
      <div className={styles.formGrid}>
        <FormGroup 
          label={content.formFields?.customerName?.label || "Customer Name"}
          required={true}
          error={formErrors.customerName}
        >
          <input 
            type="text" 
            value={formData.customerName || ''} 
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} 
            className={styles.formInput}
            placeholder="Enter full name"
          />
        </FormGroup>
        
        <FormGroup 
          label={content.formFields?.phoneNumber?.label || "Phone Number"}
          required={true}
          error={formErrors.phone}
        >
          <input 
            type="tel" 
            value={formData.phone || ''} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            className={styles.formInput}
            placeholder="+91 XXXXX XXXXX"
          />
        </FormGroup>
      </div>

      <FormGroup 
        label={content.formFields?.email?.label || "Email Address"}
        required={false}
        error={formErrors.email}
      >
        <input 
          type="email" 
          value={formData.email || ''} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          className={styles.formInput}
          placeholder="customer@example.com"
        />
      </FormGroup>

      {user && (
        <input type="hidden" value={formData.userId || user.id || user._id} />
      )}
    </div>
  );
}

// Delivery Section Component
function DeliverySection({ formData, formErrors, content, styles, setFormData }) {
  // Indian states dropdown
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  return (
    <div className="space-y-4">
      <div className={styles.formGrid}>
        <FormGroup 
          label="Street Address"
          required={true}
          error={formErrors.street}
        >
          <input 
            type="text" 
            value={formData.street || ''} 
            onChange={(e) => setFormData({ ...formData, street: e.target.value })} 
            className={styles.formInput}
            placeholder="House/Building number, Street name"
          />
        </FormGroup>

        <FormGroup 
          label="Apartment/Suite (Optional)"
          required={false}
        >
          <input 
            type="text" 
            value={formData.apartment || ''} 
            onChange={(e) => setFormData({ ...formData, apartment: e.target.value })} 
            className={styles.formInput}
            placeholder="Apt, Suite, Floor (optional)"
          />
        </FormGroup>
      </div>

      <div className={styles.formGrid}>
        <FormGroup 
          label="City"
          required={true}
          error={formErrors.city}
        >
          <input 
            type="text" 
            value={formData.city || ''} 
            onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
            className={styles.formInput}
            placeholder="Enter city"
          />
        </FormGroup>

        <FormGroup 
          label="State"
          required={true}
          error={formErrors.state}
        >
          <select 
            value={formData.state || ''} 
            onChange={(e) => setFormData({ ...formData, state: e.target.value })} 
            className={styles.formSelect}
          >
            <option value="">Select State</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </FormGroup>
      </div>

      <div className={styles.formGrid}>
        <FormGroup 
          label="Zip Code"
          required={true}
          error={formErrors.zipCode}
        >
          <input 
            type="text" 
            value={formData.zipCode || ''} 
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })} 
            className={styles.formInput}
            placeholder="400001"
            maxLength="6"
          />
        </FormGroup>

        <FormGroup 
          label="Country"
          required={true}
        >
          <select 
            value={formData.country || 'India'} 
            onChange={(e) => setFormData({ ...formData, country: e.target.value })} 
            className={styles.formSelect}
          >
            <option value="India">India</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
          </select>
        </FormGroup>
      </div>

      <FormGroup 
        label="Delivery Instructions (Optional)"
        required={false}
      >
        <textarea 
          value={formData.deliveryInstructions || ''} 
          onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })} 
          rows={2} 
          className={styles.formTextarea}
          placeholder="Special delivery instructions (e.g., gate code, landmark)"
          maxLength="500"
        />
      </FormGroup>

      {/* Optional Coordinates */}
      <div className="grid grid-cols-2 gap-4">
        <FormGroup label="Latitude (Optional)">
          <input 
            type="number" 
            step="0.000001"
            value={formData.latitude || ''} 
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} 
            className={styles.formInput}
            placeholder="19.0760"
          />
        </FormGroup>

        <FormGroup label="Longitude (Optional)">
          <input 
            type="number" 
            step="0.000001"
            value={formData.longitude || ''} 
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} 
            className={styles.formInput}
            placeholder="72.8777"
          />
        </FormGroup>
      </div>
    </div>
  );
}

// Restaurant Section Component
function RestaurantSection({ formData, formErrors, restaurants, restaurantsLoading, content, styles, handleRestaurantChange }) {
  return (
    <div className="space-y-4">
      <FormGroup 
        label="Select Restaurant"
        required={true}
        error={formErrors.restaurantId}
      >
        {restaurantsLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-orange-500 animate-spin mr-2" />
            <span className="text-gray-600">Loading restaurants...</span>
          </div>
        ) : (
          <select 
            value={formData.restaurantId || ''} 
            onChange={handleRestaurantChange}
            className={styles.formSelect}
          >
            <option value="">-- Select Restaurant --</option>
            {restaurants.map(restaurant => (
              <option 
                key={restaurant.id || restaurant._id} 
                value={restaurant.id || restaurant._id}
              >
                {restaurant.name} {restaurant.phone ? `- ${restaurant.phone}` : ''}
              </option>
            ))}
          </select>
        )}
      </FormGroup>

      {formData.restaurantId && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Restaurant Name:</span>
            <span className="font-medium text-gray-800">{formData.restaurantName || 'N/A'}</span>
          </div>
          {formData.restaurantPhone && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium text-gray-800">{formData.restaurantPhone}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Food Items Section Component
function FoodItemsSection({ 
  selectedFoodItems, 
  allFoodItems,
  foodsLoading,
  content, 
  styles, 
  handleFoodItemToggle, 
  updateQuantity, 
  formErrors,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) {
  return (
    <FormGroup 
      label={content.formFields?.foodItems?.label || "Food Items"}
      required={true}
      error={formErrors.foodItems}
    >
      <FoodItemSearch 
        foodItems={allFoodItems}
        selectedFoodItems={selectedFoodItems}
        foodsLoading={foodsLoading}
        handleFoodItemToggle={handleFoodItemToggle}
        updateQuantity={updateQuantity}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </FormGroup>
  );
}

// Food Item Search Component
function FoodItemSearch({ 
  foodItems, 
  selectedFoodItems, 
  foodsLoading,
  handleFoodItemToggle, 
  updateQuantity,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory
}) {
  
  // Get unique categories
  const categories = useMemo(() => {
    if (!foodItems || foodItems.length === 0) return ['all'];
    const uniqueCategories = ['all', ...new Set(
      foodItems
        .map(item => item.category)
        .filter(Boolean)
        .map(cat => cat.trim())
    )];
    return uniqueCategories;
  }, [foodItems]);
  
  // Filter food items
  const filteredFoodItems = useMemo(() => {
    if (!foodItems || !Array.isArray(foodItems)) return [];
    
    return foodItems.filter(item => {
      if (!item || !item.name) return false;
      
      const matchesSearch = !searchTerm || 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        (item.category && item.category.trim() === selectedCategory);
      
      const isActive = item.isActive === undefined ? true : item.isActive !== false;
      const isAvailable = item.isAvailable === undefined ? true : item.isAvailable !== false;
      
      return matchesSearch && matchesCategory && isActive && isAvailable;
    });
  }, [foodItems, searchTerm, selectedCategory]);
  
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search food items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {foodsLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          <span className="ml-3 text-gray-600">Loading food items...</span>
        </div>
      )}
      
      {!foodsLoading && filteredFoodItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
          {filteredFoodItems.map(item => {
            const selected = selectedFoodItems.find(si => 
              si.fid === item.fid || 
              si.id === item.id ||
              si.name?.toLowerCase() === item.name?.toLowerCase()
            );
            
            return (
              <FoodItemCard 
                key={item.id || item.fid || item._id}
                item={item}
                selected={selected}
                handleFoodItemToggle={handleFoodItemToggle}
                updateQuantity={updateQuantity}
              />
            );
          })}
        </div>
      )}
      
      {!foodsLoading && filteredFoodItems.length === 0 && (
        <div className="text-center py-8 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-500 mb-2">
            {!foodItems || foodItems.length === 0 
              ? 'No food items available.'
              : 'No items found.'}
          </p>
          {foodItems && foodItems.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Food Item Card Component
function FoodItemCard({ item, selected, handleFoodItemToggle, updateQuantity }) {
  const itemId = item.fid || item.id || item._id;
  const itemName = item.name;
  const itemPrice = item.price;
  const itemCategory = item.category;
  const itemDescription = item.description;
  const itemImage = item.image?.url || item.image;
  
  return (
    <div 
      className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
        selected 
          ? 'border-2 border-orange-400 bg-orange-50 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
      onClick={() => handleFoodItemToggle(item)}
    >
      <div className="flex items-start gap-3">
        {itemImage && (
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src={itemImage} 
              alt={itemName}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 text-sm truncate">{itemName}</h4>
              {itemDescription && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{itemDescription}</p>
              )}
            </div>
            
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFoodItemToggle(item);
              }}
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                selected 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {selected ? '✓' : '+'}
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-orange-600 text-sm flex items-center">
              <IndianRupee className="w-3 h-3" />
              {itemPrice?.toFixed(2)}
            </span>
            
            {itemCategory && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                {itemCategory}
              </span>
            )}
          </div>
          
          {selected && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(itemId, -1);
                    }}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={selected.quantity <= 1}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <div className="w-12 text-center">
                    <span className="font-semibold text-gray-800">{selected.quantity}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(itemId, 1);
                    }}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="mt-2 text-right">
                <span className="text-sm font-medium text-gray-700">
                  Total: <span className="text-orange-600 flex items-center justify-end">
                    <IndianRupee className="w-3 h-3" />
                    {(itemPrice * selected.quantity).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Selected Items Summary
function SelectedItemsSummary({ selectedFoodItems, onClearAll }) {
  if (selectedFoodItems.length === 0) return null;
  
  const totalItems = selectedFoodItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedFoodItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">Selected Items</span>
          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
        {selectedFoodItems.map(item => (
          <div key={item.id || item.fid || item.foodId} className="flex items-center justify-between text-sm">
            <div className="flex-1 min-w-0">
              <span className="font-medium text-gray-800 truncate">{item.name}</span>
              <span className="text-gray-500 ml-2">×{item.quantity}</span>
            </div>
            <span className="font-semibold text-gray-800 ml-2 flex items-center">
              <IndianRupee className="w-3 h-3" />
              {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-orange-200">
        <div className="flex items-center justify-between">
          <span className="font-bold text-gray-800">Subtotal:</span>
          <span className="font-bold text-orange-600 flex items-center">
            <IndianRupee className="w-4 h-4" />
            {totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

// Pricing & Payment Section
function PricingPaymentSection({ formData, formErrors, selectedFoodItems, total, content, styles, setFormData }) {
  return (
    <div className="space-y-4">
      {/* Pricing Details */}
      <div className="grid grid-cols-2 gap-4">
        <FormGroup label="Tax Rate (%)">
          <input 
            type="number" 
            step="0.1"
            min="0"
            max="100"
            value={formData.taxRate || 9} 
            onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })} 
            className={styles.formInput}
          />
        </FormGroup>

        <FormGroup label="Delivery Fee">
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="number" 
              step="0.01"
              min="0"
              value={formData.deliveryFee || 50} 
              onChange={(e) => setFormData({ ...formData, deliveryFee: parseFloat(e.target.value) || 0 })} 
              className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </FormGroup>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormGroup label="Discount Amount">
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="number" 
              step="0.01"
              min="0"
              value={formData.discount || 0} 
              onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) || 0 })} 
              className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
            />
          </div>
        </FormGroup>

        <FormGroup label="Discount Type">
          <select 
            value={formData.discountType || 'none'} 
            onChange={(e) => setFormData({ ...formData, discountType: e.target.value })} 
            className={styles.formSelect}
          >
            <option value="none">None</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </FormGroup>
      </div>

      <FormGroup label="Discount Code (Optional)">
        <input 
          type="text" 
          value={formData.discountCode || ''} 
          onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })} 
          className={styles.formInput}
          placeholder="Enter promo code"
        />
      </FormGroup>

      <FormGroup label="Tip Amount (Optional)">
        <div className="relative">
          <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="number" 
            step="0.01"
            min="0"
            value={formData.tip || 0} 
            onChange={(e) => setFormData({ ...formData, tip: parseFloat(e.target.value) || 0 })} 
            className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
          />
        </div>
      </FormGroup>

      {/* Order Summary */}
      {selectedFoodItems.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Order Summary</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800 flex items-center">
                <IndianRupee className="w-3 h-3" />
                {total.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax ({formData.taxRate || 9}%)</span>
              <span className="font-medium text-gray-800 flex items-center">
                <IndianRupee className="w-3 h-3" />
                {total.tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium text-gray-800 flex items-center">
                <IndianRupee className="w-3 h-3" />
                {total.deliveryFee.toFixed(2)}
              </span>
            </div>
            {formData.tip > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tip</span>
                <span className="font-medium text-gray-800 flex items-center">
                  <IndianRupee className="w-3 h-3" />
                  {(formData.tip || 0).toFixed(2)}
                </span>
              </div>
            )}
            {formData.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span className="font-medium flex items-center">
                  - <IndianRupee className="w-3 h-3" />
                  {(formData.discount || 0).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span className="flex items-center text-orange-600">
                <IndianRupee className="w-4 h-4" />
                {total.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Information */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-3">Payment Information</h4>
        
        <div className={styles.formGrid}>
          <FormGroup 
            label="Payment Method"
            required={true}
            error={formErrors.paymentMethod}
          >
            <select 
              value={formData.paymentMethod || 'cash'} 
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} 
              className={styles.formSelect}
            >
              <option value="cash">Cash on Delivery</option>
              <option value="card">Card</option>
              <option value="online">Online Payment</option>
              <option value="wallet">Wallet</option>
              <option value="upi">UPI</option>
            </select>
          </FormGroup>

          <FormGroup label="Payment Status">
            <select 
              value={formData.paymentStatus || 'pending'} 
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })} 
              className={styles.formSelect}
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
              <option value="partially_refunded">Partially Refunded</option>
            </select>
          </FormGroup>
        </div>

        {(formData.paymentMethod === 'online' || formData.paymentMethod === 'card' || formData.paymentMethod === 'upi') && (
          <FormGroup label="Transaction ID (Optional)">
            <input 
              type="text" 
              value={formData.transactionId || ''} 
              onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })} 
              className={styles.formInput}
              placeholder="Enter transaction ID"
            />
          </FormGroup>
        )}

        {(formData.paymentStatus === 'refunded' || formData.paymentStatus === 'partially_refunded') && (
          <FormGroup label="Refund Amount">
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="number" 
                step="0.01"
                min="0"
                max={total.total}
                value={formData.refundAmount || 0} 
                onChange={(e) => setFormData({ ...formData, refundAmount: parseFloat(e.target.value) || 0 })} 
                className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </FormGroup>
        )}
      </div>

      {/* Order Status */}
      <div className="border-t pt-4 mt-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-3">Order Status</h4>
        
        <FormGroup label="Order Status">
          <select 
            value={formData.orderStatus || 'pending'} 
            onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })} 
            className={styles.formSelect}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready for Pickup</option>
            <option value="picked_up">Picked Up</option>
            <option value="on_the_way">On the Way</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="failed">Failed</option>
          </select>
        </FormGroup>

        {formData.orderStatus === 'cancelled' && (
          <FormGroup label="Cancellation Reason">
            <textarea 
              value={formData.cancelReason || ''} 
              onChange={(e) => setFormData({ ...formData, cancelReason: e.target.value })} 
              rows={2} 
              className={styles.formTextarea}
              placeholder="Reason for cancellation"
            />
          </FormGroup>
        )}
      </div>
    </div>
  );
}

// Tracking Section
function TrackingSection({ formData, formErrors, content, styles, setFormData }) {
  return (
    <div className="space-y-4">
      <div className={styles.formGrid}>
        <FormGroup label="Estimated Delivery Time">
          <input 
            type="datetime-local" 
            value={formData.estimatedDeliveryTime || ''} 
            onChange={(e) => setFormData({ ...formData, estimatedDeliveryTime: e.target.value })} 
            className={styles.formInput}
          />
        </FormGroup>

        <FormGroup label="Preparation Time (minutes)">
          <input 
            type="number" 
            min="0"
            value={formData.preparationTime || ''} 
            onChange={(e) => setFormData({ ...formData, preparationTime: parseInt(e.target.value) || 0 })} 
            className={styles.formInput}
            placeholder="30"
          />
        </FormGroup>
      </div>

      <div className="border-t pt-4 mt-4">
        <h4 className="font-semibold text-sm text-gray-700 mb-3">Delivery Partner (Optional)</h4>
        
        <div className={styles.formGrid}>
          <FormGroup label="Partner Name">
            <input 
              type="text" 
              value={formData.deliveryPartnerName || ''} 
              onChange={(e) => setFormData({ ...formData, deliveryPartnerName: e.target.value })} 
              className={styles.formInput}
              placeholder="Enter partner name"
            />
          </FormGroup>

          <FormGroup label="Partner Phone">
            <input 
              type="tel" 
              value={formData.deliveryPartnerPhone || ''} 
              onChange={(e) => setFormData({ ...formData, deliveryPartnerPhone: e.target.value })} 
              className={styles.formInput}
              placeholder="+91 XXXXX XXXXX"
            />
          </FormGroup>
        </div>

        <FormGroup label="Vehicle Number">
          <input 
            type="text" 
            value={formData.deliveryPartnerVehicle || ''} 
            onChange={(e) => setFormData({ ...formData, deliveryPartnerVehicle: e.target.value })} 
            className={styles.formInput}
            placeholder="MH-01-AB-1234"
          />
        </FormGroup>
      </div>
    </div>
  );
}

// Additional Info Section
function AdditionalInfoSection({ formData, content, styles, setFormData }) {
  return (
    <div className="space-y-4">
      <FormGroup label="Order Notes">
        <textarea 
          value={formData.notes || ''} 
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })} 
          rows={3} 
          className={styles.formTextarea}
          placeholder="Internal notes about the order"
          maxLength="1000"
        />
      </FormGroup>

      <FormGroup label="Special Requests">
        <textarea 
          value={formData.specialRequests || ''} 
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })} 
          rows={2} 
          className={styles.formTextarea}
          placeholder="Customer's special requests"
          maxLength="500"
        />
      </FormGroup>

      <FormGroup label="Order Source">
        <select 
          value={formData.source || 'admin'} 
          onChange={(e) => setFormData({ ...formData, source: e.target.value })} 
          className={styles.formSelect}
        >
          <option value="web">Web</option>
          <option value="mobile">Mobile App</option>
          <option value="app">App</option>
          <option value="phone">Phone</option>
          <option value="admin">Admin Panel</option>
        </select>
      </FormGroup>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="isActive"
          checked={formData.isActive !== false} 
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} 
          className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Order is Active
        </label>
      </div>
    </div>
  );
}

// View Order Details Component
function ViewOrderDetails({ order, getStatusBadge, formatDate, styles }) {
  return (
    <div className="space-y-6">
      <InfoGrid 
        order={order}
        getStatusBadge={getStatusBadge}
        formatDate={formatDate}
        styles={styles}
      />
      
      <OrderItemsSection order={order} />
      <OrderTotalSection order={order} />
      
      {order.notes && <NotesSectionView title="Order Notes" content={order.notes} />}
      {order.specialRequests && <NotesSectionView title="Special Requests" content={order.specialRequests} />}
    </div>
  );
}

// Info Grid Component
function InfoGrid({ order, getStatusBadge, formatDate, styles }) {
  const orderStatusBadge = getStatusBadge(order.orderStatus, 'order');
  const paymentStatusBadge = getStatusBadge(order.paymentStatus, 'payment');
  
  return (
    <div className={styles.formGrid}>
      <InfoSection 
        title="Order Information"
        items={[
          { label: "Order ID", value: order.id || order.orderId },
          { label: "Order Date", value: formatDate(order.orderDate) },
          { 
            label: "Order Status", 
            value: orderStatusBadge.label, 
            badge: true, 
            color: orderStatusBadge.color,
            icon: orderStatusBadge.icon
          },
          { 
            label: "Payment Status", 
            value: paymentStatusBadge.label, 
            badge: true, 
            color: paymentStatusBadge.color,
            icon: paymentStatusBadge.icon
          }
        ]}
        styles={styles}
      />
      
      <InfoSection 
        title="Customer Details"
        items={[
          { label: "Name", value: order.customerName },
          { label: "Phone", value: order.phone },
          { label: "Email", value: order.email || 'N/A' },
          { label: "Address", value: order.address }
        ]}
        styles={styles}
      />
    </div>
  );
}

// Info Section Component
function InfoSection({ title, items, styles }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>
      {items.map((item, idx) => {
        const IconComponent = item.icon; // Get component reference
        
        return (
          <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">{item.label}</span>
            {item.badge ? (
              <span className={`${styles.statusBadge} ${item.color}`}>
                {IconComponent && <IconComponent className={styles.statusIcon} />} {/* ✅ FIXED */}
                {item.value}
              </span>
            ) : (
              <span className="text-sm font-medium text-gray-800">{item.value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Order Items Section Component
function OrderItemsSection({ order }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Order Items</h3>
      <div className="space-y-2">
        {(order.items || []).map((item, idx) => (
          <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">{item.name} x {item.quantity}</span>
            <span className="text-sm font-medium text-gray-800 flex items-center">
              <IndianRupee className="w-3 h-3" />
              {(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Order Total Section Component
function OrderTotalSection({ order }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium text-gray-800 flex items-center">
          <IndianRupee className="w-3 h-3" />
          {order.subtotal?.toFixed(2) || '0.00'}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Tax</span>
        <span className="font-medium text-gray-800 flex items-center">
          <IndianRupee className="w-3 h-3" />
          {order.tax?.toFixed(2) || '0.00'}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Delivery Fee</span>
        <span className="font-medium text-gray-800 flex items-center">
          <IndianRupee className="w-3 h-3" />
          {order.deliveryFee?.toFixed(2) || '0.00'}
        </span>
      </div>
      <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
        <span>Total Amount</span>
        <span className="flex items-center">
          <IndianRupee className="w-4 h-4" />
          {order.total?.toFixed(2) || '0.00'}
        </span>
      </div>
    </div>
  );
}

// Notes Section View Component
function NotesSectionView({ title, content }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>
      <p className="text-sm text-gray-600">{content}</p>
    </div>
  );
}

// Delete Confirmation Component
function DeleteConfirmation({ message, styles }) {
  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <p className="text-gray-700 mb-2">{message}</p>
      <p className="text-sm text-gray-500">This action cannot be undone.</p>
    </div>
  );
}

// Form Group Component
function FormGroup({ label, required, error, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// Modal Footer Component
function ModalFooter({ type, modalContent, closeModal, handleSubmit, handleDelete, styles }) {
  return (
    <div className={styles.modalFooter}>
      {type === 'view' && (
        <button onClick={closeModal} className={styles.buttonPrimary}>
          {modalContent?.closeButton || 'Close'}
        </button>
      )}
      {(type === 'add' || type === 'edit') && (
        <>
          <button onClick={closeModal} className={styles.buttonSecondary}>
            {modalContent?.cancelButton || 'Cancel'}
          </button>
          <button onClick={handleSubmit} className={styles.buttonPrimary}>
            {modalContent?.submitButton || 'Submit'}
          </button>
        </>
      )}
      {type === 'delete' && (
        <>
          <button onClick={closeModal} className={styles.buttonSecondary}>
            {modalContent?.cancelButton || 'Cancel'}
          </button>
          <button onClick={handleDelete} className={styles.buttonDanger}>
            {modalContent?.confirmButton || 'Delete'}
          </button>
        </>
      )}
    </div>
  );
}

export default Modal;