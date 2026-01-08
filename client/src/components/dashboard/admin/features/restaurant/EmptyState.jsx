import { Search } from 'lucide-react';
import IconComponent from '@/components/common/IconComponent'

function EmptyState({ content, styles }) {
  return (
    <div className={styles.container}>
        <div className={styles.searchContainer}>
        <IconComponent Icon={content.icons.search} className={styles.searchIcon} />
        </div>
        <h3 className={styles.title}>
        {content.noRestaurants}
        </h3>
        <p className={styles.description}>{content.noRestaurantsDesc}</p>
    </div>
  )
}

export default EmptyState