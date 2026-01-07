import { Eye, Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";

function DesktopOrdersTable({ 
  orders, 
  selectedOrders, 
  content, 
  styles, 
  sortConfig, 
  pagination,
  getStatusBadge, 
  formatDate, 
  handleSort, 
  handleSelectAll, 
  handleSelectOrder,
  openModal,
  handlePageChange,
  handleRowsPerPageChange
}) {
  const { showPagination, currentPage, totalPages } = pagination;
  
  return (
    <div className={`${styles.tableCard}`}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <TableHeader 
            content={content}
            sortConfig={sortConfig}
            selectedOrders={selectedOrders}
            orders={orders}
            handleSort={handleSort}
            handleSelectAll={handleSelectAll}
            styles={styles}
          />
          <TableBody 
            orders={orders}
            selectedOrders={selectedOrders}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
            openModal={openModal}
            handleSelectOrder={handleSelectOrder}
            styles={styles}
          />
        </table>
      </div>

      {showPagination && (
        <DesktopPagination 
          pagination={pagination}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
          styles={styles}
        />
      )}
    </div>
  )
}

// Table Header Component
function TableHeader({ 
  content, 
  sortConfig, 
  selectedOrders, 
  orders, 
  handleSort, 
  handleSelectAll, 
  styles 
}) {
  return (
    <thead className={styles.tableHead}>
      <tr>
        <th className={styles.tableHeaderCell}>
          <input 
            type="checkbox" 
            checked={selectedOrders.length === orders.length && orders.length > 0} 
            onChange={handleSelectAll} 
            className={styles.checkbox} 
          />
        </th>
        {content.tableHeaders.slice(1).map(header => (
          header.sortable ? (
            <th 
              key={header.id} 
              onClick={() => handleSort(header.id)} 
              className={styles.tableHeaderCellSortable}
            >
              <div className="flex items-center gap-1">
                {header.label}
                {sortConfig.key === header.id && (
                  sortConfig.direction === 'asc' ? 
                  <ChevronUp className="w-4 h-4" /> : 
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </th>
          ) : (
            <th 
              key={header.id} 
              className={`${styles.tableHeaderCell} ${header.width || ''}`}
            >
              {header.label}
            </th>
          )
        ))}
      </tr>
    </thead>
  );
}

// Table Body Component
function TableBody({ 
  orders, 
  selectedOrders, 
  getStatusBadge, 
  formatDate, 
  openModal, 
  handleSelectOrder, 
  styles 
}) {
  return (
    <tbody>
      {orders.map(order => {
        const orderStatusBadge = getStatusBadge(order.orderStatus, 'order');
        const paymentStatusBadge = getStatusBadge(order.paymentStatus, 'payment');
        const OrderStatusIcon = orderStatusBadge.icon;
        const PaymentStatusIcon = paymentStatusBadge.icon;
        
        return (
          <TableRow 
            key={order.id}
            order={order}
            selectedOrders={selectedOrders}
            orderStatusBadge={orderStatusBadge}
            paymentStatusBadge={paymentStatusBadge}
            OrderStatusIcon={OrderStatusIcon}
            PaymentStatusIcon={PaymentStatusIcon}
            formatDate={formatDate}
            openModal={openModal}
            handleSelectOrder={handleSelectOrder}
            styles={styles}
          />
        );
      })}
    </tbody>
  );
}

// Table Row Component
function TableRow({ 
  order, 
  selectedOrders, 
  orderStatusBadge, 
  paymentStatusBadge, 
  OrderStatusIcon, 
  PaymentStatusIcon,
  formatDate,
  openModal,
  handleSelectOrder,
  styles
}) {
  return (
    <tr 
      className={selectedOrders.includes(order.id) ? styles.tableRowSelected : styles.tableRow}
    >
      <td className={styles.tableCellCheckbox}>
        <input 
          type="checkbox" 
          checked={selectedOrders.includes(order.id)} 
          onChange={() => handleSelectOrder(order.id)} 
          className={styles.checkbox} 
        />
      </td>
      <td className={styles.tableCell}>
        <span 
          onClick={() => openModal('view', order)} 
          className={styles.orderIdLink}
        >
          {order.id}
        </span>
      </td>
      <td className={`${styles.tableCell} ${styles.customerInfo}`}>
        {order.customerName}
      </td>
      <td className={styles.tableCell}>
        {formatDate(order.orderDate)}
      </td>
      <td className={styles.tableCell}>
        ${order.total.toFixed(2)}
      </td>
      <td className={styles.tableCell}>
        <span className={`${styles.statusBadge} ${orderStatusBadge.color}`}>
          <OrderStatusIcon className={styles.statusIcon} />
          {orderStatusBadge.label}
        </span>
      </td>
      <td className={styles.tableCell}>
        <span className={`${styles.statusBadge} ${paymentStatusBadge.color}`}>
          <PaymentStatusIcon className={styles.statusIcon} />
          {paymentStatusBadge.label}
        </span>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.actionIcons}>
          <button 
            onClick={() => openModal('view', order)} 
            className={`${styles.iconButton} ${styles.iconButtonView}`}
          >
            <Eye className={styles.actionIcon} />
          </button>
          <button 
            onClick={() => openModal('edit', order)} 
            className={`${styles.iconButton} ${styles.iconButtonEdit}`}
          >
            <Edit className={styles.actionIcon} />
          </button>
          <button 
            onClick={() => openModal('delete', order)} 
            className={`${styles.iconButton} ${styles.iconButtonDelete}`}
          >
            <Trash2 className={styles.actionIcon} />
          </button>
        </div>
      </td>
    </tr>
  );
}

// Desktop Pagination Component
function DesktopPagination({ 
  pagination, 
  handlePageChange, 
  handleRowsPerPageChange, 
  styles 
}) {
  const { 
    currentPage, 
    totalPages, 
    rowsPerPage, 
    totalOrders, 
    startIndex, 
    endIndex,
    content 
  } = pagination;

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.paginationDropDown}>
        <span className={styles.paginationDropDownText}>
          {content.pagination.rowsPerPageLabel}
        </span>
        <select 
          value={rowsPerPage} 
          onChange={handleRowsPerPageChange}
          className={styles.paginationSelect}
        >
          {content.pagination.rowsPerPageOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <span className={styles.paginationCount}>
        {startIndex}-{endIndex} {content.pagination.ofLabel} {totalOrders}
      </span>
      <div className={styles.paginationControls}>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          Previous
        </button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }
          
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={currentPage === pageNum ? 
                styles.paginationButtonActive : 
                styles.paginationButton
              }
            >
              {pageNum}
            </button>
          );
        })}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DesktopOrdersTable