import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function SpecialMenuHeader({ title, description, styles }) {
  return (
    <div className={styles.container}>
        <Title title={title} titleStyle={styles.title} />
        <Paragraph paragraph={description} paragraphStyle={styles.description} />
    </div>
  )
}

export default SpecialMenuHeader