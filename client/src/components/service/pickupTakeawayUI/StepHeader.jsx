import Title from "@/components/common/Title"
import SubTitle from "@/components/common/SubTitle"
import Paragraph from "@/components/common/Paragraph"

function StepHeader({ title, subTitle, description, styles }) {
  return (
    <div className={styles.container}>
        {/* Section Heading */}
        <Title 
          title={title} 
          titleStyle={styles.title} 
        />

        {/* Section Sub Heading */}
        <SubTitle 
          subTitle={subTitle} 
          subTitleStyle={styles.subTitle} 
        />

        {/* Section Description */}
        <Paragraph 
          paragraph={description} 
          paragraphStyle={styles.description}
        />
    </div>
  )
}

export default StepHeader