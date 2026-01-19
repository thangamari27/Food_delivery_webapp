import { useState, useEffect, useCallback } from 'react';
import { enquiryConstants } from '../../utils/constant/admin/AdminDashboard';
import { enquiryService } from '../../utils/handler/admin/enquiryServiceHandler';

export const useEnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search_query, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(enquiryConstants.initial_filters);
  const [current_page, setCurrentPage] = useState(enquiryConstants.initial_page);
  const [page_size, setPageSize] = useState(enquiryConstants.default_page_size);
  const [selected_enquiry, setSelectedEnquiry] = useState(null);
  const [modal_state, setModalState] = useState({
    view: false,
    reply: false,
    delete: false,
    create: false
  });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setTimeout(() => {
        setEnquiries(enquiryService.generate_mock_data());
        setLoading(false);
      }, 800);
    };
    loadData();
  }, []);

  // Filter enquiries
  const filtered_enquiries = useCallback(() => {
    return enquiries.filter(e => {
      const matches_search = !search_query || 
        e.name.toLowerCase().includes(search_query.toLowerCase()) ||
        e.email.toLowerCase().includes(search_query.toLowerCase()) ||
        e.subject.toLowerCase().includes(search_query.toLowerCase()) ||
        e.id.toLowerCase().includes(search_query.toLowerCase());

      const matches_status = filters.status === 'all' || e.status === filters.status;
      const matches_priority = filters.priority === 'all' || e.priority === filters.priority;
      const matches_purpose = filters.purpose === 'all' || e.purpose === filters.purpose;

      return matches_search && matches_status && matches_priority && matches_purpose;
    });
  }, [enquiries, search_query, filters]);

  // Paginate enquiries
  const paginated_enquiries = useCallback(() => {
    const start = (current_page - 1) * page_size;
    const filtered = filtered_enquiries();
    return filtered.slice(start, start + page_size);
  }, [filtered_enquiries, current_page, page_size]);

  // Calculate total pages
  const total_pages = useCallback(() => {
    const filtered = filtered_enquiries();
    return Math.ceil(filtered.length / page_size);
  }, [filtered_enquiries, page_size]);

  // Update enquiry
  const update_enquiry = useCallback((id, updates) => {
    setEnquiries(prev => prev.map(e => 
      e.id === id ? { ...e, ...updates, updated_at: new Date().toISOString() } : e
    ));
  }, []);

  // Delete enquiry
  const delete_enquiry = useCallback((id) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  }, []);

  // Add reply
  const add_reply = useCallback((id, reply) => {
    setEnquiries(prev => prev.map(e => 
      e.id === id ? {
        ...e,
        replies: [...e.replies, reply],
        status: e.status === 'New' ? 'In Progress' : e.status,
        updated_at: new Date().toISOString()
      } : e
    ));
  }, []);

  // Create enquiry
  const create_enquiry = useCallback((enquiry_data) => {
    const new_enquiry = {
      ...enquiry_data,
      id: `ENQ-${String(enquiries.length + 1).padStart(4, '0')}`,
      status: 'New',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      replies: []
    };
    setEnquiries(prev => [new_enquiry, ...prev]);
  }, [enquiries.length]);

  // Handle stat click
  const handle_stat_click = useCallback((filter) => {
    if (filter.status) setFilters({ ...filters, status: filter.status });
    if (filter.priority) setFilters({ ...filters, priority: filter.priority });
    setCurrentPage(1);
  }, [filters]);

  // Clear all filters
  const clear_all_filters = useCallback(() => {
    setFilters(enquiryConstants.initial_filters);
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  // Open modal
  const open_modal = useCallback((modal_type, enquiry = null) => {
    setSelectedEnquiry(enquiry);
    setModalState(prev => ({ ...prev, [modal_type]: true }));
  }, []);

  // Close modal
  const close_modal = useCallback((modal_type) => {
    setModalState(prev => ({ ...prev, [modal_type]: false }));
    setSelectedEnquiry(null);
  }, []);

  return {
    // State
    enquiries,
    loading,
    search_query,
    filters,
    current_page,
    page_size,
    selected_enquiry,
    modal_state,
    
    // Computed values
    filtered_enquiries: filtered_enquiries(),
    paginated_enquiries: paginated_enquiries(),
    total_pages: total_pages(),
    stats: enquiryService.calculate_stats(enquiries),
    
    // Actions
    setSearchQuery,
    setFilters,
    setCurrentPage,
    setPageSize,
    
    // Operations
    update_enquiry,
    delete_enquiry,
    add_reply,
    create_enquiry,
    handle_stat_click,
    clear_all_filters,
    open_modal,
    close_modal
  };
};