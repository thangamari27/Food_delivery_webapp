import { serviceDeliveryContent } from '@/utils/constant/admin/ServiceConstant'
import { serviceDeliveryStyles } from '@/utils/styles/ServiceStyle'
import ImageCarousel from '@/components/common/service/ImageCarousel';
import ServiceList from '@/components/common/service/ServiceList';
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function DeliverySection() {
  const content = serviceDeliveryContent;
  const styles = serviceDeliveryStyles;
  
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.header.container}>
              <Title title={content.title} titleStyle={styles.header.title} />
              <Paragraph paragraph={content.description} paragraphStyle={styles.header.description} />
            </div>
            <div className={styles.grid}>
                {/* service carousel section */}
                <ImageCarousel 
                  images={content.carouselImages}
                  styles={styles}
                />

                {/* Service list content */}
                <ServiceList 
                  serviceList={content.processList}
                  styles={styles}
                />
            </div>
        </div>
    </section>
  )
}

export default DeliverySection