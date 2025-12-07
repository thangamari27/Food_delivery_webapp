import React from 'react'
import Image from '../Image'
import { Plus } from 'lucide-react'

function TopMenuItem({ items, styles}) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <Image 
            src={items.src}
            srcFallback={items.srcFallback}
            alt={items.alt}
            pictureStyle={styles.picture}
            imageStyle={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{items.name}</h3>
        <p className={styles.ingredients}>{items.ingredients}</p>
        <div className={styles.priceContainer}>
          <div className={styles.priceWrapper}>
                <span className={styles.price}>
                    {items.price}
                </span>
                <span className={styles.originalPrice}>
                    {items.originalPrice}
                </span>
            </div>
          <button className={styles.addButton}>
                <Plus className={styles.icon}  />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopMenuItem