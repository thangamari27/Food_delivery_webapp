import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Plus, RefreshCw, Upload, Edit2, Trash2, Eye, EyeOff, Clock, 
  X, Check, AlertCircle, ChevronRight, ChevronLeft, Tag, Users, 
  Gift, Calendar, Package, Search, Sparkles, Zap, Heart, Star, 
  TrendingUp, Award, Shield, Truck, MapPin, DollarSign, Percent 
} from 'lucide-react';

// ==================== CONTENT OBJECTS ====================
export const OFFER_CONTENT = {
  tabs: [
    { id: 'countdown', label: 'Countdown', icon: Clock },
    { id: 'food', label: 'Food Offers', icon: Tag },
    { id: 'benefits', label: 'Benefits', icon: Users },
    { id: 'loyalty', label: 'Loyalty', icon: Gift },
    { id: 'holiday', label: 'Holiday', icon: Calendar },
    { id: 'combo', label: 'Combos', icon: Package },
    { id: 'subscription', label: 'Subscriptions', icon: Shield }
  ],
  status_labels: { 
    draft: 'Draft', 
    active: 'Active', 
    scheduled: 'Scheduled', 
    expired: 'Expired', 
    visible: 'Visible', 
    hidden: 'Hidden' 
  },
  form_steps: ['Type', 'Basic Info', 'Config', 'Media & UI', 'Rules', 'Validity', 'Status'],
  gradients: [
    { id: 'orange', label: 'Orange Sunset', value: 'from-orange-400 to-red-500' },
    { id: 'blue', label: 'Ocean Blue', value: 'from-blue-400 to-cyan-500' },
    { id: 'purple', label: 'Purple Dream', value: 'from-purple-400 to-pink-500' },
    { id: 'green', label: 'Fresh Green', value: 'from-green-400 to-emerald-500' },
    { id: 'yellow', label: 'Sunny Yellow', value: 'from-yellow-400 to-orange-500' }
  ],
  icons: [
    { id: 'zap', Icon: Zap, label: 'Lightning' },
    { id: 'heart', Icon: Heart, label: 'Heart' },
    { id: 'star', Icon: Star, label: 'Star' },
    { id: 'gift', Icon: Gift, label: 'Gift' },
    { id: 'award', Icon: Award, label: 'Award' },
    { id: 'shield', Icon: Shield, label: 'Shield' },
    { id: 'truck', Icon: Truck, label: 'Delivery' },
    { id: 'mappin', Icon: MapPin, label: 'Location' },
    { id: 'dollar', Icon: DollarSign, label: 'Money' },
    { id: 'percent', Icon: Percent, label: 'Discount' },
    { id: 'sparkles', Icon: Sparkles, label: 'Sparkles' },
    { id: 'trending', Icon: TrendingUp, label: 'Trending' }
  ],
  customer_types: ['All Users', 'First-Time Users', 'Returning Users', 'Premium Users'],
  sections: ['top', 'delivery', 'restaurant', 'customer'],
  subscription_plans: ['Basic', 'Pro', 'Premium', 'Enterprise'],
  billing_cycles: ['Weekly', 'Monthly', 'Quarterly', 'Yearly'],
  subscription_features: ['Free Delivery', 'Priority Support', 'Exclusive Offers', 'Early Access', 'Cashback', 'Discounts']
};

// ==================== STYLES OBJECTS ====================
export const OFFER_STYLES = {
  buttons: { 
    primary: 'bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2', 
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2 outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    danger: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    success: 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
    ghost: 'text-gray-600 hover:text-orange-600 transition p-1 rounded hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1'
  },
  badges: { 
    active: 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium', 
    draft: 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium',
    scheduled: 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium',
    expired: 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium',
    visible: 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium',
    hidden: 'bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium'
  },
  inputs: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition',
  cards: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200',
  modals: {
    overlay: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50',
    content: 'bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto',
    header: 'flex justify-between items-center p-6 border-b border-gray-300 sticky top-0 bg-white z-10',
    body: 'p-6',
    footer: 'flex justify-between p-6 border-t border-gray-300 sticky bottom-0 bg-white'
  },
  tables: {
    header: 'bg-gray-100 px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase',
    cell: 'px-4 py-3 border-b border-gray-200',
    row: 'hover:bg-gray-50 transition'
  },
  layouts: {
    grid_cols_2: 'grid grid-cols-2 gap-3',
    grid_cols_1_md_2: 'grid grid-cols-1 md:grid-cols-2 gap-3',
    grid_cols_2_md_4: 'grid grid-cols-2 md:grid-cols-4 gap-3',
    flex_col_md_row: 'flex flex-col md:flex-row',
    flex_center: 'flex items-center justify-center'
  }
};

