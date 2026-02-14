import HeaderSection from '@/components/common/admin/HeaderSection';
import StatsGrid from '@/components/common/admin/StatsGrid';
import ActionBar from '@/components/common/admin/ActionBar';
import MobileOrdersCard from '@/components/common/admin/MobileOrdersCard';
import DesktopOrdersTable from '@/components/common/admin/DesktopOrdersTable';
import Modal from '@/components/common/admin/modal/Modal';
import { useOrdersManagement } from '@/hooks/admin/useOrdersManagement';
import { formatDate, getStatusBadge } from '@/utils/handler/admin/orderFormHandler';
import { getPaginationInfo } from '@/utils/handler/admin/paginationHandler';
import SelectedOrdersBanner from '@/components/common/admin/SelectedOrdersBanner';
import EmptyState from '@/components/common/admin/EmptyState';

const OrdersManagement = ({ content, styles }) => {
  const {
    // State
    stats, 
    statsLoading,
    orders,
    searchQuery,
    searchTerm,
    selectedCategory,
    selectedOrders,
    showFilterPanel,
    filters,
    currentPage,
    rowsPerPage,
    sortConfig,
    modalState,
    formData,
    formErrors,
    selectedFoodItems,
    
    // Food items 
    allFoodItems,
    foodsLoading,
    
    // Computed values
    sortedOrders,
    paginatedOrders,
    mobilePaginatedOrders,
    totalPages,
    
    // Setters
    setSearchQuery,
    setSelectedOrders,
    setShowFilterPanel,
    setFilters,
    setCurrentPage,
    setRowsPerPage,
    setSortConfig,
    setModalState,
    setFormData,
    setFormErrors,
    setSelectedFoodItems,
    setOrders,
    setSearchTerm,
    setSelectedCategory,
    
    // Handlers
    handleSort,
    handleSelectAll,
    handleSelectOrder,
    openModal,
    closeModal,
    handleSubmit,
    handleDelete,
    handleFoodItemToggle,
    updateQuantity,
    calculateTotal
  } = useOrdersManagement();

  // Get pagination info
  const paginationInfo = getPaginationInfo(currentPage, rowsPerPage, sortedOrders.length);
  
  // Create pagination config for components
  const paginationConfig = {
    showPagination: sortedOrders.length > rowsPerPage,
    currentPage,
    totalPages,
    rowsPerPage,
    totalOrders: sortedOrders.length,
    startIndex: paginationInfo.startIndex,
    endIndex: paginationInfo.endIndex,
    content
  };
  
  return (
    <section className={styles.container}>
      <div className={styles.headerSection}>
        <HeaderSection 
          content={content} 
          openModal={openModal} 
          styles={styles} 
        />
        <StatsGrid content={content} stats={stats} statsLoading={statsLoading} styles={styles} />
        <ActionBar 
          content={content}
          searchQuery={searchQuery}
          showFilterPanel={showFilterPanel} 
          setSearchQuery={setSearchQuery} 
          setShowFilterPanel={setShowFilterPanel} 
          filters={filters}
          setFilters={setFilters}
          styles={styles} 
        />  
      </div>
      
      {selectedOrders.length > 0 && (
        <SelectedOrdersBanner 
          selectedCount={selectedOrders.length}
          onClear={() => setSelectedOrders([])}
        />
      )}

      {/* Mobile Cards View */}
      {sortedOrders.length > 0 && (
        <MobileOrdersCard 
          orders={mobilePaginatedOrders}
          openModal={openModal}
          styles={styles}
          getStatusBadge={(status, type) => getStatusBadge(status, type, content)}
          formatDate={formatDate}
          pagination={paginationConfig}
          handlePageChange={setCurrentPage}
          handleRowsPerPageChange={(e) => { 
            setRowsPerPage(Number(e.target.value)); 
            setCurrentPage(1); 
          }}
        />
      )}

      {/* Desktop Table View */}
      {sortedOrders.length > 0 && (
        <DesktopOrdersTable 
          orders={paginatedOrders}
          selectedOrders={selectedOrders}
          content={content}
          styles={styles}
          sortConfig={sortConfig}
          pagination={paginationConfig}
          getStatusBadge={(status, type) => getStatusBadge(status, type, content)}
          formatDate={formatDate}
          handleSort={handleSort}
          handleSelectAll={handleSelectAll}
          handleSelectOrder={handleSelectOrder}
          openModal={openModal}
          handlePageChange={setCurrentPage}
          handleRowsPerPageChange={(e) => { 
            setRowsPerPage(Number(e.target.value)); 
            setCurrentPage(1); 
          }}
        />
      )}

      {/* Empty State */}
      {sortedOrders.length === 0 && (
        <EmptyState 
          title={content.emptyState.title}
          message={content.emptyState.message}
          styles={styles}
        />
      )}

      {/* Modal */}
      {modalState.type && (
        <Modal 
          modalState={modalState}
          formData={formData}
          formErrors={formErrors}
          selectedFoodItems={selectedFoodItems}
          allFoodItems={allFoodItems}
          foodsLoading={foodsLoading}
          content={content}
          styles={styles}
          getStatusBadge={(status, type) => getStatusBadge(status, type, content)}
          formatDate={formatDate}
          calculateTotal={calculateTotal}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          setFormData={setFormData}
          handleFoodItemToggle={handleFoodItemToggle}
          updateQuantity={updateQuantity}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </section>
  );
};

export default OrdersManagement;