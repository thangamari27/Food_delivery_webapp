  import { X, AlertCircle, Search, Minus, Plus } from "lucide-react";
  import { useState, useMemo } from "react";

  function Modal({ 
    modalState, 
    formData, 
    formErrors, 
    selectedFoodItems,
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
    setSelectedCategory
  }) {
    const { type, data } = modalState;
    const modalContent = content.modalContent[type];

    return (
      <div className={styles.modalOverlay} onClick={closeModal}>
        <div 
          className={styles.modalContainer} 
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
            handleDelete={() => handleDelete(data?.id)}
            styles={styles}
          />
        </div>
      </div>
    )
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
    content, 
    styles, 
    calculateTotal, 
    setFormData, 
    handleFoodItemToggle, 
    updateQuantity,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  }) {
    const total = calculateTotal();
    
    // Clear all selected items
    const handleClearAll = () => {
      selectedFoodItems.forEach(item => handleFoodItemToggle(item));
    };
    
    return (
      <div className="space-y-6">
        <FormSectionGrid 
          formData={formData}
          formErrors={formErrors}
          content={content}
          styles={styles}
          setFormData={setFormData}
        />
        
        <AddressSection 
          formData={formData}
          formErrors={formErrors}
          content={content}
          styles={styles}
          setFormData={setFormData}
        />
        
        {/* Selected Items Summary */}
        <SelectedItemsSummary 
          selectedFoodItems={selectedFoodItems}
          onClearAll={selectedFoodItems.length > 0 ? handleClearAll : null}
        />
        
        <FoodItemsSection 
          selectedFoodItems={selectedFoodItems}
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
        
        {selectedFoodItems.length > 0 && (
          <OrderSummary 
            selectedFoodItems={selectedFoodItems}
            total={total}
          />
        )}
        
        <StatusSection 
          formData={formData}
          content={content}
          styles={styles}
          setFormData={setFormData}
        />
        
        <NotesSection 
          formData={formData}
          content={content}
          styles={styles}
          setFormData={setFormData}
        />
      </div>
    );
  }

  // Form Section Grid Component
  function FormSectionGrid({ formData, formErrors, content, styles, setFormData }) {
    return (
      <div className={styles.formGrid}>
        <FormGroup 
          label={content.formFields.customerName.label}
          required={content.formFields.customerName.required}
          error={formErrors.customerName}
        >
          <input 
            type="text" 
            value={formData.customerName || ''} 
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} 
            className={styles.formInput}
            placeholder={content.formFields.customerName.placeholder}
          />
        </FormGroup>
        
        <FormGroup 
          label={content.formFields.phoneNumber.label}
          required={content.formFields.phoneNumber.required}
          error={formErrors.phone}
        >
          <input 
            type="tel" 
            value={formData.phone || ''} 
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            className={styles.formInput}
            placeholder={content.formFields.phoneNumber.placeholder}
          />
        </FormGroup>
      </div>
    );
  }

  // Address Section Component
  function AddressSection({ formData, formErrors, content, styles, setFormData }) {
    return (
      <FormGroup 
        label={content.formFields.deliveryAddress.label}
        required={content.formFields.deliveryAddress.required}
        error={formErrors.address}
      >
        <textarea 
          value={formData.address || ''} 
          onChange={(e) => setFormData({ ...formData, address: e.target.value })} 
          rows={2} 
          className={styles.formTextarea}
          placeholder={content.formFields.deliveryAddress.placeholder}
        />
      </FormGroup>
    );
  }

  // Food Items Section Component
  function FoodItemsSection({ 
    selectedFoodItems, 
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
        label={content.formFields.foodItems.label}
        required={content.formFields.foodItems.required}
        error={formErrors.foodItems}
      >
        <FoodItemSearch 
          foodItems={content.foodItems}
          selectedFoodItems={selectedFoodItems}
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
    handleFoodItemToggle, 
    updateQuantity,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  }) {
    
    // Get unique categories from food items
    const categories = useMemo(() => {
      const uniqueCategories = [...new Set(foodItems.map(item => item.category))];
      return ['all', ...uniqueCategories];
    }, [foodItems]);
    
    // Filter food items based on search and category
    const filteredFoodItems = useMemo(() => {
      return foodItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
      });
    }, [foodItems, searchTerm, selectedCategory]);
    
    return (
      <div className="space-y-4">
        {/* Search and Filter Controls */}
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search food items by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Category Filter */}
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
        
        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
          {filteredFoodItems.map(item => {
            const selected = selectedFoodItems.find(si => si.id === item.id);
            
            return (
              <FoodItemCard 
                key={item.id}
                item={item}
                selected={selected}
                handleFoodItemToggle={handleFoodItemToggle}
                updateQuantity={updateQuantity}
              />
            );
          })}
        </div>
        
        {/* Empty State */}
        {filteredFoodItems.length === 0 && (
          <div className="text-center py-8 border border-gray-200 rounded-lg">
            <p className="text-gray-500">No food items found matching your search.</p>
          </div>
        )}
      </div>
    );
  }

  // Food Item Card Component
  function FoodItemCard({ item, selected, handleFoodItemToggle, updateQuantity }) {
    return (
      <div 
        className={`p-4 rounded-lg border transition-all duration-200 ${
          selected 
            ? 'border-2 border-orange-400 bg-orange-50 shadow-sm' 
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Item Image (Optional) */}
          {item.image && (
            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h4>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
              
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => handleFoodItemToggle(item)}
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
              <span className="font-bold text-orange-600 text-sm">
                ${item.price.toFixed(2)}
              </span>
              
              {item.category && (
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                  {item.category}
                </span>
              )}
            </div>
            
            {/* Quantity Controls (Only when selected) */}
            {selected && (
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={selected.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <div className="w-12 text-center">
                      <span className="font-semibold text-gray-800">{selected.quantity}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-sm font-medium text-gray-700">
                    Total: <span className="text-orange-600">${(item.price * selected.quantity).toFixed(2)}</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Selected Items Summary Component
  function SelectedItemsSummary({ selectedFoodItems, onClearAll }) {
    if (selectedFoodItems.length === 0) return null;
    
    const totalItems = selectedFoodItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = selectedFoodItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return (
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-4">
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
            <div key={item.id} className="flex items-center justify-between text-sm">
              <div className="flex-1 min-w-0">
                <span className="font-medium text-gray-800 truncate">{item.name}</span>
                <span className="text-gray-500 ml-2">×{item.quantity}</span>
              </div>
              <span className="font-semibold text-gray-800 ml-2">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-orange-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800">Subtotal:</span>
            <span className="font-bold text-orange-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  // Order Summary Component
  function OrderSummary({ selectedFoodItems, total }) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
        <h4 className="font-semibold text-sm text-gray-700">Order Summary</h4>
        {selectedFoodItems.map(item => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.name} x {item.quantity}</span>
            <span className="font-medium text-gray-800">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-800">${total.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (9%)</span>
            <span className="font-medium text-gray-800">${total.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium text-gray-800">${total.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  // Status Section Component
  function StatusSection({ formData, content, styles, setFormData }) {
    return (
      <div className={styles.formGrid}>
        <FormGroup 
          label={content.formFields.orderStatus.label}
          required={content.formFields.orderStatus.required}
        >
          <select 
            value={formData.orderStatus || 'pending'} 
            onChange={(e) => setFormData({ ...formData, orderStatus: e.target.value })} 
            className={styles.formSelect}
          >
            {content.orderStatuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </FormGroup>
        
        <FormGroup 
          label={content.formFields.paymentStatus.label}
          required={content.formFields.paymentStatus.required}
        >
          <select 
            value={formData.paymentStatus || 'unpaid'} 
            onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })} 
            className={styles.formSelect}
          >
            {content.paymentStatuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </FormGroup>
      </div>
    );
  }

  // Notes Section Component
  function NotesSection({ formData, content, styles, setFormData }) {
    return (
      <FormGroup label={content.formFields.notes.label}>
        <textarea 
          value={formData.notes || ''} 
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })} 
          rows={2} 
          className={styles.formTextarea}
          placeholder={content.formFields.notes.placeholder}
        />
      </FormGroup>
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
        
        {order.notes && (
          <NotesSectionView notes={order.notes} />
        )}
      </div>
    );
  }

  // Info Grid Component
  function InfoGrid({ order, getStatusBadge, formatDate, styles }) {
    return (
      <div className={styles.formGrid}>
        <InfoSection 
          title="Order Information"
          items={[
            { label: "Order ID", value: order.id },
            { label: "Order Date", value: formatDate(order.orderDate) },
            { label: "Order Status", value: getStatusBadge(order.orderStatus, 'order').label, badge: true, color: getStatusBadge(order.orderStatus, 'order').color },
            { label: "Payment Status", value: getStatusBadge(order.paymentStatus, 'payment').label, badge: true, color: getStatusBadge(order.paymentStatus, 'payment').color }
          ]}
          styles={styles}
        />
        
        <InfoSection 
          title="Customer Details"
          items={[
            { label: "Name", value: order.customerName },
            { label: "Phone", value: order.phone },
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
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">{item.label}</span>
            {item.badge ? (
              <span className={`${styles.statusBadge} ${item.color}`}>{item.value}</span>
            ) : (
              <span className="text-sm font-medium text-gray-800">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Order Items Section Component
  function OrderItemsSection({ order }) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Order Items</h3>
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">{item.name} x {item.quantity}</span>
              <span className="text-sm font-medium text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
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
          <span className="font-medium text-gray-800">${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-800">${order.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium text-gray-800">${order.deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
          <span>Total Amount</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    );
  }

  // Notes Section View Component
  function NotesSectionView({ notes }) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Order Notes</h3>
        <p className="text-sm text-gray-600">{notes}</p>
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

  // Form Group Component (Reusable)
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
            {modalContent.closeButton}
          </button>
        )}
        {(type === 'add' || type === 'edit') && (
          <>
            <button onClick={closeModal} className={styles.buttonSecondary}>
              {modalContent.cancelButton}
            </button>
            <button onClick={handleSubmit} className={styles.buttonPrimary}>
              {modalContent.submitButton}
            </button>
          </>
        )}
        {type === 'delete' && (
          <>
            <button onClick={closeModal} className={styles.buttonSecondary}>
              {modalContent.cancelButton}
            </button>
            <button onClick={handleDelete} className={styles.buttonDanger}>
              {modalContent.confirmButton}
            </button>
          </>
        )}
      </div>
    );
  }

  export default Modal;