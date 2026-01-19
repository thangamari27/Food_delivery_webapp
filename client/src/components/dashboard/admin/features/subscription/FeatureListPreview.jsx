import { useState, useMemo, useCallback } from 'react'
import { Check, ChevronDown } from 'lucide-react';

function FeatureListPreview({ content, features, maxVisible = 3, styles }) {
  const [expanded, setExpanded] = useState(false);

  const visibleFeatures = useMemo(() => {
    return expanded ? features : features.slice(0, maxVisible);
  }, [features, expanded, maxVisible]);

  const hasMore = features.length > maxVisible;
  const moreCount = features.length - maxVisible;

  const toggleExpanded = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  const getButtonText = () => {
    if (!hasMore) return null;
    
    if (expanded) {
      return content?.features_display?.show_less || 'Show less';
    }
    
    const showMoreText = content?.features_display?.show_more || 'Show {count} more';
    return showMoreText.replace('{count}', moreCount);
  };

  return (
    <div className={styles?.feature_list?.container || 'space-y-2'}>
      {visibleFeatures.map((feature, index) => (
        <div key={index} className={styles?.feature_list?.item || 'flex items-start gap-2 text-sm text-gray-700'}>
          <Check className={`${styles?.icon?.small || 'w-4 h-4'} ${styles?.icon?.success || 'text-green-600'} mt-0.5 flex-shrink-0`} />
          <span>{feature}</span>
        </div>
      ))}
      {hasMore && (
        <button
          onClick={toggleExpanded}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
        >
          {getButtonText()}
          <ChevronDown className={`${styles?.icon?.small || 'w-4 h-4'} transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
}

export default FeatureListPreview;