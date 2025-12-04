import ComboCardContent from './ComboCardContent';
import Image from '../Image'

function ComboCard({ combo, currencyIcon: CurrencyIcon, cta, styles }) {
  const bg = combo.color || "bg-white";
  return (
    <article className={`${styles.card} ${bg}`}>
      {/* image overflow at bottom (centered) */}
      <div className={styles.cardImage.container}>
        <div className={styles.cardImage.wrapper}>
          <Image 
            src={combo.src}
            srcFallback={combo.srcFallback}
            alt={combo.alt}
            width={combo.width}
            height={combo.height}
            imageStyle={styles.image}
            pictureStyle={styles.picture}
          />
        </div>
      </div>

      <div className={styles.imageOverlay} aria-hidden="true" />

      {/* Combo Deal Content */}
      <ComboCardContent combo={combo} cta={cta} CurrencyIcon={CurrencyIcon} styles={styles.cardContent} />
    </article>
  );
}

export default ComboCard