// ==================== INITIAL DATA ====================
export const INITIAL_OFFER_DATA = {
  countdown: [
    { 
      id: 1, 
      title: 'Flash Weekend Sale', 
      end_time: new Date(Date.now() + 172800000).toISOString(), 
      status: 'active', 
      visible: true, 
      cta_text: 'Shop Now', 
      cta_link: '/menu', 
      gradient: 'from-orange-400 to-red-500' 
    }
  ],
  food: [
    { 
      id: 2, 
      title: '50% Off Pizza', 
      food_item: 'Margherita Pizza', 
      discount: 50, 
      discount_type: '%', 
      price: 299, 
      end_time: new Date(Date.now() + 7200000).toISOString(), 
      status: 'active', 
      visible: true, 
      gradient: 'from-orange-400 to-red-500', 
      customer_type: 'All Users' 
    }
  ],
  benefits: [
    { 
      id: 3, 
      title: 'Fast Delivery', 
      subtitle: 'Get food in 30 mins', 
      icon_id: 'zap', 
      section: 'top', 
      status: 'visible' 
    }
  ],
  loyalty: [
    { 
      id: 4, 
      tier: 'Gold', 
      min_points: 2000, 
      benefits: ['15% cashback', 'Free delivery'], 
      multiplier: 2, 
      status: 'active', 
      icon_id: 'award' 
    }
  ],
  holiday: [
    { 
      id: 5, 
      title: 'Diwali Feast', 
      price: 799, 
      savings: 300, 
      items: ['Paneer Tikka', 'Naan', 'Biryani'], 
      season: 'Diwali', 
      status: 'active', 
      gradient: 'from-purple-400 to-pink-500' 
    }
  ],
  combo: [
    { 
      id: 6, 
      title: 'Movie Night Combo', 
      items: ['Large Pizza', 'Garlic Bread', '2 Cokes'], 
      price: 599, 
      savings: 150, 
      status: 'active', 
      gradient: 'from-yellow-400 to-orange-500' 
    }
  ],
  subscription: [
    { 
      id: 7, 
      title: 'Pro Monthly Plan', 
      plan_type: 'Pro', 
      billing_cycle: 'Monthly', 
      price: 299, 
      features: ['Free Delivery', '10% Cashback'], 
      status: 'active', 
      trial_days: 7, 
      max_users: 5, 
      icon_id: 'shield' 
    }
  ]
};

// ==================== HOOKS ====================
export const useOfferData = () => {
  const [data, setData] = useState(INITIAL_OFFER_DATA);
  const [active_tab, setActiveTab] = useState('countdown');
  const [search_term, setSearchTerm] = useState('');
  const [filter_status, setFilterStatus] = useState('all');

  const addOffer = useCallback((type, item) => {
    setData(prev => ({ 
      ...prev, 
      [type]: [...prev[type], { ...item, id: Date.now() }] 
    }));
  }, []);

  const updateOffer = useCallback((type, id, updates) => {
    setData(prev => ({ 
      ...prev, 
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, ...updates } : item
      ) 
    }));
  }, []);

  const removeOffer = useCallback((type, id) => {
    setData(prev => ({ 
      ...prev, 
      [type]: prev[type].filter(item => item.id !== id) 
    }));
  }, []);

  const toggleVisibility = useCallback((type, id) => {
    setData(prev => ({ 
      ...prev, 
      [type]: prev[type].map(item => 
        item.id === id ? { 
          ...item, 
          visible: !item.visible,
          status: item.status === 'visible' ? 'hidden' : 
                  item.status === 'hidden' ? 'visible' : 
                  item.status
        } : item
      ) 
    }));
  }, []);

  const filtered_offers = useMemo(() => {
    const items = data[active_tab] || [];
    return items.filter(item => {
      const matches_search = !search_term || 
        item.title?.toLowerCase().includes(search_term.toLowerCase()) ||
        item.food_item?.toLowerCase().includes(search_term.toLowerCase()) ||
        item.tier?.toLowerCase().includes(search_term.toLowerCase()) ||
        item.plan_type?.toLowerCase().includes(search_term.toLowerCase());
      
      const matches_filter = filter_status === 'all' || item.status === filter_status;
      
      return matches_search && matches_filter;
    });
  }, [data, active_tab, search_term, filter_status]);

  return { 
    data, 
    active_tab, 
    setActiveTab, 
    addOffer, 
    updateOffer, 
    removeOffer, 
    toggleVisibility, 
    search_term, 
    setSearchTerm, 
    filter_status, 
    setFilterStatus, 
    filtered_offers 
  };
};

export const useCountdownTimer = (end_time) => {
  const [time_left, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const calculate_time_left = () => {
      const diff = new Date(end_time) - new Date();
      if (diff > 0) {
        setTimeLeft({ 
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000)
        });
      }
    };

    calculate_time_left();
    const timer_id = setInterval(calculate_time_left, 1000);
    
    return () => clearInterval(timer_id);
  }, [end_time]);

  return time_left;
};

export const useModalState = () => {
  const [is_open, setIsOpen] = useState(false);
  const [modal_data, setModalData] = useState(null);

  const show_modal = useCallback((data) => {
    setModalData(data);
    setIsOpen(true);
  }, []);

  const hide_modal = useCallback(() => {
    setIsOpen(false);
    setModalData(null);
  }, []);

  return { 
    is_open, 
    modal_data, 
    show_modal, 
    hide_modal 
  };
};

// ==================== VALIDATION HANDLERS ====================
export const validate_offer_form = (form_data, current_step) => {
  const validation_errors = [];

  // Step 2 validation
  if (current_step >= 2) {
    if (!form_data.title || form_data.title.trim() === '') {
      validation_errors.push('Title is required');
    }
  }

  // Step 3 validation
  if (current_step >= 3) {
    const is_food_related = ['food', 'combo', 'holiday'].includes(form_data.type);
    
    if (is_food_related && form_data.discount) {
      if (form_data.discount_type === '%' && (form_data.discount < 0 || form_data.discount > 100)) {
        validation_errors.push('Discount percentage must be between 0-100');
      }
      if (form_data.price && form_data.discount >= form_data.price && form_data.discount_type !== '%') {
        validation_errors.push('Discount cannot exceed original price');
      }
    }
    
    if (form_data.type === 'subscription') {
      if (form_data.price && form_data.price < 0) {
        validation_errors.push('Price must be positive');
      }
      if (form_data.trial_days && form_data.trial_days < 0) {
        validation_errors.push('Trial days must be positive');
      }
    }
  }

  // Step 6 validation
  if (current_step >= 6 && form_data.end_time) {
    const end_date = new Date(form_data.end_time);
    const start_date = form_data.start_time ? new Date(form_data.start_time) : new Date();
    
    if (end_date < new Date()) {
      validation_errors.push('End date must be in the future');
    }
    if (form_data.start_time && end_date < start_date) {
      validation_errors.push('End date must be after start date');
    }
  }

  return validation_errors;
};

// ==================== UI COMPONENTS ====================
export const Header = ({ on_create, on_refresh, on_publish }) => (
  <div className="bg-white p-4 md:p-6">
    <div className={OFFER_STYLES.layouts.flex_col_md_row + " justify-between gap-4"}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Offer Management</h1>
        <p className="text-gray-600 text-sm mt-1">Manage offers, rewards & landing page content</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={on_create} 
          className={OFFER_STYLES.buttons.primary}
        >
          <Plus size={20}/> Create
        </button>
        <button 
          onClick={on_refresh} 
          className={OFFER_STYLES.buttons.secondary}
        >
          <RefreshCw size={20}/>
        </button>
        <button 
          onClick={on_publish} 
          className={OFFER_STYLES.buttons.secondary + " hidden"}
        >
          <Upload size={20}/>
        </button>
      </div>
    </div>
  </div>
);

