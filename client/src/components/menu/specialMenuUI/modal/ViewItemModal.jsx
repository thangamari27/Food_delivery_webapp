import { X } from 'lucide-react';
import Button from '@/components/common/Button';
import { IndianRupee } from 'lucide-react';
import Image from '@/components/common/Image'
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'


function ViewItemModal({ isOpen, onClose, dish, buttonContent, styles }) {
  if (!isOpen) return null;
  return (
     <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Close button */}
        <button
          onClick={onClose}
          className={styles.btnClose}
        >
          <X className={styles.iconClose} />
        </button>

        {/* Dish Image */}
        <div className={styles.imageContainer}>
          <Image 
            src={dish.src}
            srcFallback={dish.srcFallback}
            alt={dish.name}
            pictureStyle={styles.picture}
            imageStyle={styles.image}
          />
        </div>

        {/* Dish Details */}
        <div className={styles.contentContainer}>
          <div>
            <Title title={dish.name} titleStyle={styles.title} />
            <Paragraph paragraph={dish.cuisine} paragraphStyle={styles.badge} />
          </div>

          {/* <p className="text-gray-600">{dish.description}</p> */}
          <Paragraph paragraph={dish.description} paragraphStyle={styles.description} />

          <div className={styles.priceContainer}>
            <div className={styles.priceWrapper}>
              <IndianRupee className={styles.priceIcon} />
              <span className={styles.price}>
                {dish.price}
              </span>
            </div>

            <div className={styles.btnContainer}>
              <Button
                buttonText="Add to Cart"
                buttonStyle={styles.btn}
                onClick={() => {
                  // We'll implement this later
                  onClose();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewItemModal