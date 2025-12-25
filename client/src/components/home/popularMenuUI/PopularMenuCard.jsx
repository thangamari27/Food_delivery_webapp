import Image from "@/components/common/Image";
import PopularMenuContent from "./PopularMenuContent";

export default function PopularMenuCard({ item, styles }) {
  // defensive default if item is missing
  const it = item || { name: "Unknown", description: "", price: 0, srcFallback: "" };

  return (
    <article className={styles.menuCard.container}>
      <div className={styles.menuCard.wrapper}>
        <div className={styles.menuCard.imageContainer}>
          <Image 
            src={it.src}
            srcFallback={it.srcFallback}
            alt={it.alt ?? it.name}
            width={it.width ?? 800}
            height={it.height ?? 600}
            imageStyle={it.imageStyle}
            pictureStyle={styles.menuCard.picture}
          />
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
