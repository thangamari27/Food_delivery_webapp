import { Leaf, Flame } from "lucide-react";

const MenuContent = ({ restaurant, content, styles }) => (
  <div className={styles.modalBodyPadding}>
    <FeaturesSection features={restaurant.features} styles={styles} />
    <MenuCategories categories={content.categories} styles={styles} />
  </div>
);

// Sub-component: Features Section
const FeaturesSection = ({ features, styles }) => (
  <div className={styles.menuSection}>
    <h3 className={styles.menuSectionTitle}>Available Features</h3>
    <div className={styles.menuFeatureGrid}>
      {features.map((feature) => (
        <span key={feature} className={styles.menuFeatureTag}>
          {feature}
        </span>
      ))}
    </div>
  </div>
);

// Sub-component: Menu Categories
const MenuCategories = ({ categories, styles }) => (
  <>
    <h3 className={styles.menuSectionTitle}>Menu</h3>
    <div className={styles.menuCategorySection}>
      {categories.map((category) => (
        <MenuCategory key={category.name} category={category} styles={styles} />
      ))}
    </div>
  </>
);

// Sub-component: Individual Category
const MenuCategory = ({ category, styles }) => (
  <div>
    <h4 className={styles.menuCategoryTitle}>
      {category.name}
    </h4>
    <div className={styles.menuItemList}>
      {category.items.map((item, index) => (
        <MenuItem key={index} item={item} styles={styles} />
      ))}
    </div>
  </div>
);

// Sub-component: Individual Menu Item
const MenuItem = ({ item, styles }) => (
  <div className={styles.menuItem}>
    <div className={styles.menuItemContent}>
      <div className={styles.menuItemHeader}>
        {item.veg ? (
          <Leaf className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0" />
        ) : (
          <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-red-600 flex-shrink-0" />
        )}
        <h5 className={styles.menuItemName}>{item.name}</h5>
      </div>
      <p className={styles.menuItemDescription}>{item.description}</p>
    </div>
    <span className={styles.menuItemPrice}>{item.price}</span>
  </div>
);

export default MenuContent;