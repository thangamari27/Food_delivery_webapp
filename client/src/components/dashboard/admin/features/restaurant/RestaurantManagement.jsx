import { useMemo } from 'react';
import { Plus, Filter, Edit2 } from 'lucide-react';
import { restaurantContent } from '../../../../../utils/constant/admin/AdminDashboard';
import { restaurantStyles } from '../../../../../utils/styles/AdminStyle';
import { useRestaurantManagement } from '../../../../../hooks/admin/useRestaurantManagement';
import Modal from './Modal';
import EmptyState from './EmptyState';
import RestaurantForm from './RestaurantForm';
import RestaurantTable from './RestaurantTable';
import RestaurantCards from './RestaurantCards';
import RestaurantDetails from './RestaurantDetails';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import RestaurantStats from './RestaurantStats';
import AdminLoader, { CardSkeletonLoader, TableSkeletonLoader, InlineLoader } from '../../../../common/admin/AdminLoader';

// Separate component for PageHeader
const PageHeader = ({ content, onAddClick, loading }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {content.titles.main}
        </h1>
        <p className="text-gray-600 mt-1">
          {content.titles.subtitle}
        </p>
      </div>
      <button
        onClick={onAddClick}
        disabled={loading}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-colors ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
        aria-label="Add new restaurant"
      >
        <Plus size={20} />
        {content.titles.addRestaurant}
      </button>
    </div>
  </div>
);

// Separate component for SearchAndFilter
const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  showFilters, 
  onToggleFilters, 
  filters, 
  onFilterChange,
  content,
  cuisineOptions,
  loading
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div className="flex flex-col md:flex-row gap-4">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={content.titles.searchPlaceholder}
        disabled={loading}
      />
      <button
        onClick={onToggleFilters}
        disabled={loading}
        className={`flex items-center gap-2 px-6 py-3 border rounded-lg ${
          loading 
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-400' 
            : 'border-gray-300 hover:bg-gray-50'
        }`}
        aria-expanded={showFilters}
        aria-label="Toggle filters"
      >
        <Filter size={20} />
        {content.titles.filters}
      </button>
    </div>

    {showFilters && !loading && (
      <FilterPanel
        filters={filters}
        onFilterChange={onFilterChange}
        content={content}
        cuisineOptions={cuisineOptions}
      />
    )}
  </div>
);

// Separate component for DesktopView
const DesktopView = ({
  paginatedData,
  sortConfig,
  handleSort,
  viewDetails,
  openModal,
  handleDelete,
  content,
  styles,
  filteredRestaurants,
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  loading
}) => (
  <div className="hidden xl:block bg-white rounded-lg shadow-sm overflow-hidden">
    {loading ? (
      <div className="p-6">
        <TableSkeletonLoader rows={5} columns={6} />
      </div>
    ) : (
      <>
        <RestaurantTable
          restaurants={paginatedData}
          sortConfig={sortConfig}
          onSort={handleSort}
          onView={viewDetails}
          onEdit={openModal}
          onDelete={handleDelete}
          content={content}
          styles={styles}
        />
        <Pagination
          content={content}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredRestaurants.length}
          itemsPerPage={itemsPerPage}
        />
      </>
    )}
  </div>
);

// Separate component for MobileView
const MobileView = ({
  paginatedData,
  viewDetails,
  openModal,
  handleDelete,
  content,
  filteredRestaurants,
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  loading
}) => (
  <div className="xl:hidden">
    {loading ? (
      <CardSkeletonLoader count={3} />
    ) : (
      <>
        <RestaurantCards
          restaurants={paginatedData}
          onView={viewDetails}
          onEdit={openModal}
          onDelete={handleDelete}
          content={content}
        />
        <Pagination
          content={content}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredRestaurants.length}
          itemsPerPage={itemsPerPage}
        />
      </>
    )}
  </div>
);

// Loading overlay component
const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <AdminLoader loaderName={'Restaurant'} />
  );
};

