
// Dashboard page sidebar with Header
export const navigationStyle = {
  container: "min-h-screen bg-gray-50 font-sans",
  header: "bg-white fixed top-0 left-0 lg:left-72 right-0 z-40 border-b border-gray-100",
  headerContent: "flex items-center justify-between px-6 lg:px-8 py-5",
  searchSection: "lg:flex max-w-2xl mx-8 hidden lg:block",
  searchContainer: "relative",
  searchInput: "w-full bg-gray-50 border border-gray-200 rounded-full pl-6 pr-12 py-3 text-sm outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all",
  searchIcon: "w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400",
  navLinks: "hidden xl:flex items-center gap-8",
  headerSidebar: "lg:hidden flex-1 p-2 rounded-lg",
  headerSidebarIcon: "w-6 h-6",
  navLink: (active) => `text-sm font-medium transition-colors ${active ? 'text-orange-600 underline decoration-2 underline-offset-8' : 'text-gray-600 hover:text-gray-900'}`,
  notificationBar: "flex items-center gap-4",
  notificationBox: (color, isAlert) => `relative p-3 rounded-xl transition-all hover:scale-105 ${
    color === 'amber' ? 'bg-gradient-to-br from-amber-50 to-orange-50' : 
    color === 'orange' ? 'bg-orange-50' : 'bg-gray-50'
  }`,
  notificationIcon: (color) => `w-5 h-5 ${
    color === 'amber' ? 'text-amber-600' : 
    color === 'orange' ? 'text-orange-600' : 'text-gray-600'
  }`,
  notificationBadge: (color, isAlert) => `absolute -top-1 -right-1 ${
    isAlert ? 'bg-orange-500 w-5 h-5' : 'bg-amber-500 px-2 py-0.5 min-w-[20px] h-5'
  } text-white text-xs font-semibold rounded-full flex items-center justify-center`,
  userButton: "flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2 py-2 md:px-5 md:py-3 rounded-full ml-4 hover:shadow-lg transition-all",
  userName: "text-sm font-medium hidden md:block",
  userAvatar: "w-7 h-7 md:w-10 md:h-10 text-orange-500 rounded-full bg-white overflow-hidden md:hidden",
  sidebar: (isOpen) => `fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-50 ${isOpen ? 'w-72' : 'w-0 lg:w-72'} overflow-hidden`,
  sidebarHeader: "flex items-center justify-between px-5 py-5 border-b border-gray-100",
  logoSection: "flex items-center gap-3",
  logoIcon: "w-10 h-10 rounded-lg bg-orange-300 flex items-center justify-center text-white text-xl",
  logoText: "text-xl font-bold text-gray-800",
  menuButton: "lg:hidden p-2 rounded-lg transition-colors",
  sidebarContent: "p-6 lg:p-8 space-y-2",
  menuItem: (active) => `flex items-center justify-between px-6 py-4 rounded-xl cursor-pointer transition-all group ${
    active ? 'bg-amber-50 text-amber-600 border-l-4 border-amber-600 -ml-px' : 'text-gray-600 hover:bg-gray-50'
  }`,
  menuItemLeft: "flex items-center gap-4",
  menuIcon: "w-5 h-5",
  menuLabel: "flex items-center gap-3 text-sm font-medium",
  menuBadge: "bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full",
  submenuContainer: "ml-12 mt-2 space-y-1",
  submenuItem: "text-sm text-gray-500 py-2 px-4 hover:text-gray-700 transition-colors cursor-pointer",
  overlay: (isOpen) => `fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`,
}

// Dashboar page styles 
export const dashboardStyles = {
  container: 'mt-20 min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 max-w-[1440px] mx-auto',
  card: 'bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 h-full',
  cardPadding: 'p-6',
  gridGap: 'gap-6',
  heading: 'text-xl font-bold text-gray-800 mb-4',
  headerWrapper: 'flex justify-between items-center mb-6 flex-wrap gap-4',
  button: 'px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all',
  select: 'px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white',
  statCard: 'hover:scale-105 transition-transform duration-200',
  statWrapper: "flex items-start justify-between",
  iconWrapper: 'w-12 h-12 rounded-full flex items-center justify-center',
  trendIndicator: 'flex items-center text-sm font-medium',
  statValue: 'text-3xl font-bold text-gray-800',
  statLabel: 'text-sm text-gray-500 mt-1',
  statIcon: "w-6 h-6 text-white",
  chartContainer: 'relative w-28 h-28 md:w-32 md:h-32',
  chartLabel: 'text-sm text-gray-600 mt-3 font-medium',
  legendWrapper: 'flex items-center justify-center gap-6 mt-12',
  legendItem: 'flex items-center',
  legendBox: 'w-4 h-3 mr-2',
  legendText: 'text-sm text-gray-600',
  donutGrid: 'grid grid-cols-1 sm:grid-cols-3 gap-4 place-items-center',
  gridLayout: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-start',
  grid2Col: 'grid grid-cols-1 xl:grid-cols-2 gap-4 items-stretch',
  graphLine: "w-full max-w-[720px] aspect-video mx-auto",

  headerTitle: 'text-3xl md:text-4xl font-bold text-gray-800',
  headerHighlight: 'ml-2 text-orange-400',
  headerSection: 'mb-8',
  donutChart:{
    container: "flex flex-col items-center",
    percentageContainer: "absolute inset-0 flex items-center justify-center",
    percentText: "text-2xl font-bold text-gray-800",
    percentIcon: "h-4 w-4 inline-block",
  },
}

