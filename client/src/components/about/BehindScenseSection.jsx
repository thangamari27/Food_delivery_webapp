import { behindScenseContent } from '@/utils/constant/admin/AboutConstant'
import { behindScenseStyle } from '@/utils/styles/AboutStyle'
import BehindScenseHeader from './behindScenseUI/BehindScenseHeader';
import BehindScenseContent from './behindScenseUI/BehindScenseContent';

function BehindScenseSection() {
  const styles = behindScenseStyle;
  const HeaderContent = behindScenseContent;

  return (
    <section className={styles.section}>
        <div className={styles.container}>   
          {/* Behind Scense Header section */}
          <BehindScenseHeader 
              title={HeaderContent.title}
              subTitle={HeaderContent.subTitle}
              description={HeaderContent.description}
              styles={styles}
          />

          {/* Behind the scense container */}
          <BehindScenseContent 
              videoContent={behindScenseContent.videoContent} 
              imageContent={behindScenseContent.imageContent}
              deliveryProcess={behindScenseContent.deliveryProcess}
              styles={styles}
          />
        </div>
    </section>
  )
}

export default BehindScenseSection