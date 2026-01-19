import { Plus, RefreshCw } from "lucide-react"

function PageHeader({ content, onAdd, onRefresh, styles }) {
  return (
     <div className={styles.header.container}>
      <div className={styles.header.content}>
        <div className={styles.header.top}>
          <div className={styles.header.titleGroup}>
            <h1 className={styles.header.title}>{content.header.title}</h1>
            <p className={styles.header.subtitle}>{content.header.subtitle}</p>
          </div>
          <div className={styles.header.actions}>
            <button 
              onClick={onRefresh} 
              className={styles.button.secondary} 
              title={content.header.refreshButton}
              aria-label={content.header.refreshButton}
            >
              <RefreshCw className="w-5 h-5" />
              <span className="sr-only">{content.header.refreshButton}</span>
            </button>
            <button onClick={onAdd} className={styles.button.primary}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">{content.header.addButton}</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader