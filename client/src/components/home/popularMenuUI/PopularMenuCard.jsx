import React from "react";
import PopularMenuContent from "./PopularMenuContent";

export default function PopularMenuCard({ item, styles }) {
  // defensive default if item is missing
  const it = item || { name: "Unknown", description: "", price: 0, srcFallback: "" };

  return (
    <article className={styles.menuCard.container}>
      <div className={styles.menuCard.wrapper}>
        <div className={styles.menuCard.imageContainer}>
          <picture className={styles.menuCard.picture}>
            <source type="image/webp" srcSet={it.src || it.srcFallback} />
            <img
              src={it.srcFallback}
              alt={it.alt ?? it.name}
              className={it.imageStyle}
              loading="lazy"
              width={it.width ?? 800}
              height={it.height ?? 600}
              decoding="async"
            />
          </picture>
        </div>
      </div>

      {/* Popular menu content */}
       <PopularMenuContent 
        itemName={it.name}
        description={it.description}
        price={it.price}
        icon={it.icon}
        category={it.category}
        styles={styles.menuCardContent}
       />
    </article>
  );
}
