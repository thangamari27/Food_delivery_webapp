import {
  Check,
  Clock,
  Package,
  XCircle
} from "lucide-react";
import SlidePanel from "./SlidePanel";

const OrdersPanel = ({
  isOpen,
  onClose,
  orders,
  onCancelOrder,
  styles
}) => {
  const getStatusConfig = status => {
    const configs = {
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: Check,
        label: "Delivered"
      },
      preparing: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        icon: Clock,
        label: "Preparing"
      },
      on_the_way: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: Package,
        label: "On the Way"
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        label: "Cancelled"
      }
    };

    return configs[status] || configs.preparing;
  };

  const orderPanelStyles = styles.ordersPanelStyles

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="My Orders"
      styles={styles}
    >
      <div className={orderPanelStyles.contentContainer}>
        {orders.length > 0 ? (
          orders.map(order => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order.id}
                className={orderPanelStyles.orderItem.container}
              >
                <div className={orderPanelStyles.orderItem.header}>
                  <div>
                    <h3
                      className={orderPanelStyles.orderItem.orderNumber}
                    >
                      {order.orderNumber}
                    </h3>
                    <p className={orderPanelStyles.orderItem.orderDate}>
                      {order.date}
                    </p>
                  </div>

                  <span
                    className={`${orderPanelStyles.orderItem.statusBadge} ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    <StatusIcon
                      className={orderPanelStyles.orderItem.statusIcon}
                    />
                    {statusConfig.label}
                  </span>
                </div>

                <div
                  className={orderPanelStyles.orderItem.itemsContainer}
                >
                  <p
                    className={orderPanelStyles.orderItem.itemsTitle}
                  >
                    {order.items} items:
                  </p>
                  <ul
                    className={orderPanelStyles.orderItem.itemsList}
                  >
                    {order.itemsList.map((item, idx) => (
                      <li
                        key={idx}
                        className={
                          orderPanelStyles.orderItem.itemBullet
                        }
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={orderPanelStyles.orderItem.footer}>
                  <span className={orderPanelStyles.orderItem.total}>
                    ₹{order.total.toFixed(2)}
                  </span>

                  {order.canCancel && (
                    <button
                      onClick={() =>
                        onCancelOrder(order.id)
                      }
                      className={orderPanelStyles.orderItem.cancelBtn}
                    >
                      <XCircle
                        className={
                          orderPanelStyles.orderItem.cancelIcon
                        }
                      />
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className={orderPanelStyles.emptyState.container}>
            <Package
              className={orderPanelStyles.emptyState.icon}
            />
            <p className={orderPanelStyles.emptyState.title}>
              No orders yet
            </p>
            <p className={orderPanelStyles.emptyState.description}>
              Your order history will appear here
            </p>
          </div>
        )}
      </div>
    </SlidePanel>
  );
};

export default OrdersPanel;