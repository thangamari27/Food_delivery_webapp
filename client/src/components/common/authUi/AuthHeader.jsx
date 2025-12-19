import Title from '../Title'
import SubTitle from '../SubTitle'

function AuthHeader({ title, subtitle, styles }) {
  return (
    <div className={styles.container}>
      <Title 
        title={title} 
        titleStyle={styles.title} 
      />
      <SubTitle 
        subTitle={subtitle} 
        subTitleStyle={styles.subTitle} 
      />
    </div>
  )
}

export default AuthHeader