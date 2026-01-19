import { useState, useEffect, useCallback } from "react";
import { customerContent } from "../../../../../utils/constant/admin/AdminDashboard";
import { customerStyles } from "../../../../../utils/styles/AdminStyle";
import { useCustomerData, usePagination, useCustomerFilters, useToast } from "../../../../../hooks/admin/useCustomerData";
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

  const { customers, loading, addCustomer, updateCustomer, deleteCustomer } = useCustomerData();
  const filters = useCustomerFilters(customers);
  const pagination = usePagination(filters.filtered, 10);
  const { toast, showToast } = useToast();
  
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1440);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1440);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSave = useCallback((form) => {
    if (editCustomer) {
      updateCustomer(editCustomer.id, form);
      showToast(content.toast.customerUpdated);
    } else {
      addCustomer(form);
      showToast(content.toast.customerAdded);
    }
    setShowForm(false);
    setEditCustomer(null);
  }, [editCustomer, updateCustomer, addCustomer, showToast]);

  const handleToggleStatus = useCallback((customer) => {
    const action = customer.status === 'active' ? 'block' : 'unblock';
    setConfirmAction({ type: action, customer });
  }, []);

  const handleDelete = useCallback((customer) => {
    setConfirmAction({ type: 'delete', customer });
  }, []);

  const handleConfirm = useCallback(() => {
    const { type, customer } = confirmAction;
    
    if (type === 'delete') {
      deleteCustomer(customer.id);
      showToast(content.toast.customerDeleted);
    } else if (type === 'block') {
      updateCustomer(customer.id, { status: 'blocked' });
      showToast(content.toast.statusChanged);
    } else if (type === 'unblock') {
      updateCustomer(customer.id, { status: 'active' });
      showToast(content.toast.statusChanged);
    }
    
    setConfirmAction(null);
  }, [confirmAction, deleteCustomer, updateCustomer, showToast]);

  const handleRefresh = useCallback(() => {
    // In a real app, this would refetch from the server
    showToast('Data refreshed', 'success');
  }, [showToast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading customers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout.container}>
      <Toast content={content} message={toast?.message} type={toast?.type} styles={styles} />
      
      <PageHeader content={content} onAdd={() => setShowForm(true)} onRefresh={handleRefresh} styles={styles} />
      
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
            onAdd={() => setShowForm(true)}
            onReset={filters.resetFilters}
            styles={styles}
          />
        ) : (
          <>
            {isMobile ? (
              <CustomerCards 
                content={content}
                customers={pagination.paginatedItems}
                onView={setViewCustomer}
                onEdit={(c) => { 
                  setEditCustomer(c); 
                  setShowForm(true); 
                }}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDelete}
                styles={styles}
              />
            ) : (
              <CustomerTable 
                content={content}
                customers={pagination.paginatedItems}
                onView={setViewCustomer}
                onEdit={(c) => { 
                  setEditCustomer(c); 
                  setShowForm(true); 
                }}
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
          onClose={() => setViewCustomer(null)}
          onEdit={(c) => { 
            setViewCustomer(null);
            setEditCustomer(c); 
            setShowForm(true); 
          }}
          styles={styles}
        />
      )}

      {showForm && (
        <CustomerFormModal 
          content={content}
          customer={editCustomer} 
          onSave={handleSave} 
          onClose={() => { 
            setShowForm(false); 
            setEditCustomer(null); 
          }} 
          styles={styles}
        />
      )}

      {confirmAction && (
        <ConfirmModal
          content={content}
          type={confirmAction.type}
          customer={confirmAction.customer}
          onConfirm={handleConfirm}
          onClose={() => setConfirmAction(null)}
          styles={styles}
        />
      )}
    </div>
  )
}

export default CustomerManagement