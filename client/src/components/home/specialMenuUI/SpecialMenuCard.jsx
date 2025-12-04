import React from "react";
import MenuContent from "./MenuContent";
import Image from "@/components/common/Image";

export default function SpecialMenuCard({ item, styles }) {
  const foodItems = item || {};

  return (
    <div className={styles.specialMenuCard.container}>
      {/* Image container */}
      <div className={styles.specialMenuCard.imageContainer}>
        <div className={styles.specialMenuCard.picture}>
            <Image 
              src={foodItems.image.src}
              srcFallback={foodItems.image.srcFallback}
              alt={foodItems.image.alt}
              width={foodItems.image.width}
              height={foodItems.image.height}
              imageStyle={foodItems.image.imageStyle}
            />
        </div>
      </div>

      {/* Food item Content */}
      <MenuContent 
        itemName={foodItems.name}
        description={foodItems.description}
        price={foodItems.price}
        contentStyle={styles.content}
      />
    </div>
  );
}