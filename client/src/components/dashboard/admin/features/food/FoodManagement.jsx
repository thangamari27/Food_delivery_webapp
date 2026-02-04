import React from 'react';
import { Plus } from 'lucide-react';
import { foodContent } from '../../../../../utils/constant/admin/AdminDashboard';
import { foodStyles } from '../../../../../utils/styles/AdminStyle';
import { useFoodManagement } from '../../../../../hooks/admin/useFoodManagement';

import Button from './ui/Button';
import FoodCard from './ui/FoodCard';
import TableRow from './ui/TableRow';
import Pagination from './ui/Pagination';
import FilterPanel from './ui/FilterPanel';
import EmptyState from './ui/EmptyState';

import AddEditFoodModal from './modal/AddEditFoodModal';
import ViewFoodModal from './modal/ViewFoodModal';
import DeleteFoodModal from './modal/DeleteFoodModal';

import {
  TableSkeletonLoader,
  CardSkeletonLoader
} from '../../../../common/admin/AdminLoader';

function FoodManagement() {
  const content = foodContent;
  const styles = foodStyles;

  const {
    // Data
    foods,
    paginatedFoods,
    
    // State
    loading,
    error,
    searchTerm,
    localFilters,
    sortBy,
    currentPage,
    itemsPerPage,
    totalPages,
    showAddModal,
    showEditModal,
    showViewModal,
    showDeleteModal,
    selectedFood,
    formData,
    formErrors,
    imagePreview,
    hasActiveFilters,
    
    // Setters
    setSearchTerm,
    setLocalFilters,
    setSortBy,
    setCurrentPage,
    setItemsPerPage,
    setShowAddModal,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    setSelectedFood,
    setFormData,
    
    // Actions
    fetchFoods,
    handleAddFood,
    handleEditFood,
    handleDeleteFood,
    openEditModal,
    resetAllFilters,
    resetForm,
    handleImageUpload,
    clearError
  } = useFoodManagement();

  // Extract unique values for filters
  const categories = React.useMemo(() => {
    const cats = new Set();
    foods.forEach(food => {
      if (food.category) cats.add(food.category);
    });
    return Array.from(cats).sort();
  }, [foods]);

  const cuisines = React.useMemo(() => {
    const cui = new Set();
    foods.forEach(food => {
      if (food.cuisine) cui.add(food.cuisine);
    });
    return Array.from(cui).sort();
  }, [foods]);

  // Handle error display
  if (error && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading food items</div>
          <div className="text-gray-600 mb-6">{error}</div>
          <Button onClick={() => { clearError(); fetchFoods(); }} styles={styles}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {content.header.title}
              </h1>
              <p className="text-gray-600 mt-1">
                {content.header.subtitle}
              </p>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)} 
              styles={styles}
              disabled={loading}
            >
              <Plus size={20} />
              {content.header.addButtonText}
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <FilterPanel
            content={content}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            localFilters={localFilters}
            setLocalFilters={setLocalFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
            hasActiveFilters={hasActiveFilters}
            resetAllFilters={resetAllFilters}
            categories={categories}
            cuisines={cuisines}
            styles={styles}
            loading={loading}
          />
        </div>

        {/* Loading State */}
        {loading && foods.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="hidden md:block">
              <TableSkeletonLoader rows={5} columns={7} />
            </div>
            <div className="md:hidden">
              <CardSkeletonLoader count={3} />
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-4 px-2">
              <p className="text-sm text-gray-600">
                Showing {paginatedFoods.length} of {foods.length} food items
                {hasActiveFilters && ' (filtered)'}
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              {foods.length === 0 ? (
                <EmptyState
                  content={content}
                  onReset={resetAllFilters}
                  hasFilters={hasActiveFilters}
                  styles={styles}
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {content.tableHeaders.map(header => (
                          <th
                            key={header.id}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedFoods.map(food => (
                        <TableRow
                          key={food.fid}
                          food={food}
                          onView={(f) => {
                            setSelectedFood(f);
                            setShowViewModal(true);
                          }}
                          onEdit={openEditModal}
                          onDelete={(f) => {
                            setSelectedFood(f);
                            setShowDeleteModal(true);
                          }}
                          styles={styles}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 mb-6">
              {foods.length === 0 ? (
                <EmptyState
                  content={content}
                  onReset={resetAllFilters}
                  hasFilters={hasActiveFilters}
                  styles={styles}
                />
              ) : (
                paginatedFoods.map(food => (
                  <FoodCard
                    key={food.fid}
                    food={food}
                    onView={(f) => {
                      setSelectedFood(f);
                      setShowViewModal(true);
                    }}
                    onEdit={openEditModal}
                    onDelete={(f) => {
                      setSelectedFood(f);
                      setShowDeleteModal(true);
                    }}
                    styles={styles}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {foods.length > 0 && totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  totalItems={foods.length}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                  content={content}
                  styles={styles}
                />
              </div>
            )}
          </>
        )}

        {/* Modals */}
        <AddEditFoodModal
          content={content}
          isOpen={showAddModal || showEditModal}
          onClose={() => {
            if (showAddModal) setShowAddModal(false);
            if (showEditModal) setShowEditModal(false);
            resetForm();
          }}
          isEdit={showEditModal}
          formData={formData}
          formErrors={formErrors}
          imagePreview={imagePreview}
          setFormData={setFormData}
          handleImageUpload={handleImageUpload}
          handleSubmit={showEditModal ? handleEditFood : handleAddFood}
          styles={styles}
        />

        <ViewFoodModal
          content={content}
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedFood(null);
          }}
          food={selectedFood}
          onEdit={openEditModal}
          styles={styles}
        />

        <DeleteFoodModal
          content={content}
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedFood(null);
          }}
          food={selectedFood}
          onDelete={handleDeleteFood}
          styles={styles}
        />
      </div>
    </div>
  );
}

export default FoodManagement;