import Title from "@/components/common/Title"
import SubTitle from "@/components/common/SubTitle"

function PricingPlanHeader({ heading, subheading, styles }) {
  return (
    <header className={styles.header}>
        <Title title={heading} titleStyle={styles.title} />
        <SubTitle subTitle={subheading} subTitleStyle={styles.subtitle} />
    </header>
  )
}

export default PricingPlanHeader