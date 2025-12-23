import { ShoppingCart, Plus, Minus, Trash2, IndianRupee, ForkKnifeCrossedIcon } from "lucide-react";
import SlidePanel from "./SlidePanel";

function CartPanel({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  styles
}) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.1;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const cartPanelStyles = styles.cartPanel;

  return (
    <SlidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="My Cart"
      styles={styles}
      footer={
        items.length > 0 && (
          <div className={cartPanelStyles.footerStyles.container}>
            <div className={cartPanelStyles.footerStyles.wrapper}>
              <div className={cartPanelStyles.footerStyles.subtotalContainer}>
                <span className={cartPanelStyles.footerStyles.subtotalLabel}>
                  Subtotal
                </span>
                <span className={cartPanelStyles.footerStyles.subtotalValue}>
                  <IndianRupee className="inline w-4 h-4" />
                  {subtotal.toFixed(2)}
                </span>
              </div>

              <div className={cartPanelStyles.footerStyles.discountContainer}>
                <span>Discount (10%)</span>
                <span>
                  - <IndianRupee className="inline w-4 h-4" />
                  {discount.toFixed(2)}
                </span>
              </div>

              <div className={cartPanelStyles.footerStyles.taxContainer}>
                <span className={cartPanelStyles.footerStyles.taxLabel}>Tax (8%)</span>
                <span className={cartPanelStyles.footerStyles.taxValue}>
                  <IndianRupee className="inline w-4 h-4" />
                  {tax.toFixed(2)}
                </span>
              </div>

              <div className={cartPanelStyles.footerStyles.totalContainer}>
                <span>Total</span>
                <span className={cartPanelStyles.footerStyles.totalValue}>
                  <IndianRupee className="inline w-5 h-5" />
                  {total.toFixed(2)}
                </span>
              </div>
            </div>

            <button className={cartPanelStyles.footerStyles.checkoutBtn}>
              Proceed to Checkout
            </button>
          </div>
        )
      }
    >
      <div className={cartPanelStyles.contentContainer}>
        {items.length > 0 ? (
          <>
            <div className={cartPanelStyles.headerContainer}>
              <p className={cartPanelStyles.itemCount}>
                {items.length} items in cart
              </p>

              <button
                onClick={onClearCart}
                className={cartPanelStyles.clearBtn}
              >
                <Trash2 className={cartPanelStyles.clearIcon} />
                Clear All
              </button>
            </div>

            <div className={cartPanelStyles.itemsContainer}>
              {items.map(item => (
                <div
                  key={item.id}
                  className={cartPanelStyles.cartItem.container}
                >
                  <div className={cartPanelStyles.cartItem.innerContainer}>
                    <div className={cartPanelStyles.cartItem.imageContainer}>
                      <ForkKnifeCrossedIcon />
                    </div>

                    <div className={cartPanelStyles.cartItem.contentContainer}>
                      <div className={cartPanelStyles.cartItem.header}>
                        <div className={cartPanelStyles.cartItem.nameContainer}>
                          <h3 className={cartPanelStyles.cartItem.name}>
                            {item.name}
                          </h3>
                          <p className={cartPanelStyles.cartItem.category}>
                            {item.category}
                          </p>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className={cartPanelStyles.cartItem.removeBtn}
                        >
                          <Trash2
                            className={cartPanelStyles.cartItem.removeIcon}
                          />
                        </button>
                      </div>

                      <div
                        className={cartPanelStyles.cartItem.controlsContainer}
                      >
                        <div
                          className={
                            cartPanelStyles.cartItem.quantityControls
                          }
                        >
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, -1)
                            }
                            disabled={item.quantity <= 1}
                            className={`${cartPanelStyles.cartItem.quantityBtn} ${
                              item.quantity <= 1
                                ? cartPanelStyles.cartItem.quantityBtnDisabled
                                : ""
                            }`}
                          >
                            <Minus
                              className={
                                cartPanelStyles.cartItem.quantityBtnIcon
                              }
                            />
                          </button>

                          <span
                            className={cartPanelStyles.cartItem.quantityText}
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, 1)
                            }
                            className={cartPanelStyles.cartItem.quantityBtn}
                          >
                            <Plus
                              className={
                                cartPanelStyles.cartItem.quantityBtnIcon
                              }
                            />
                          </button>
                        </div>

                        <div
                          className={cartPanelStyles.cartItem.priceContainer}
                        >
                          <p className={cartPanelStyles.cartItem.unitPrice}>
                            ₹{item.price.toFixed(2)} each
                          </p>
                          <p className={cartPanelStyles.cartItem.totalPrice}>
                            ₹
                            {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={cartPanelStyles.emptyState.container}>
            <ShoppingCart
              className={cartPanelStyles.emptyState.icon}
            />
            <p className={cartPanelStyles.emptyState.title}>
              Your cart is empty
            </p>
            <p className={cartPanelStyles.emptyState.description}>
              Add some delicious food to get started!
            </p>
          </div>
        )}
      </div>
    </SlidePanel>
  );
}

export default CartPanel;
