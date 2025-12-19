import Avatar from "./Avatar";
import StarRating from "./StarRating";
import Title from '@/components/common/Title'
import Paragraph from '@/components/common/Paragraph'

function TestimonialCard({ testimonial, styles }) {
  return (
    <div className={styles.container}>
      <Paragraph paragraph={testimonial.text} paragraphStyle={styles.description} />

      <div className={styles.content}>
        <Avatar name={testimonial.name} />
        <div className={styles.contentWrapper}>
          <Title title={testimonial.name} titleStyle={styles.title} />
          <Paragraph paragraph={testimonial.location} paragraphStyle={styles.address}  />

        </div>
      </div>

      {/* Star Rating */}
      <div className={styles.starContainer}>
        <StarRating rating={testimonial.rating ?? 5} />
      </div>
    </div>
  );
}

export default TestimonialCard;