// Order page styles
export const ordersStyles = {
  /* ================= Main Container ================= */
  container: 'mt-20 min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 max-w-[1440px] mx-auto',

  /* ================= Header ================= */
  headerSection: 'mb-8',
  headerWrapper: 'flex justify-between items-center flex-wrap gap-4 mb-6',
  headerTitle: 'text-3xl md:text-4xl font-bold text-gray-800',
  headerSubtitle: 'text-sm text-gray-500',

  /* ================= Stats Cards ================= */
  statsGrid: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6',
  statCard:
    'bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-5 hover:scale-105',
  statWrapper: 'flex items-start justify-between',
  iconWrapper: 'w-12 h-12 rounded-full flex items-center justify-center',
  statIcon: 'w-6 h-6 text-white',
  statValue: 'text-3xl font-bold text-gray-800',
  statLabel: 'text-sm text-gray-500 mt-1',
  trendIndicator: 'flex items-center text-sm font-medium mt-2',

  /* ================= Action Bar ================= */
  actionBar:
    'bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6',
  actionBarInner:
    'flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4',

  searchWrapper: 'relative flex-1',
  searchInput:
    'w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white',
  searchIcon:
    'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400',
  clearSearchIcon:
    'absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600',

  actionButtons: 'flex gap-2 flex-wrap',

  /* ================= Buttons ================= */
  buttonPrimary:
    'px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2',
  buttonSecondary:
    'px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all flex items-center gap-2',
  buttonDanger:
    'px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all flex items-center gap-2',
  buttonIcon: 'w-4 h-4',

  /* ================= Table ================= */
  tableCard:
    'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hidden xl:block',
  tableWrapper: 'overflow-x-auto',
  table: 'w-full',

  tableHead: 'bg-gray-50 border-b border-gray-200',
  tableHeaderCell:
    'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
  tableHeaderCellSortable:
    'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100',

  tableRow:
    'border-b border-gray-100 hover:bg-gray-50 transition-colors',
  tableRowSelected:
    'border-b border-gray-100 bg-orange-50 hover:bg-orange-100',
  tableCell: 'px-6 py-4 text-sm text-gray-700',
  tableCellCheckbox: 'px-6 py-4',

  checkbox:
    'w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400',

  orderIdLink:
    'text-orange-500 font-semibold hover:text-orange-600 cursor-pointer',
  customerInfo: 'font-medium text-gray-800',

  statusBadge:
    'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
  statusIcon: 'w-3.5 h-3.5',

  /* ================= Row Actions ================= */
  actionIcons: 'flex items-center gap-2',
  iconButton:
    'p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer',
  iconButtonView: 'text-blue-500 hover:text-blue-600',
  iconButtonEdit: 'text-amber-500 hover:text-amber-600',
  iconButtonDelete: 'text-red-500 hover:text-red-600',
  actionIcon: 'w-4 h-4',

  /* ================= Pagination ================= */
  paginationWrapper:
    'px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4',
  paginationInfo: 'text-sm text-gray-600',
  paginationControls: 'flex items-center gap-2',
  paginationButton:
    'px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50',
  paginationButtonActive:
    'px-3 py-1.5 border border-orange-400 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium',
  paginationDropDown: "flex-1 grid grid-cols-2 items-center gap-2",
  paginationDropDownText: "flex items-center gap-4 text-sm text-gray-600",
  paginationText: "flex-2 text-sm text-gray-600",
  paginationSelect: "flex-1 text-sm w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400",
  paginationCount: "flex-1 text-right xl:text-center text-sm text-gray-600",
  /* ================= Modal ================= */
  modalOverlay:
    'fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4',
  modalContainer:
    'bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col',
  modalHeader:
    'px-6 py-4 border-b border-gray-200 flex items-center justify-between',
  modalTitle: 'text-xl font-bold text-gray-800',
  modalCloseButton:
    'p-2 hover:bg-gray-100 rounded-lg transition-colors',
  modalCloseIcon: 'w-5 h-5 text-gray-500',
  modalBody: 'px-6 py-6 overflow-y-auto',
  modalFooter:
    'px-6 py-4 border-t border-gray-200 flex justify-end gap-3',

  /* ================= Form ================= */
  formGrid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  formGroup: 'space-y-2',
  formGroupFull: 'space-y-2 md:col-span-2',
  formLabel: 'text-sm font-medium text-gray-700',
  formInput:
    'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400',
  formSelect:
    'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400',
  formTextarea:
    'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400',
  formError: 'text-xs text-red-500',

  /* ================= Filter ================= */
  filterPanel:
    'bg-white rounded-2xl shadow-sm border border-gray-100 p-4 my-6',
  filterHeader:
    'flex items-center justify-between mb-4',
  filterTitle:
    'text-lg font-semibold text-gray-800',
  filterGrid:
    'grid grid-cols-1 md:grid-cols-3 gap-4',
  filterGroup: 'space-y-2',

  /* ================= Mobile Cards ================= */
  mobileCard:
    'grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden',
  mobileCardWrapper: "bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm p-4 mb-4",
  mobileCardHeader:
    'flex justify-between items-center pb-3 mb-3 border-b border-gray-100',
  mobileCardBody: 'space-y-2',
  mobileCardRow: 'flex justify-between text-sm',
  mobileCardLabel: 'text-gray-500',
  mobileCardValue: 'font-medium text-gray-800',
  mobileCardActions:
    'flex justify-end gap-2 pt-3 mt-3 border-t border-gray-100',

  /* ================= States ================= */
  emptyState: 'py-16 text-center',
  emptyStateTitle: 'text-xl font-semibold text-gray-800',
  emptyStateMessage: 'text-sm text-gray-500',

  loadingOverlay:
    'absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10',
  spinner:
    'w-8 h-8 border-4 border-gray-200 border-t-orange-400 rounded-full animate-spin',
};
