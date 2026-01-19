import { useState, useCallback, useMemo } from 'react';

export const useSubscriptionManagement = ({subscriptionContent, modalTypes }) => {
  const [pricingData, setPricingData] = useState(subscriptionContent);
  const [activePeriod, setActivePeriod] = useState('weekly');
  const [modalState, setModalState] = useState({ 
    isOpen: false, 
    mode: null, 
    plan: null 
  });
  const [confirmModal, setConfirmModal] = useState({ 
    isOpen: false, 
    action: null, 
    plan: null, 
    title: '', 
    message: '' 
  });

  const currentPlans = useMemo(() => {
    return pricingData.plans[activePeriod] || [];
  }, [pricingData, activePeriod]);

  const planCounts = useMemo(() => {
    return {
        weekly: pricingData.plans.weekly?.length || 0,
        monthly: pricingData.plans.monthly?.length || 0,
        yearly: pricingData.plans.yearly?.length || 0
    };
    }, [pricingData]);

  const totalPlans = useMemo(() => {
    return Object.values(planCounts).reduce((sum, count) => sum + count, 0);
  }, [planCounts]);

  const handlePeriodChange = useCallback((period) => {
    setActivePeriod(period);
  }, []);

  const handleCreateNew = useCallback(() => {
    setModalState({ isOpen: true, mode: modalTypes.CREATE, plan: null });
  }, []);

  const handleRefresh = useCallback(() => {
    setPricingData(subscriptionContent);
    console.log('Data refreshed to initial state');
  }, []);

  const handleView = useCallback((plan) => {
    setModalState({ isOpen: true, mode: modalTypes.VIEW, plan });
  }, []);

  const handleEdit = useCallback((plan) => {
    setModalState({ isOpen: true, mode: modalTypes.EDIT, plan });
  }, []);

  const handleToggleStatus = useCallback((plan) => {
    setConfirmModal({
      isOpen: true,
      action: 'toggle',
      plan,
      title: `${plan.status === 'active' ? 'Disable' : 'Enable'} Plan`,
      message: `Are you sure you want to ${plan.status === 'active' ? 'disable' : 'enable'} the ${plan.name} plan?`
    });
  }, []);

  const handleDelete = useCallback((plan) => {
    setConfirmModal({
      isOpen: true,
      action: 'delete',
      plan,
      title: 'Delete Plan',
      message: `Are you sure you want to delete the ${plan.name} plan? This action cannot be undone.`
    });
  }, []);

  const handleModalClose = useCallback(() => {
    setModalState({ isOpen: false, mode: null, plan: null });
  }, []);

  const handleModalSave = useCallback((formData, period) => {
    setPricingData(prev => {
      const updatedPlans = { ...prev.plans };
      const periodPlans = [...updatedPlans[period]];
      
      if (modalState.mode === modalTypes.CREATE) {
        periodPlans.push(formData);
        console.log('Plan created:', formData);
      } else if (modalState.mode === modalTypes.EDIT) {
        const index = periodPlans.findIndex(p => p.id === formData.id);
        if (index !== -1) {
          periodPlans[index] = formData;
          console.log('Plan updated:', formData);
        }
      }
      
      updatedPlans[period] = periodPlans;
      return { ...prev, plans: updatedPlans };
    });
  }, [modalState.mode]);

  const handleConfirmAction = useCallback(() => {
    const { action, plan } = confirmModal;
    
    setPricingData(prev => {
      const updatedPlans = { ...prev.plans };
      let targetPeriod = activePeriod;
      
      Object.keys(updatedPlans).forEach(period => {
        if (updatedPlans[period].some(p => p.id === plan.id)) {
          targetPeriod = period;
        }
      });
      
      const periodPlans = [...updatedPlans[targetPeriod]];
      
      if (action === 'delete') {
        const filteredPlans = periodPlans.filter(p => p.id !== plan.id);
        updatedPlans[targetPeriod] = filteredPlans;
        console.log('Plan deleted:', plan.id);
      } else if (action === 'toggle') {
        const index = periodPlans.findIndex(p => p.id === plan.id);
        if (index !== -1) {
          periodPlans[index] = {
            ...periodPlans[index],
            status: periodPlans[index].status === 'active' ? 'inactive' : 'active'
          };
          updatedPlans[targetPeriod] = periodPlans;
          console.log('Plan status toggled:', plan.id, periodPlans[index].status);
        }
      }
      
      return { ...prev, plans: updatedPlans };
    });
    
    setConfirmModal({ isOpen: false, action: null, plan: null, title: '', message: '' });
  }, [confirmModal, activePeriod]);

  const handleCancelConfirm = useCallback(() => {
    setConfirmModal({ isOpen: false, action: null, plan: null, title: '', message: '' });
  }, []);

  const handleUpdateComparison = useCallback((rowIndex, planType, value) => {
    setPricingData(prev => {
      const updatedComparison = { ...prev.comparison };
      const planData = [...updatedComparison[planType]];
      
      if (value === 'true' || value === 'false') {
        planData[rowIndex] = value === 'true';
      } else {
        planData[rowIndex] = value;
      }
      
      updatedComparison[planType] = planData;
      console.log('Comparison updated:', planType, rowIndex, value);
      
      return { ...prev, comparison: updatedComparison };
    });
  }, []);

  return {
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
    handleUpdateComparison,
    setModalState,
    setConfirmModal
  };
};