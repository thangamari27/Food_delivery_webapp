import { pickTakeawayContent } from '../../utils/constant/admin/ServiceConstant'
import { pickTakeawayStyles } from "../../utils/styles/ServiceStyle"
import CardList from '../common/cardWrapper/CardList';
import StepHeader from './pickupTakeawayUI/StepHeader';

function PickTakeaway() {
  const content = pickTakeawayContent;
  const styles = pickTakeawayStyles;

  return (
    <section className={styles.section}>
       <div className={styles.container}>
            {/* delivery step Section Header */}
            <StepHeader 
                title={content.title}
                subTitle={content.subTitle}
                description={content.description}
                styles={styles.stepHeader}
            />

            {/* delivery step Section Card */}
            <CardList
              items={content.howItWorksData}
              cardStyles={styles.howItWorksFlex}
              gridStyles={styles.howItWorksGrid}
              cardType={content.cardType}
            />
       </div>
    </section>
  )
}

export default PickTakeaway