import IconComponent from '@/components/common/IconComponent'
import Title from '@/components/common/Title'
import SubTitle from '@/components/common/SubTitle'

function BenefitCard({ benefit, styles }) {
  return (
    <div className={styles.container}>
        <div className={styles.iconContainer}>
            <IconComponent Icon={benefit.icon} className={styles.icon} />
        </div>
        <Title 
            title={benefit.title}
            titleStyle={styles.title}
        />
        <SubTitle 
            subTitle={benefit.subtitle}
            subTitleStyle={styles.subTitle}
        />
    </div>
  )
}

export default BenefitCard