// Main component
function RestaurantManagement() {
  // ALL HOOKS MUST BE AT THE TOP - UNCONDITIONAL
  const content = restaurantContent;
  const styles = restaurantStyles;
  
  // This hook MUST be called unconditionally on every render
  const {
    restaurants,
    filteredRestaurants,
    paginatedData,
    itemsPerPage,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    sortConfig,
    handleSort,
    showModal,
    modalMode,
    openModal,
    closeModal,
    handleSubmit,
    viewDetailsModal,
    closeDetailsModal,
    viewDetails,
    handleDelete,
    formData,
    setFormData,
    errors,
    setErrors,
    selectedRestaurant,
    setCurrentPage,
    loading: contextLoading,
    error: contextError
  } = useRestaurantManagement(content);

  // Show loading state
  const isLoading = contextLoading || restaurants.length === 0;

  // This hook MUST be called unconditionally on every render
  const cuisineOptions = useMemo(() => {
    if (isLoading) return [];
    
    const cuisines = new Set();
    restaurants.forEach(r => {
      if (r.cuisine && Array.isArray(r.cuisine)) {
        r.cuisine.forEach(c => cuisines.add(c));
      }
    });
    return Array.from(cuisines).sort();
  }, [restaurants, isLoading]); // Dependency must be stable

  // Handler functions - NO HOOKS inside these
  const handleEditFromDetails = () => {
    closeDetailsModal();
    openModal('edit', selectedRestaurant);
  };

  const handleOpenEditModal = (restaurant) => {
    openModal('edit', restaurant);
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  // NO EARLY RETURNS BEFORE THIS POINT
  // All hooks have been called unconditionally

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay loading={isLoading && restaurants.length === 0} />
      
      <div className="mt-20 min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 max-w-[1440px] mx-auto">
        <div className="max-w-7xl mx-auto">
          <PageHeader 
            content={content} 
            onAddClick={() => openModal('create')} 
            loading={isLoading}
          />

          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            showFilters={showFilters}
            onToggleFilters={handleToggleFilters}
            filters={filters}
            onFilterChange={setFilters}
            content={content}
            cuisineOptions={cuisineOptions}
            loading={isLoading}
          />

          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-100 rounded w-1/3"></div>
            </div>
          ) : (
            <RestaurantStats 
              totalCount={restaurants.length}
              filteredCount={filteredRestaurants.length}
            />
          )}

          {/* Conditional rendering of content - NO HOOKS inside */}
          {isLoading ? (
            // Show skeleton loaders while loading
            <>
              <DesktopView
                paginatedData={[]}
                sortConfig={sortConfig}
                handleSort={handleSort}
                viewDetails={viewDetails}
                openModal={handleOpenEditModal}
                handleDelete={handleDelete}
                content={content}
                styles={styles}
                filteredRestaurants={[]}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                loading={true}
              />

              <MobileView
                paginatedData={[]}
                viewDetails={viewDetails}
                openModal={handleOpenEditModal}
                handleDelete={handleDelete}
                content={content}
                filteredRestaurants={[]}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                loading={true}
              />
            </>
          ) : filteredRestaurants.length === 0 ? (
            <EmptyState content={content.titles} styles={styles.emptyState} />
          ) : (
            <>
              <DesktopView
                paginatedData={paginatedData}
                sortConfig={sortConfig}
                handleSort={handleSort}
                viewDetails={viewDetails}
                openModal={handleOpenEditModal}
                handleDelete={handleDelete}
                content={content}
                styles={styles}
                filteredRestaurants={filteredRestaurants}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                loading={false}
              />

              <MobileView
                paginatedData={paginatedData}
                viewDetails={viewDetails}
                openModal={handleOpenEditModal}
                handleDelete={handleDelete}
                content={content}
                filteredRestaurants={filteredRestaurants}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                loading={false}
              />
            </>
          )}

          {/* Modals - rendered conditionally but hooks are already called */}
          <Modal
            isOpen={showModal}
            styles={styles}
            onClose={closeModal}
            title={modalMode === 'create' 
              ? content.titles.newRestaurant 
              : content.titles.editRestaurant}
            footer={
              <div className="flex items-center justify-end gap-4 p-6">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  {content.buttons.cancel}
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                >
                  {modalMode === 'create' 
                    ? content.buttons.add 
                    : content.buttons.update}
                </button>
              </div>
            }
          >
            <RestaurantForm
              content={content}
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              styles={styles}
            />
          </Modal>

          <Modal
            isOpen={viewDetailsModal}
            onClose={closeDetailsModal}
            title={selectedRestaurant?.name || content.titles.restaurantDetails}
            styles={styles}
            footer={
              <div className="flex items-center justify-end gap-4 p-6">
                <button
                  onClick={closeDetailsModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  {content.buttons.close}
                </button>
                <button
                  onClick={handleEditFromDetails}
                  className="flex items-center gap-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                >
                  <Edit2 size={18} />
                  {content.buttons.edit}
                </button>
              </div>
            }
          >
            <RestaurantDetails 
              restaurant={selectedRestaurant} 
              content={content}
            />
          </Modal>
        </div>
      </div>
    </>
  );
}

export default RestaurantManagement;