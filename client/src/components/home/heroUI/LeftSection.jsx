import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'
import Button from '@/components/common/Button'

function LeftSection({ title, description, buttonContent, styles }) {
  return (
    <div className={styles.container}>
        <Title 
          title={title.title} 
          titleStyle={styles.title} 
          highlightedText={title.highlightedText}
          highlightedTextStyle={styles.highlight}
        />
        <Paragraph 
          paragraph={description} 
          paragraphStyle={styles.description} 
        />

        <Button 
          buttonText={buttonContent.buttonText}
          buttonLink={buttonContent.buttonLink}
          buttonStyle={styles.button}
        />
    </div>
  )
}

export default LeftSection