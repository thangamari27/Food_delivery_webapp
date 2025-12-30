import Title from '@/components/common/Title';

function TopCategoriesHeader({ content, styles }) {
  return (
    <div className={styles.header.container}>
      <Title 
        title={content.header.title} 
        titleStyle={styles.header.title} 
      />
    </div>
  )
}

export default TopCategoriesHeader