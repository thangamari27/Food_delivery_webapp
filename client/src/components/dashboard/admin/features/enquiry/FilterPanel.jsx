import { Filter, X } from 'lucide-react';

function FilterPanel({ content, filters, on_filter_change, on_clear_all, styles }) {
  
  const render_option_with_icon = (option_value, option_label) => {
    // Check if this is a purpose option (not 'all' option)
    if (option_value === 'all') {
      return option_label;
    }
    
    // Find purpose configuration
    const purpose_config = content.purposes?.find(p => p.value === option_value);
    
    if (purpose_config && purpose_config.icon) {
      const IconComponent = purpose_config.icon;
      return (
        <span className="flex items-center gap-2">
          <IconComponent className={`w-4 h-4 ${purpose_config.icon_color || 'text-gray-500'}`} />
          {option_label}
        </span>
      );
    }
    
    return option_label;
  };

  return (  
    <div className={styles.filter_panel}>
      <div className={styles.filter_header}>
        <h3 className={styles.filter_title}>
          <Filter className="w-5 h-5 inline mr-2" />
          Filters
        </h3>
        <button onClick={on_clear_all} className={styles.button_secondary}>
          <X className={styles.button_icon} />
          Clear All
        </button>
      </div>
      <div className={styles.filter_grid}>
        {Object.entries(content.filter_options).map(([key, config]) => (
          <div key={key} className={styles.filter_group}>
            <label className={styles.filter_label}>{config.label}</label>
            <select
              value={filters[key] || 'all'}
              onChange={(e) => on_filter_change({ ...filters, [key]: e.target.value })}
              className={styles.filter_select}
            >
              {config.options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;