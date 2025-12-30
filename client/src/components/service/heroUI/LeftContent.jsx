import IconComponent from "@/components/common/IconComponent"
import Title from "@/components/common/Title"
import Paragraph from "@/components/common/Paragraph"
import Button from '../../common/Button'

function LeftContent({ content, styles}) {
  return (
    <div className={styles.container}>
        <Title title={content.title} titleStyle={styles.title} />
        <Paragraph paragraph={content.description} paragraphStyle={styles.description} />
        <div className={styles.buttonContainer.container}>
            {/* <a className={styles.buttonContainer.primarybtn} href={content.button1.link}>
                {content.button1.text}
            </a> */}
            <Button 
                buttonText={content.button1.text}
                buttonStyle={styles.buttonContainer.primarybtn}
                buttonLink={content.button1.link}
            />
            <a className={styles.buttonContainer.secondarybtn} href={content.button2.link}>
                {content.button2.text}
            </a>
        </div>
        <div className={styles.reviews.container}>
            {content.reviews.map((review) => (
                <div key={review.id} className={styles.reviews.wrapper}>
                    <IconComponent Icon={review.icon} className={styles.reviews.icon} />
                    <span className={styles.reviews.title}>{review.title}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default LeftContent