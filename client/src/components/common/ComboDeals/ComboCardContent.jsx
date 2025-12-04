import Title from '../Title'
import Button from '../Button'

function ComboCardContent({combo, cta, CurrencyIcon, styles}) {
  return (
    <div className={styles.container}>
        <div className={styles.badgeContainer}>
          <span className={`${styles.badge} ${combo.color === "bg-yellow-400 text-gray-900" ? "bg-white/20" : "bg-white/10"}`}>
            {combo.badge}
          </span>
          <div className={styles.rightBadgeText}>{/* keep space for price top if needed */}</div>
        </div>

        <div className={styles.content}>
          <Title title={combo.title} titleStyle={styles.title} />
          <ul className={styles.listContainer}>
            {combo.items.map((it, i) => (
              <li key={i} className={styles.list}>
                <span className={styles.listIcon} />
                <span className={styles.listText}>{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.buttonContainer}>
          <Button buttonText={cta.text} buttonLink={cta.link} buttonStyle={styles.button} />

          <div className={styles.priceContainer}>
            <div className={styles.priceWrapper}>
              {CurrencyIcon && <CurrencyIcon className={styles.currencyIcon} />}
              <span className={styles.price}>{combo.price}</span>
            </div>
            {combo.priceSuffix && <div className={styles.priceSuffix}>{combo.priceSuffix}</div>}
          </div>
        </div>
      </div>
  )
}

export default ComboCardContent