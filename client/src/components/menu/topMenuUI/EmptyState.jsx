import NotFound from '@/components/common/topCategory/NotFound';

const EmptyState = ({ content, styles }) => {
  return (
    <NotFound 
      content={content.notFound} 
      styles={styles.notFound}
    />
  );
};

export default EmptyState;