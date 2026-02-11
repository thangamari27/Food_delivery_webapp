import { Eye, IndianRupee, Edit, Trash2 } from "lucide-react";
import MobilePagination from "./MobilePagination";

function MobileOrdersCard({ 
  orders, 
  openModal, 
  styles, 
  getStatusBadge, 
  formatDate,
  pagination,
  handlePageChange,
  handleRowsPerPageChange
}) {
  return (
    <div className="xl:hidden">
      {/* Mobile Orders Cards */}
      <div className={styles.mobileCard}>
        {orders.map(order => {
          const orderStatusBadge = getStatusBadge(order.orderStatus, 'order');
          const paymentStatusBadge = getStatusBadge(order.paymentStatus, 'payment');
          const OrderStatusIcon = orderStatusBadge.icon;
          const PaymentStatusIcon = paymentStatusBadge.icon;
          
          return (
            <div key={order.id} className={styles.mobileCardWrapper}>
              <div className={styles.mobileCardHeader}>
                <span className={styles.orderIdLink}>{order.id}</span>
                 <span className={`${styles.statusBadge} ${orderStatusBadge.color}`}>
                  {OrderStatusIcon && <OrderStatusIcon className={styles.statusIcon} />}
                  {orderStatusBadge.label}
                </span>
              </div>
              <div className={styles.mobileCardBody}>
                <div className={styles.mobileCardRow}>
                  <span className={styles.mobileCardLabel}>Customer</span>
                  <span className={styles.mobileCardValue}>{order.customerName}</span>
                </div>
                <div className={styles.mobileCardRow}>
                  <span className={styles.mobileCardLabel}>Date</span>
                  <span className={styles.mobileCardValue}>{formatDate(order.orderDate)}</span>
                </div>
                <div className={styles.mobileCardRow}>
                  <span className={styles.mobileCardLabel}>Amount</span>
                  <span className={styles.mobileCardValue}>
                    <IndianRupee className="inline-block w-4 h-4" />
                    {order.total.toFixed(2)}
                  </span>
                </div>
                <div className={styles.mobileCardRow}>
                  <span className={styles.mobileCardLabel}>Payment</span>
                  <span className={`${styles.statusBadge} ${paymentStatusBadge.color}`}>
                    {PaymentStatusIcon && <PaymentStatusIcon className={styles.statusIcon} />} {/*  FIXED */}
                    {paymentStatusBadge.label}
                  </span>
                </div>
              </div>
              <div className={styles.mobileCardActions}>
                <button onClick={() => openModal('view', order)} className={styles.iconButton}>
                  <Eye className={styles.actionIcon} />
                </button>
                <button onClick={() => openModal('edit', order)} className={styles.iconButton}>
                  <Edit className={styles.actionIcon} />
                </button>
                <button onClick={() => openModal('delete', order)} className={styles.iconButton}>
                  <Trash2 className={styles.actionIcon} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Pagination Controls */}
      {pagination.showPagination && (
        <MobilePagination 
          pagination={pagination}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          styles={styles}
        />
      )}
    </div>
  );
}

export default MobileOrdersCard;