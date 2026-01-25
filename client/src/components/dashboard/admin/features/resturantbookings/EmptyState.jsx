import React from 'react'
import { Search, Ban, AlertCircle } from 'lucide-react';

function EmptyState({ content, type = 'no_results', styles }) {
   const states = content.empty_states;
  const state = states[type];
  
  const Icon = React.useMemo(() => {
    const icons = {
      Search, Ban, AlertCircle
    };
    return icons[state.icon] || Search;
  }, [state.icon]);
  return (
    <div className={styles.layout.empty_state_container}>
      <div className={styles.layout.empty_state_icon}>
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
      </div>
      <h3 className={styles.text.heading.h3 + ' mb-2'}>
        {state.title}
      </h3>
      <p className={styles.text.body.small + ' text-center mb-6 max-w-md'}>
        {state.message}
      </p>
      {state.action && (
        <button className={styles.buttons.primary}>
          {state.action}
        </button>
      )}
    </div>
  )
}

export default EmptyState