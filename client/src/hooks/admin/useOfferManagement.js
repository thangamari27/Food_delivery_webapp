import { useState, useCallback, useMemo, useEffect } from 'react';
import { offerContent } from '../../utils/constant/admin/AdminDashboard';

export const useOfferManagement = () => {
  const [data, setData] = useState(offerContent.initialOfferData);
  const [active_tab, setActiveTab] = useState('countdown');
  const [search_term, setSearchTerm] = useState('');
  const [filter_status, setFilterStatus] = useState('all');

  const add_offer = useCallback((type, item) => {
    setData(prev => ({ 
      ...prev, 
      [type]: [...prev[type], { ...item, id: Date.now() }] 
    }));
  }, []);

  const update_offer = useCallback((type, id, updates) => {
    setData(prev => ({ 
      ...prev, 
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, ...updates } : item
      ) 
    }));
  }, []);

  const remove_offer = useCallback((type, id) => {
    setData(prev => ({ 
      ...prev, 
      [type]: prev[type].filter(item => item.id !== id) 
    }));
  }, []);

  const toggle_visibility = useCallback((type, id) => {
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
    set_active_tab: setActiveTab, 
    add_offer, 
    update_offer, 
    remove_offer, 
    toggle_visibility, 
    search_term, 
    set_search_term: setSearchTerm, 
    filter_status, 
    set_filter_status: setFilterStatus, 
    filtered_offers 
  };
};

export const useCountdownTimer = (end_time) => {
  const [time_left, setTimeLeft] = useState({ 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });
  
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