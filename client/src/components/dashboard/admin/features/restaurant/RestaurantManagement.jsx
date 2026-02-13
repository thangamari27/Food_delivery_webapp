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
import { CardSkeletonLoader, TableSkeletonLoader } from '../../../../common/admin/AdminLoader';

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
  loading,
  onSearchSubmit
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <div className="flex flex-col md:flex-row gap-4">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        onSearch={onSearchSubmit}
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

// Main component
function RestaurantManagement() {
  const content = restaurantContent;
  const styles = restaurantStyles;
  
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
    loading,
    error,
    handleSearchSubmit,
    dataLoading,
    handleImageChange,
    imagePreview,
    getCuisineOptions,
  } = useRestaurantManagement(content);

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  const handleEditFromDetails = () => {
    closeDetailsModal();
    openModal('edit', selectedRestaurant);
  };

  // Combined loading state
  const isLoading = loading || dataLoading;
  const hasData = restaurants && restaurants.length > 0;
  const hasFilteredData = filteredRestaurants && filteredRestaurants.length > 0;

  return (
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
          onSearchSubmit={handleSearchSubmit}
          showFilters={showFilters}
          onToggleFilters={handleToggleFilters}
          filters={filters}
          onFilterChange={setFilters}
          content={content}
          cuisineOptions={getCuisineOptions}
          loading={isLoading}
        />

        {!isLoading && hasData && (
          <RestaurantStats 
            totalCount={restaurants.length}
            filteredCount={filteredRestaurants.length}
          />
        )}

        {/* Loading State */}
        {isLoading && !hasData ? (
          <>
            <div className="hidden xl:block bg-white rounded-lg shadow-sm overflow-hidden p-6">
              <TableSkeletonLoader rows={5} columns={6} />
            </div>
            <div className="xl:hidden">
              <CardSkeletonLoader count={3} />
            </div>
          </>
        ) : !hasFilteredData && !isLoading ? (
          <EmptyState content={content.titles} styles={styles.emptyState} />
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden xl:block bg-white rounded-lg shadow-sm overflow-hidden">
              <RestaurantTable
                restaurants={paginatedData}
                sortConfig={sortConfig}
                onSort={handleSort}
                onView={viewDetails}
                onEdit={(restaurant) => openModal('edit', restaurant)}
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
            </div>

            {/* Mobile View */}
            <div className="xl:hidden">
              <RestaurantCards
                restaurants={paginatedData}
                onView={viewDetails}
                onEdit={(restaurant) => openModal('edit', restaurant)}
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
            </div>
          </>
        )}

        {/* Create/Edit Modal */}
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
            onImageChange={handleImageChange}
            imagePreview={imagePreview}
            cuisineOptions={getCuisineOptions}
          />
        </Modal>

        {/* Details Modal */}
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
  );
}

export default RestaurantManagement;