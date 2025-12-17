import { restaurantFilterContent } from "@/utils/constant/admin/RestaurantConstant"
import { restaurantFilterStyles } from "@/utils/styles/RestaurantStyle"
import RestaurantContainer from "./restaurantUI/RestaurantContainer";

function RestaurantFilterSection() {
  const content = restaurantFilterContent;
  const styles = restaurantFilterStyles;

  return (
    <section className={styles.section}>
        <RestaurantContainer 
            content={content}
            styles={styles}
        />
    </section>
  )
}

export default RestaurantFilterSection