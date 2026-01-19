import { enquiryContent } from "../../../../../utils/constant/admin/AdminDashboard"
import { enquiryStyles } from "../../../../../utils/styles/AdminStyle"
import { useEnquiryManagement } from "../../../../../hooks/admin/useEnquiryManagement"
import EnquiryHeader from "./EnquiryHeader"
import StatsSection from "./StatsSection"
import ActionBar from "./ActionBar"
import FilterPanel from "./FilterPanel"
import EnquiryTable from "./EnquiryTable"
import EnquiryMobileCards from "./EnquiryMobileCards"
import CreateModal from "./CreateModal"
import ViewModal from "./ViewModal"
import ReplyModal from "./ReplyModal"
import DeleteModal from "./DeleteModal"
import Pagination from "./Pagination"
import EmptyState from "./EmptyState"

function EnquiryManagement() {
  const content = enquiryContent;
  const styles = enquiryStyles;
  
  const {
    // State
    loading,
    search_query,
    filters,
    current_page,
    page_size,
    selected_enquiry,
    modal_state,
    
    // Computed values
    paginated_enquiries,
    filtered_enquiries,
    total_pages,
    stats,
    
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
  } = useEnquiryManagement();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className="animate-pulse space-y-6">
          <div className="h-20 bg-gray-200 rounded-xl"></div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[1,2,3,4,5].map(i => <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>)}
          </div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <EnquiryHeader content={content} styles={styles} />
      
      <StatsSection 
        content={content}
        stats={stats} 
        on_stat_click={handle_stat_click} 
        styles={styles}
      />
      
      <ActionBar 
        content={content}
        search_query={search_query}
        on_search_change={setSearchQuery}
        on_create_click={() => open_modal('create')}
        styles={styles}
      />
      
      <FilterPanel 
        content={content}
        filters={filters}
        on_filter_change={setFilters}
        on_clear_all={clear_all_filters}
        styles={styles}
      />
      
      <EnquiryTable
        content={content}
        enquiries={paginated_enquiries}
        on_view={(enquiry) => open_modal('view', enquiry)}
        on_reply={(enquiry) => open_modal('reply', enquiry)}
        on_resolve={(id) => update_enquiry(id, { status: 'Resolved' })}
        on_delete={(enquiry) => open_modal('delete', enquiry)}
        styles={styles}
      />
      
      <EnquiryMobileCards
        content={content}
        enquiries={paginated_enquiries}
        on_view={(enquiry) => open_modal('view', enquiry)}
        on_reply={(enquiry) => open_modal('reply', enquiry)}
        on_resolve={(id) => update_enquiry(id, { status: 'Resolved' })}
        on_delete={(enquiry) => open_modal('delete', enquiry)}
        styles={styles}
      />
      
      {filtered_enquiries.length === 0 && (
        <EmptyState content={content} on_clear_filters={clear_all_filters} styles={styles} />
      )}
      
      {total_pages > 1 && filtered_enquiries.length > 0 && (
        <Pagination
          content={content}
          current_page={current_page}
          total_pages={total_pages}
          page_size={page_size}
          total_items={filtered_enquiries.length}
          on_page_change={setCurrentPage}
          on_page_size_change={setPageSize}
          styles={styles}
        />
      )}
      
      {/* Modals */}
      {modal_state.view && (
        <ViewModal
          content={content}
          enquiry={selected_enquiry}
          on_close={() => close_modal('view')}
          on_status_change={update_enquiry}
          on_priority_change={update_enquiry}
          styles={styles}
        />
      )}
      
      {modal_state.reply && (
        <ReplyModal
          content={content}
          enquiry={selected_enquiry}
          on_close={() => close_modal('reply')}
          on_submit={add_reply}
          styles={styles}
        />
      )}
      
      {modal_state.delete && (
        <DeleteModal
          content={content}
          enquiry={selected_enquiry}
          on_close={() => close_modal('delete')}
          on_confirm={delete_enquiry}
          styles={styles}
        />
      )}
      
      {modal_state.create && (
        <CreateModal
          content={content}
          on_close={() => close_modal('create')}
          onCreate={create_enquiry}
          styles={styles}
        />
      )}
    </div>
  )
}

export default EnquiryManagement