import { Plus } from "lucide-react"

function HeaderSection({ content, styles, openModal=false }) {
  return (
    <div className={styles.headerWrapper}>
        <div>
        <h1 className={styles.headerTitle}>{content.header.title}</h1>
        <p className={styles.headerSubtitle}>{content.header.subtitle}</p>
        </div>
        {/* {openModal && (
          <button 
            onClick={() => openModal('add')} 
            className={styles.buttonPrimary}
            >
            <Plus className={styles.buttonIcon} />
            {content.header.addButtonText || 'Add New'}
          </button>
        )} */}
    </div>
  )
}

export default HeaderSection