import Title from '@/components/common/Title'
import SubTitle from '@/components/common/SubTitle'
import Paragraph from '@/components/common/Paragraph'

function BehindScenseHeader({ title, subTitle, description, styles }) {
  return (
    <div className={styles.header}>
        <Title title={title} titleStyle={styles.badge} />
        <SubTitle subTitle={subTitle} subTitleStyle={styles.title} />
        <Paragraph paragraph={description} paragraphStyle={styles.description} />
    </div>
  )
}

export default BehindScenseHeader