export const Tabs = ({ tabs, active_tab, on_tab_change }) => (
  <div className="bg-white overflow-x-auto">
    <div className="flex px-4">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button 
            key={tab.id} 
            onClick={() => on_tab_change(tab.id)} 
            className={`px-4 py-3 border-b-2 transition whitespace-nowrap ${
              active_tab === tab.id 
                ? 'border-orange-500 text-orange-600 font-medium' 
                : 'border-transparent text-gray-600 hover:text-orange-500'
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon size={16}/>
              <span className="hidden md:inline">{tab.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

export const SearchFilter = ({ search_term, on_search_change, filter_status, on_filter_change }) => (
  <div className="bg-white p-4">
    <div className={OFFER_STYLES.layouts.flex_col_md_row + " gap-3"}>
      <div className="flex-1 relative">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
        <input
          type="text"
          placeholder="Search Offers..."
          value={search_term}
          onChange={(e) => on_search_change(e.target.value)}
          className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
        />
      </div>
      <div className="flex gap-2">
        <select 
          value={filter_status} 
          onChange={(e) => on_filter_change(e.target.value)}
          className="px-4 py-2 md:py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="expired">Expired</option>
        </select>
      </div>
    </div>
  </div>
);

export const StatsCard = ({ label, value, color = 'gray' }) => {
  const color_classes = {
    gray: 'bg-gray-50 border-gray-200',
    green: 'bg-green-50 border-green-200',
    blue: 'bg-blue-50 border-blue-200',
    yellow: 'bg-yellow-50 border-yellow-200'
  };

  return (
    <div className={`${color_classes[color]} border rounded-lg px-3 py-7`}>
      <p className="text-xs text-gray-600">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export const Stats = ({ data, active_tab }) => {
  const items = data[active_tab] || [];
  const stats = {
    total: items.length,
    active: items.filter(item => item.status === 'active' || item.status === 'visible').length,
    scheduled: items.filter(item => item.status === 'scheduled').length,
    draft: items.filter(item => item.status === 'draft' || item.status === 'hidden').length
  };
  
  return (
    <div className={OFFER_STYLES.layouts.grid_cols_2_md_4 + " p-4"}>
      <StatsCard label="Total" value={stats.total} color="gray"/>
      <StatsCard label="Active" value={stats.active} color="green"/>
      <StatsCard label="Scheduled" value={stats.scheduled} color="blue"/>
      <StatsCard label="Draft" value={stats.draft} color="yellow"/>
    </div>
  );
};

export const TimeUnit = ({ value, label }) => (
  <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
    <span className="font-bold">{String(value).padStart(2, '0')}</span>
    <span className="ml-0.5">{label}</span>
  </div>
);

export const CountdownTimer = ({ end_time }) => {
  const time_left = useCountdownTimer(end_time);
  
  return (
    <div className="flex gap-1">
      <TimeUnit value={time_left.days} label="D"/>
      <TimeUnit value={time_left.hours} label="H"/>
      <TimeUnit value={time_left.minutes} label="M"/>
      <TimeUnit value={time_left.seconds} label="S"/>
    </div>
  );
};

export const StatusBadge = ({ status }) => {
  const badge_style = OFFER_STYLES.badges[status] || OFFER_STYLES.badges.draft;
  const status_label = OFFER_CONTENT.status_labels[status] || status;
  
  return (
    <span className={badge_style}>
      {status_label}
    </span>
  );
};

export const ActionButtons = ({ item, on_edit, on_delete, on_toggle }) => (
  <div className="flex justify-end gap-2">
    <button 
      onClick={() => on_toggle(item.id)} 
      className={OFFER_STYLES.buttons.ghost}
      title={item.visible ? 'Hide' : 'Show'}
    >
      {item.visible || item.status === 'visible' ? <Eye size={18}/> : <EyeOff size={18}/>}
    </button>
    <button 
      onClick={() => on_edit(item)} 
      className="text-blue-600 hover:text-blue-800 transition p-1 rounded hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      title="Edit"
    >
      <Edit2 size={18}/>
    </button>
    <button 
      onClick={() => on_delete(item.id)} 
      className="text-red-600 hover:text-red-800 transition p-1 rounded hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
      title="Delete"
    >
      <Trash2 size={18}/>
    </button>
  </div>
);

export const TableRow = ({ item, item_type, on_edit, on_delete, on_toggle }) => (
  <tr className={OFFER_STYLES.tables.row}>
    <td className={OFFER_STYLES.tables.cell}>
      <div className="font-medium text-gray-900">{item.title}</div>
      {item.food_item && <div className="text-sm text-gray-500">{item.food_item}</div>}
    </td>
    <td className={`${OFFER_STYLES.tables.cell} text-sm text-gray-600`}>
      {item.discount && `${item.discount}${item.discount_type} off`}
      {item.price && ` • ₹${item.price}`}
      {item.tier}
      {item.min_points && ` • ${item.min_points} pts`}
      {item.plan_type && ` • ${item.plan_type}`}
      {item.billing_cycle && ` • ${item.billing_cycle}`}
    </td>
    {item_type === 'countdown' && (
      <td className={OFFER_STYLES.tables.cell}>
        {item.end_time && <CountdownTimer end_time={item.end_time}/>}
      </td>
    )}
    <td className={OFFER_STYLES.tables.cell}>
      <StatusBadge status={item.status}/>
    </td>
    <td className={OFFER_STYLES.tables.cell}>
      <ActionButtons 
        item={item} 
        on_edit={on_edit} 
        on_delete={on_delete} 
        on_toggle={on_toggle} 
      />
    </td>
  </tr>
);

export const OfferTable = ({ items, item_type, on_edit, on_delete, on_toggle }) => (
  <div className="hidden md:block overflow-x-auto p-4">
    <table className="w-full">
      <thead className="bg-gray-100">
        <tr>
          <th className={OFFER_STYLES.tables.header}>Title</th>
          <th className={OFFER_STYLES.tables.header}>Details</th>
          {item_type === 'countdown' && <th className={OFFER_STYLES.tables.header}>Timer</th>}
          <th className={OFFER_STYLES.tables.header}>Status</th>
          <th className={`${OFFER_STYLES.tables.header} text-right`}>Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {items.length === 0 ? (
          <tr>
            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
              No offers found
            </td>
          </tr>
        ) : (
          items.map(item => (
            <TableRow 
              key={item.id} 
              item={item} 
              item_type={item_type} 
              on_edit={on_edit} 
              on_delete={on_delete} 
              on_toggle={on_toggle} 
            />
          ))
        )}
      </tbody>
    </table>
  </div>
);

export const OfferCard = ({ item, item_type, on_edit, on_delete, on_toggle }) => (
  <div className={OFFER_STYLES.cards}>
    <div className="flex justify-between mb-3">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.title}</h3>
        {item.subtitle && <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>}
        {item.food_item && <p className="text-sm text-gray-500 mt-1">{item.food_item}</p>}
        {item.plan_type && (
          <p className="text-sm text-gray-500 mt-1">
            {item.plan_type} • {item.billing_cycle}
          </p>
        )}
      </div>
      <StatusBadge status={item.status}/>
    </div>
    
    {item.discount && (
      <div className="text-orange-600 font-bold mb-2">
        {item.discount}{item.discount_type} OFF
      </div>
    )}
    
    {item.price && <div className="text-xl font-bold mb-2">₹{item.price}</div>}
    
    {item.end_time && (
      <div className="mb-3 pt-3 border-t border-gray-300">
        <p className="text-xs text-gray-500 mb-2">Time Remaining</p>
        <CountdownTimer end_time={item.end_time}/>
      </div>
    )}
    
    <div className="flex justify-between pt-3 border-t border-gray-300">
      <div className="flex items-center gap-2">
        {item.visible || item.status === 'visible' ? 
          <Eye size={16} className="text-green-600"/> : 
          <EyeOff size={16} className="text-gray-400"/>
        }
        <span className="text-xs text-gray-600">
          {item.visible || item.status === 'visible' ? 'Visible' : 'Hidden'}
        </span>
      </div>
      <ActionButtons 
        item={item} 
        on_edit={on_edit} 
        on_delete={on_delete} 
        on_toggle={on_toggle} 
      />
    </div>
  </div>
);

export const OfferCards = ({ items, item_type, on_edit, on_delete, on_toggle }) => (
  <div className="md:hidden grid gap-3 p-3">
    {items.length === 0 ? (
      <div className={OFFER_STYLES.layouts.flex_center + " py-12 text-gray-500 flex-col"}>
        <Package size={48} className="mb-3 text-gray-300"/>
        <p>No offers found</p>
      </div>
    ) : (
      items.map(item => (
        <OfferCard 
          key={item.id} 
          item={item} 
          item_type={item_type} 
          on_edit={on_edit} 
          on_delete={on_delete} 
          on_toggle={on_toggle} 
        />
      ))
    )}
  </div>
);

// ==================== FORM COMPONENTS ====================
export const FormSteps = ({ current_step, total_steps, on_step_change }) => (
  <div className="flex items-center">
    {OFFER_CONTENT.form_steps.map((step_label, index) => (
      <div key={index} className="flex items-center flex-1">
        <button 
          onClick={() => on_step_change(index + 1)} 
          className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition ${
            index + 1 <= current_step 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}
          aria-label={`Go to step ${index + 1}: ${step_label}`}
        >
          {index + 1}
        </button>
        {index < total_steps - 1 && (
          <div 
            className={`flex-1 h-1 mx-2 transition ${
              index + 1 < current_step ? 'bg-orange-500' : 'bg-gray-200'
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

export const ErrorDisplay = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start gap-2">
        <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0"/>
        <div className="flex-1">
          <p className="font-medium text-red-800">Please fix the following errors:</p>
          <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const StepTypeSelection = ({ form_data, on_form_change }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Select Promotion Type</h3>
    <div className={OFFER_STYLES.layouts.grid_cols_1_md_2 + " gap-3"}>
      {OFFER_CONTENT.tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => on_form_change({ type: tab.id })}
            className={`p-4 border border-gray-300 rounded-lg flex items-center gap-3 transition ${
              form_data.type === tab.id
                ? 'border-orange-500 bg-orange-50'
                : 'hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Icon size={20} className="text-orange-500 flex-shrink-0" />
            <span className="font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  </div>
);

export const StepBasicInfo = ({ form_data, on_form_change }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Basic Information</h3>
    <input
      type="text"
      placeholder="Title"
      value={form_data.title}
      onChange={(e) => on_form_change({ title: e.target.value })}
      className={OFFER_STYLES.inputs}
      required
    />
    <input
      type="text"
      placeholder="Subtitle (optional)"
      value={form_data.subtitle || ''}
      onChange={(e) => on_form_change({ subtitle: e.target.value })}
      className={OFFER_STYLES.inputs}
    />
  </div>
);

export const StepConfiguration = ({ form_data, on_form_change, active_tab }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Configuration</h3>

    {(active_tab === 'food' || active_tab === 'combo' || active_tab === 'holiday') && (
      <div className={OFFER_STYLES.layouts.grid_cols_2 + " gap-3"}>
        <input
          type="number"
          placeholder="Price"
          value={form_data.price || ''}
          onChange={(e) => on_form_change({ price: +e.target.value })}
          className={OFFER_STYLES.inputs}
          min="0"
        />
        <input
          type="number"
          placeholder="Discount"
          value={form_data.discount || ''}
          onChange={(e) => on_form_change({ discount: +e.target.value })}
          className={OFFER_STYLES.inputs}
          min="0"
        />
      </div>
    )}

    {active_tab === 'subscription' && (
      <>
        <select
          value={form_data.plan_type}
          onChange={(e) => on_form_change({ plan_type: e.target.value })}
          className={OFFER_STYLES.inputs}
        >
          {OFFER_CONTENT.subscription_plans.map(plan => (
            <option key={plan} value={plan}>{plan}</option>
          ))}
        </select>
        
        <select
          value={form_data.billing_cycle}
          onChange={(e) => on_form_change({ billing_cycle: e.target.value })}
          className={OFFER_STYLES.inputs}
        >
          {OFFER_CONTENT.billing_cycles.map(cycle => (
            <option key={cycle} value={cycle}>{cycle}</option>
          ))}
        </select>
        
        <input
          type="number"
          placeholder="Price"
          value={form_data.price || ''}
          onChange={(e) => on_form_change({ price: +e.target.value })}
          className={OFFER_STYLES.inputs}
          min="0"
        />
        
        <div className={OFFER_STYLES.layouts.grid_cols_2 + " gap-3"}>
          <input
            type="number"
            placeholder="Trial Days"
            value={form_data.trial_days || ''}
            onChange={(e) => on_form_change({ trial_days: +e.target.value })}
            className={OFFER_STYLES.inputs}
            min="0"
          />
          <input
            type="number"
            placeholder="Max Users"
            value={form_data.max_users || ''}
            onChange={(e) => on_form_change({ max_users: +e.target.value })}
            className={OFFER_STYLES.inputs}
            min="1"
          />
        </div>
      </>
    )}

    <select
      value={form_data.customer_type}
      onChange={(e) => on_form_change({ customer_type: e.target.value })}
      className={OFFER_STYLES.inputs}
    >
      {OFFER_CONTENT.customer_types.map(customer_type => (
        <option key={customer_type} value={customer_type}>{customer_type}</option>
      ))}
    </select>
  </div>
);

export const StepMediaUI = ({ form_data, on_form_change }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Media & UI</h3>
    <select
      value={form_data.gradient}
      onChange={(e) => on_form_change({ gradient: e.target.value })}
      className={OFFER_STYLES.inputs}
    >
      {OFFER_CONTENT.gradients.map(gradient => (
        <option key={gradient.id} value={gradient.value}>
          {gradient.label}
        </option>
      ))}
    </select>
    <select
      value={form_data.icon_id}
      onChange={(e) => on_form_change({ icon_id: e.target.value })}
      className={OFFER_STYLES.inputs}
    >
      {OFFER_CONTENT.icons.map(icon => (
        <option key={icon.id} value={icon.id}>
          {icon.label}
        </option>
      ))}
    </select>
  </div>
);

export const StepVisibilityRules = ({ form_data, on_form_change }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Visibility & Rules</h3>
    
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={form_data.visible}
        onChange={(e) => on_form_change({ visible: e.target.checked })}
        className="rounded text-orange-500 focus:ring-orange-500"
      />
      <span>Visible on landing page</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={form_data.stackable}
        onChange={(e) => on_form_change({ stackable: e.target.checked })}
        className="rounded text-orange-500 focus:ring-orange-500"
      />
      <span>Stackable with other offers</span>
    </label>
    
    {form_data.type === 'subscription' && (
      <div className="space-y-2">
        <h4 className="font-medium">Features</h4>
        {OFFER_CONTENT.subscription_features.map(feature => (
          <label key={feature} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form_data.features?.includes(feature)}
              onChange={(e) => {
                const updated_features = e.target.checked
                  ? [...(form_data.features || []), feature]
                  : form_data.features?.filter(f => f !== feature) || [];
                on_form_change({ features: updated_features });
              }}
              className="rounded text-orange-500 focus:ring-orange-500"
            />
            <span>{feature}</span>
          </label>
        ))}
      </div>
    )}
  </div>
);

export const StepValidity = ({ form_data, on_form_change }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Validity</h3>
    <input
      type="datetime-local"
      value={form_data.start_time || ''}
      onChange={(e) => on_form_change({ start_time: e.target.value })}
      className={OFFER_STYLES.inputs}
    />
    <input
      type="datetime-local"
      value={form_data.end_time || ''}
      onChange={(e) => on_form_change({ end_time: e.target.value })}
      className={OFFER_STYLES.inputs}
    />
  </div>
);

export const StepStatus = ({ form_data, on_form_change }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Status</h3>
    <select
      value={form_data.status}
      onChange={(e) => on_form_change({ status: e.target.value })}
      className={OFFER_STYLES.inputs}
    >
      <option value="draft">Draft</option>
      <option value="active">Active</option>
      <option value="scheduled">Scheduled</option>
    </select>
  </div>
);

// ==================== MODAL COMPONENT ====================
export const OfferModal = ({ is_open, on_close, on_save, active_tab, modal_data }) => {
  const [current_step, setCurrentStep] = useState(1);
  const [form_data, setFormData] = useState(() => ({
    type: active_tab,
    title: '',
    subtitle: '',
    discount: '',
    discount_type: '%',
    status: 'draft',
    visible: false,
    gradient: 'from-orange-400 to-red-500',
    icon_id: 'zap',
    customer_type: 'All Users',
    stackable: false,
    image_preview: null,
    trial_days: 0,
    max_users: 1,
    plan_type: 'Basic',
    billing_cycle: 'Monthly',
    features: [],
    ...modal_data
  }));
  const [validation_errors, setValidationErrors] = useState([]);

  useEffect(() => {
    if (modal_data) {
      setFormData(modal_data);
      setCurrentStep(1);
    }
  }, [modal_data]);

  useEffect(() => {
    const handle_escape_key = (event) => {
      if (event.key === 'Escape' && is_open) {
        on_close();
      }
    };

    window.addEventListener('keydown', handle_escape_key);
    return () => window.removeEventListener('keydown', handle_escape_key);
  }, [is_open, on_close]);

  const handle_form_change = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handle_next_step = () => {
    const errors = validate_offer_form(form_data, current_step);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);
    setCurrentStep(step => Math.min(step + 1, 7));
  };

  const handle_save = () => {
    const errors = validate_offer_form(form_data, 7);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    on_save(form_data);
    on_close();
    setCurrentStep(1);
    setValidationErrors([]);
  };

  const render_step_content = () => {
    const step_components = {
      1: <StepTypeSelection form_data={form_data} on_form_change={handle_form_change} />,
      2: <StepBasicInfo form_data={form_data} on_form_change={handle_form_change} />,
      3: <StepConfiguration 
            form_data={form_data} 
            on_form_change={handle_form_change} 
            active_tab={active_tab} 
          />,
      4: <StepMediaUI form_data={form_data} on_form_change={handle_form_change} />,
      5: <StepVisibilityRules form_data={form_data} on_form_change={handle_form_change} />,
      6: <StepValidity form_data={form_data} on_form_change={handle_form_change} />,
      7: <StepStatus form_data={form_data} on_form_change={handle_form_change} />
    };

    return step_components[current_step] || null;
  };

  if (!is_open) return null;

  return (
    <div 
      className={OFFER_STYLES.modals.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          on_close();
        }
      }}
    >
      <div 
        className={OFFER_STYLES.modals.content}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={OFFER_STYLES.modals.header}>
          <h2 className="text-xl font-bold">
            {modal_data ? 'Edit' : 'Create'} Offer
          </h2>
          <button 
            onClick={on_close} 
            className="text-gray-400 hover:text-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
            aria-label="Close modal"
          >
            <X size={24}/>
          </button>
        </div>
        
        <div className={OFFER_STYLES.modals.body}>
          <FormSteps 
            current_step={current_step} 
            total_steps={7} 
            on_step_change={setCurrentStep} 
          />
          
          <ErrorDisplay errors={validation_errors} />
          
          <div className="mt-6">
            {render_step_content()}
          </div>
        </div>
        
        <div className={OFFER_STYLES.modals.footer}>
          <button 
            onClick={() => {
              setCurrentStep(step => Math.max(1, step - 1));
              setValidationErrors([]);
            }} 
            disabled={current_step === 1} 
            className={`${current_step === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${OFFER_STYLES.buttons.secondary}`}
          >
            <ChevronLeft size={20}/> Back
          </button>
          <div className="flex gap-2">
            <button onClick={on_close} className={OFFER_STYLES.buttons.secondary}>
              Cancel
            </button>
            {current_step < 7 ? (
              <button onClick={handle_next_step} className={OFFER_STYLES.buttons.primary}>
                Next <ChevronRight size={20}/>
              </button>
            ) : (
              <button onClick={handle_save} className={OFFER_STYLES.buttons.primary}>
                <Check size={20}/> {modal_data ? 'Update' : 'Create'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export const OfferManagement = () => {
  const offer_data = useOfferData();
  const modal_state = useModalState();

  const handle_publish = () => {
    alert('Published successfully');
  };

  return (
    <div className="mt-25 min-h-screen bg-gray-50">
      <Header
        on_create={() => modal_state.show_modal(null)}
        on_refresh={() => window.location.reload()}
        on_publish={handle_publish}
      />

      <Tabs 
        tabs={OFFER_CONTENT.tabs} 
        active_tab={offer_data.active_tab} 
        on_tab_change={offer_data.setActiveTab} 
      />

      <SearchFilter
        search_term={offer_data.search_term}
        on_search_change={offer_data.setSearchTerm}
        filter_status={offer_data.filter_status}
        on_filter_change={offer_data.setFilterStatus}
      />

      <Stats 
        data={offer_data.data} 
        active_tab={offer_data.active_tab} 
      />

      <OfferTable
        items={offer_data.filtered_offers}
        item_type={offer_data.active_tab}
        on_edit={modal_state.show_modal}
        on_delete={(id) => offer_data.removeOffer(offer_data.active_tab, id)}
        on_toggle={(id) => offer_data.toggleVisibility(offer_data.active_tab, id)}
      />

      <OfferCards
        items={offer_data.filtered_offers}
        item_type={offer_data.active_tab}
        on_edit={modal_state.show_modal}
        on_delete={(id) => offer_data.removeOffer(offer_data.active_tab, id)}
        on_toggle={(id) => offer_data.toggleVisibility(offer_data.active_tab, id)}
      />

      <OfferModal
        is_open={modal_state.is_open}
        on_close={modal_state.hide_modal}
        on_save={(form_data) => {
          if (modal_state.modal_data) {
            offer_data.updateOffer(
              offer_data.active_tab, 
              modal_state.modal_data.id, 
              form_data
            );
          } else {
            offer_data.addOffer(offer_data.active_tab, form_data);
          }
        }}
        active_tab={offer_data.active_tab}
        modal_data={modal_state.modal_data}
      />
    </div>
  );
};

export default OfferManagement;