import Title from "@/components/common/Title"
import SubTitle from '@/components/common/SubTitle'
import Button from '@/components/common/Button'

function OfferExpandPanel({ expanded, offer, setExpanded, panelContent, styles }) {
  return (
     <div
      id={`offer-panel-${offer.id}`}
      className={`${styles.container} ${expanded ? styles.panelClose : styles.panelOpen }`}
      style={{ minHeight: "120px" }}
      role="region"
      aria-hidden={!expanded}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.panelContainer}>
        <div className={styles.panelWrapper}>
          <div>
            <Title title={offer.title} titleStyle={styles.title} />
            <SubTitle subTitle={offer.subtitle} subTitleStyle={styles.subTitle} />
          </div>

          <button
            onClick={() => setExpanded(false)}
            className={styles.buttonClose}
            aria-label="Close details"
          >
            ✕
          </button>
        </div>

        <div className={styles.contentContainer}>
          <p><strong>{panelContent.offerTitle}</strong> {offer.discount}</p>

          <p><strong>{panelContent.includeTitle}</strong> {offer.include}</p>

          <div className={styles.buttonContainer}>
            <Button buttonText={panelContent.leftButton} buttonStyle={styles.leftButton} />
            <Button buttonText={panelContent.rightButton} buttonStyle={styles.rightButton} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferExpandPanel