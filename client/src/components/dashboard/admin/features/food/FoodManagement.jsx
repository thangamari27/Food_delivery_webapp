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

function FoodManagement() {
  const content = foodContent;
  const styles = foodStyles;

  const {
    // State
    filteredFoods,
    searchTerm,
    selectedCategory,
    selectedCuisine,
    selectedType,
    selectedStatus,
    selectedRestaurant,
    sortBy,
    currentPage,
    itemsPerPage,
    showAddModal,
    showEditModal,
    showViewModal,
    showDeleteModal,
    showFilters,
    selectedFood,
    formData,
    formErrors,
    imagePreview,
    paginatedFoods,
    totalPages,
    hasFilters,
    
    // Setters
    setSearchTerm,
    setSelectedCategory,
    setSelectedCuisine,
    setSelectedType,
    setSelectedStatus,
    setSelectedRestaurant,
    setSortBy,
    setCurrentPage,
    setItemsPerPage,
    setShowAddModal,
    setShowEditModal,
    setShowViewModal,
    setShowDeleteModal,
    setShowFilters,
    setSelectedFood,
    setFormData,
    setImagePreview,
    
    // Handlers
    resetFilters,
    handleAddFood,
    handleEditFood,
    handleDeleteFood,
    openEditModal,
    handleImageUpload,
    resetForm
  } = useFoodManagement(content);
  console.log(filteredFoods)
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={`${styles.maxWidth} ${styles.header.section}`}>
        <div className={styles.header.wrapper}>
          <div>
            <h1 className={styles.header.title}>{content.header.title}</h1>
            <p className={styles.header.subtitle}>{content.header.subtitle}</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} styles={styles}>
            <Plus size={20} />
            {content.header.addButtonText}
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className={styles.maxWidth}>
        <FilterPanel
          content={content}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasFilters={hasFilters}
          resetFilters={resetFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCuisine={selectedCuisine}
          setSelectedCuisine={setSelectedCuisine}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
          styles={styles}
        />
      </div>

      {/* Desktop Table */}
      <div className={`${styles.maxWidth} ${styles.table.container}`}>
        <div className={styles.table.wrapper}>
          <table className={styles.table.base}>
            <thead className={styles.table.header}>
              <tr>
                {content.tableHeaders.map(header => (
                  <th
                    key={header.id}
                    className={`${styles.table.headerCell} ${header.width || ''} ${header.id === 'category' ? 'hidden md:table-cell' : ''} ${header.id === 'cuisine' ? 'hidden lg:table-cell' : ''} ${header.id === 'status' ? 'hidden sm:table-cell' : ''} ${header.id === 'type' ? 'hidden xl:table-cell' : ''}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedFoods.length === 0 ? (
                <tr>
                  <td colSpan={content.tableHeaders.length} className="px-6 py-12">
                    <EmptyState content={content} onReset={resetFilters} hasFilters={hasFilters} styles={styles} />
                  </td>
                </tr>
              ) : (
                paginatedFoods.map(food => (
                  <TableRow
                    key={food.id}
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
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className={styles.mobile.container}>
        {paginatedFoods.length === 0 ? (
          <EmptyState content={content} onReset={resetFilters} hasFilters={hasFilters} styles={styles} />
        ) : (
          paginatedFoods.map(food => (
            <FoodCard
              key={food.id}
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
      {filteredFoods.length > 0 && (
        <div className={styles.pagination.container}>
          <Pagination
            content={content}
            current={currentPage}
            total={totalPages}
            perPage={itemsPerPage}
            totalItems={filteredFoods.length}
            onPageChange={setCurrentPage}
            onPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
            styles={styles}
          />
        </div>
      )}

      {/* Modals */}
      <AddEditFoodModal
        content={content}
        isOpen={showAddModal || showEditModal}
        onClose={() => showAddModal ? setShowAddModal(false) : setShowEditModal(false)}
        isEdit={showEditModal}
        formData={formData}
        formErrors={formErrors}
        imagePreview={imagePreview}
        setFormData={setFormData}
        handleImageUpload={handleImageUpload}
        handleSubmit={showEditModal ? handleEditFood : handleAddFood}
        resetForm={resetForm}
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
  )
}

export default FoodManagement