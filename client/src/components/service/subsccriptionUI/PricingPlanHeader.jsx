import Title from "../../common/Title"
import SubTitle from "../../common/SubTitle"

function PricingPlanHeader({ heading, subheading, styles }) {
  return (
    <header className={styles.header}>
        <Title title={heading} titleStyle={styles.title} />
        <SubTitle subTitle={subheading} subTitleStyle={styles.subtitle} />
    </header>
  )
}

export default PricingPlanHeader