import { subscriptionContent, modalTypes, planStatus } from "../../../../../utils/constant/admin/AdminDashboard"
import { subscriptionStyles } from "../../../../../utils/styles/AdminStyle"
import { useSubscriptionManagement } from "../../../../../hooks/admin/useSubscriptionManagement"
import SubscriptionHeader from "./SubscriptionHeader"
import BillingPeriodTabs from "./BillingPeriodTabs"
import SubscriptionPlanCard from "./SubscriptionPlanCard"
import SubscriptionPlanTable from "./SubscriptionPlanTable"
import ComparisonTable from "./ComparisonTable"
import PlanModal from "./PlanModal"
import ConfirmationModal from "./ConfirmationModal"

function SubscriptionManagement() {
  const content = subscriptionContent;
  const styles = subscriptionStyles;

  const {
    pricingData,
    activePeriod,
    modalState,
    confirmModal,
    currentPlans,
    planCounts,
    totalPlans,
    handlePeriodChange,
    handleCreateNew,
    handleRefresh,
    handleView,
    handleEdit,
    handleToggleStatus,
    handleDelete,
    handleModalClose,
    handleModalSave,
    handleConfirmAction,
    handleCancelConfirm,
    handleUpdateComparison
  } = useSubscriptionManagement({subscriptionContent, modalTypes});
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mt-20 max-w-7xl mx-auto">
        <SubscriptionHeader 
          content={content}
          onCreateNew={handleCreateNew}
          onRefresh={handleRefresh}
          totalPlans={totalPlans}
          styles={styles}
        />

        <BillingPeriodTabs
          content={content}
          periods={pricingData.periods}
          activePeriod={activePeriod}
          onPeriodChange={handlePeriodChange}
          planCounts={planCounts}
          styles={styles}
        />

        <SubscriptionPlanTable
          content={content}
          plans={currentPlans}
          onView={handleView}
          onEdit={handleEdit}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
          styles={styles}
        />

        <div className="xl:hidden grid gap-4 mt-6">
          {currentPlans.map((plan) => (
            <SubscriptionPlanCard
              content={content}
              key={plan.id}
              plan={plan}
              onView={handleView}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              styles={styles}
            />
          ))}
        </div>

        <ComparisonTable
          content={content}
          comparisonData={pricingData.comparison}
          onUpdateComparison={handleUpdateComparison}
          styles={styles}
        />

        <PlanModal
          content={content}
          modalTypes={modalTypes}
          planStatus={planStatus}
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          plan={modalState.plan}
          activePeriod={activePeriod}
          onClose={handleModalClose}
          onSave={handleModalSave}
          styles={styles}
        />

        <ConfirmationModal
          content={content}
          isOpen={confirmModal.isOpen}
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={handleConfirmAction}
          onCancel={handleCancelConfirm}
          type={confirmModal.action === 'delete' ? 'danger' : 'primary'}
          styles={styles}
        />
      </div>
    </div>
  )
}

export default SubscriptionManagement