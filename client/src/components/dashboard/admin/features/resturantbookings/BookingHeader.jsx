import { RefreshCw, Download } from "lucide-react"

function BookingHeader({ content, onExport, onRefresh, isRefreshing, styles }) {
  return (
    <div className={styles.layout.header}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={styles.text.heading.h1}>
            {content.header.title}
          </h1>
          <p className={styles.text.body.subtitle}>
            {content.header.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className={styles.buttons.secondary}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{content.button_labels.refresh}</span>
          </button>
          <button onClick={onExport} className={styles.buttons.primary}>
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{content.button_labels.export}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingHeader