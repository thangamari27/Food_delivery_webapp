function TestimonialTrack({ testimonials, styles, children }) {
  return (
    <div className={styles.track}>
      {[...testimonials, ...testimonials].map((item, idx) => (
        <div
          key={`${item.id}-${idx}`}
          className={styles.slide}
        >
          {children(item)}
        </div>
      ))}
    </div>
  );
}

export default TestimonialTrack;
