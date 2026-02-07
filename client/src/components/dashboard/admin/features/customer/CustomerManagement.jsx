// components/admin/customer/CustomerManagement.jsx
import { useCallback } from "react";
import { customerContent } from "../../../../../utils/constant/admin/AdminDashboard";
import { customerStyles } from "../../../../../utils/styles/AdminStyle";
import { useCustomerData, usePagination, useCustomerFilters } from "../../../../../hooks/admin/useCustomerData";
import AdminLoader from "../../../../common/admin/AdminLoader";
import Toast from "./ui/Toast";
import PageHeader from "./ui/PageHeader";
import StatsOverview from "./ui/StatsOverview";
import FiltersSection from "./ui/FiltersSection";
import EmptyState from "./ui/EmptyState";
import Pagination from "./ui/Pagination";
import CustomerCards from "./ui/CustomerCards";
import CustomerTable from "./ui/CustomerTable";
import CustomerDetailModal from "./modal/CustomerDetailModal";
import CustomerFormModal from "./modal/CustomerFormModal";
import ConfirmModal from "./modal/ConfirmModal";

function CustomerManagement() {
  const content = customerContent;
  const styles = customerStyles;

  // Single hook call with all state and handlers
  const {
    // Data state
    customers,
    loading,
    error,
    actionLoading,
    
    // UI state
    viewCustomer,
    editCustomer,
    showForm,
    confirmAction,
    isMobile,
    toast,
    
    // Event handlers
    handleSave,
    handleToggleStatus,
    handleDelete,
    handleConfirm,
    handleRefresh,
    
    // Modal controls
    openViewModal,
    closeViewModal,
    openEditModal,
    openAddModal,
    closeFormModal,
    closeConfirmModal,
    
    // Refetch
    refetch
  } = useCustomerData();

  // Filters and pagination
  const filters = useCustomerFilters(customers);
  const pagination = usePagination(filters.filtered, 10);

  // Wrapped handlers with content
  const wrappedHandleSave = useCallback((form) => 
    handleSave(form, content.toast), 
    [handleSave, content.toast]
  );

  const wrappedHandleConfirm = useCallback(() => 
    handleConfirm(content.toast), 
    [handleConfirm, content.toast]
  );

  // Show full page loader during initial load
  if (loading) {
    return <AdminLoader loaderName="customers" />;
  }

  // Show error state if fetch fails
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load customers</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout.container}>
      <Toast content={content} message={toast?.message} type={toast?.type} styles={styles} />
      
      <PageHeader 
        content={content} 
        onAdd={openAddModal} 
        onRefresh={handleRefresh} 
        styles={styles} 
        loading={actionLoading}
      />
      
      <div className={styles.layout.main}>
        <StatsOverview 
          content={content}
          customers={customers} 
          onStatClick={(filter) => filters.setStatusFilter(filter)} 
          styles={styles}
        />
        
        <FiltersSection content={content} filters={filters} styles={styles} />

        {filters.filtered.length === 0 ? (
          <EmptyState 
            content={content}
            hasFilters={filters.activeFilterCount > 0} 
            onAdd={openAddModal}
            onReset={filters.resetFilters}
            styles={styles}
          />
        ) : (
          <>
            {isMobile ? (
              <CustomerCards 
                content={content}
                customers={pagination.paginatedItems}
                onView={openViewModal}
                onEdit={openEditModal}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                styles={styles}
              />
            ) : (
              <CustomerTable 
                content={content}
                customers={pagination.paginatedItems}
                onView={openViewModal}
                onEdit={openEditModal}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                styles={styles}
              />
            )}
            <Pagination content={content} pagination={pagination} totalItems={filters.filtered.length} styles={styles} />
          </>
        )}
      </div>

      {viewCustomer && (
        <CustomerDetailModal 
          content={content}
          customer={viewCustomer} 
          onClose={closeViewModal}
          onEdit={(c) => { 
            closeViewModal();
            openEditModal(c); 
          }}
          styles={styles}
        />
      )}

      {showForm && (
        <CustomerFormModal 
          content={content}
          customer={editCustomer} 
          onSave={wrappedHandleSave} 
          onClose={closeFormModal} 
          styles={styles}
          loading={actionLoading}
        />
      )}

      {confirmAction && (
        <ConfirmModal
          content={content}
          type={confirmAction.type}
          customer={confirmAction.customer}
          onConfirm={wrappedHandleConfirm}
          onClose={closeConfirmModal}
          styles={styles}
          loading={actionLoading}
        />
      )}
    </div>
  );
}

export default CustomerManagement;