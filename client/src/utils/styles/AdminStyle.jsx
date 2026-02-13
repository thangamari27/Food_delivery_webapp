
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
  userButton: "cursor-pointer flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-1 py-1 md:px-5 md:py-3 rounded-full ml-4 hover:shadow-lg transition-all",
  userName: "text-sm font-medium hidden md:block",
  userAvatar: "w-7 h-7 p-1 text-orange-500 rounded-full bg-white overflow-hidden ",
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
  submenuItem: (active) => `block text-sm mt-2 border-b-2 border-gray-300 py-2 px-4 rounded-lg transition-colors cursor-pointer ${
    active ? 'text-orange-600 font-medium' : 'text-gray-700 hover:text-gray-700 hover:bg-gray-50'
  }`,
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
  button: 'px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all',
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

// Food page styles
export const foodStyles = {
  // Theme
  theme: {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white',
    primaryText: 'text-orange-600',
    primaryBorder: 'border-orange-600',
    primaryRing: 'focus:ring-orange-500 focus:ring-2',
  },

  // Layout
  container: 'mt-20 min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8',
  maxWidth: 'max-w-7xl mx-auto',

  // Header
  header: {
    section: 'mb-6',
    wrapper: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4',
    title: 'text-2xl sm:text-3xl font-bold text-gray-900',
    subtitle: 'text-gray-600 mt-1 text-sm sm:text-base'
  },

  // Buttons
  buttons: {
    primary: 'bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50',
    secondary: 'flex items-center gap-2 h-11 bg-white border border-gray-300 hover:bg-gray-50 px-4 rounded-lg transition-colors',
    danger: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2',
    ghost: 'hover:bg-gray-100 p-2 rounded-lg transition-colors'
  },

  // Inputs
  inputs: {
    base: 'w-full h-11 pl-10 pr-4 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none',
    error: 'border-red-500',
    normal: 'border-gray-300',
    search: 'w-full pl-10 pr-6 h-11 border border-gray-400 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none'
  },

  // Badges
  badges: {
    status: {
      Active: 'bg-green-100 text-green-800',
      Inactive: 'bg-gray-100 text-gray-800'
    },
    type: {
      'Special Menu': 'bg-orange-100 text-orange-800',
      'Regular Menu': 'bg-blue-100 text-blue-800'
    },
    base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  },

  // Filter Panel
  filterPanel: {
    container: 'bg-white rounded-lg shadow-sm p-4 mb-6',
    row: 'flex flex-col gap-4 lg:flex-row lg:items-center',
    expanded: 'mt-4 pt-4 border-t border-gray-400 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
    group: 'space-y-2'
  },

  // Table
  table: {
    container: 'bg-white rounded-lg shadow-sm overflow-hidden hidden xl:block',
    wrapper: 'overflow-x-auto',
    base: 'w-full',
    header: 'bg-gray-50 border-b border-gray-300',
    headerCell: 'px-4 sm:px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase',
    row: 'hover:bg-gray-50 transition-colors',
    cell: 'px-4 sm:px-6 py-4 text-sm text-gray-700',
    image: "w-24 h-20 object-cover rounded-lg flex-shrink-0"
  },

  // Mobile Cards
  mobile: {
    container: 'max-w-7xl mx-auto xl:hidden space-y-4',
    card: 'bg-white rounded-lg shadow-sm overflow-hidden',
    cardContent: 'p-4',
    cardGrid: 'grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-300 '
  },

  // Pagination
  pagination: {
    container: 'max-w-7xl mx-auto mt-6 bg-white rounded-lg shadow-sm p-4',
    wrapper: 'flex flex-col sm:flex-row items-center justify-between gap-4',
    select: 'px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none'
  },

  // Modal
  modal: {
    overlay: 'fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50',
    container: 'bg-white rounded-lg max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto',
    header: 'sticky top-0 bg-white border-b border-gray-300 px-4 sm:px-6 py-4 flex items-center justify-between z-10',
    title: 'text-lg sm:text-xl font-bold text-gray-900',
    body: 'p-4 sm:p-6',
    footer: 'sticky bottom-0 bg-gray-50 border-t border-gray-400 px-4 sm:px-6 py-4 flex justify-end gap-3'
  },

  // Form
  form: {
    section: 'space-y-6',
    sectionTitle: 'text-base sm:text-lg font-semibold text-gray-900 mb-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    group: 'space-y-4',
    label: 'block text-sm font-medium text-gray-700 mb-1',
    required: 'text-red-500',
    error: 'mt-1 text-sm text-red-500'
  },

  // Empty State
  emptyState: {
    container: 'bg-white rounded-lg shadow-sm p-8 sm:p-12 text-center',
    icon: 'text-gray-400 mx-auto mb-3',
    message: 'text-gray-500 mb-4',
    button: 'text-orange-600 hover:underline font-medium'
  }
};

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
    'px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2',
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

// Offer page styles
export const offerStyles = {
   buttons: { 
    primary: 'bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg transition-all flex items-center gap-1.5 md:gap-2 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm md:text-base font-medium active:scale-95', 
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 md:px-4 md:py-2.5 rounded-lg transition-all flex items-center gap-1.5 md:gap-2 outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm md:text-base font-medium active:scale-95',
    danger: 'bg-red-500 hover:bg-red-600 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg transition-all outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm md:text-base font-medium active:scale-95',
    success: 'bg-green-500 hover:bg-green-600 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg transition-all flex items-center gap-1.5 md:gap-2 outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm md:text-base font-medium active:scale-95',
    ghost: 'text-gray-600 hover:text-orange-600 transition-all p-1.5 rounded-lg hover:bg-orange-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 text-sm active:scale-95'
  },
  
  badges: { 
    active: 'bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium', 
    draft: 'bg-gray-100 text-gray-800 px-2.5 py-1 rounded-full text-xs font-medium',
    scheduled: 'bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs font-medium',
    expired: 'bg-red-100 text-red-800 px-2.5 py-1 rounded-full text-xs font-medium',
    visible: 'bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-medium',
    hidden: 'bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-medium'
  },
  
  inputs: 'w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm md:text-base placeholder-gray-400',
  cards: 'bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5',
  
  modals: {
    overlay: 'fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 lg:p-6 z-50 backdrop-blur-sm',
    content: 'bg-white rounded-2xl max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto mx-2 md:mx-4 shadow-2xl',
    header: 'flex justify-between items-center p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-2xl',
    body: 'p-4 md:p-6 lg:p-8',
    footer: 'flex flex-col sm:flex-row justify-end gap-3 md:gap-4 p-4 md:p-6 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-2xl'
  },
  
  tables: {
    container: 'overflow-x-auto rounded-lg border border-gray-200',
    header: 'bg-gray-50 px-3 py-3 md:px-4 md:py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider',
    cell: 'px-3 py-3 md:px-4 md:py-4 border-b border-gray-100 text-sm md:text-base whitespace-nowrap',
    row: 'hover:bg-gray-50 transition-all even:bg-gray-50/50',
    empty: 'px-4 py-12 text-center text-gray-500 text-base'
  },
  
  layouts: {
    grid_cols_2: 'grid grid-cols-2 gap-3 md:gap-4',
    grid_cols_1_md_2: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
    grid_cols_2_md_4: 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6',
    flex_col_md_row: 'flex flex-col md:flex-row',
    flex_center: 'flex items-center justify-center',
    container: 'max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'
  },
  
  spacing: {
    section: 'mb-6 md:mb-8 lg:mb-10',
    element: 'mb-4 md:mb-5'
  }
}

// Restaurant page styles
export const restaurantStyles = {
  status: {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  },
  buttons: {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white outline-none',
    secondary: 'border border-gray-300 hover:bg-gray-100 outline-none',
    danger: 'bg-red-500 hover:bg-red-600 text-white outline-none',
    success: 'bg-green-500 hover:bg-green-600 text-white outline-none',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50'
  },
  inputs: {
    base: 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none',
    valid: 'border-gray-300',
    invalid: 'border-red-500',
    textarea: 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 resize-none'
  },
  tags: {
    selected: 'bg-orange-500 text-white border-orange-500',
    unselected: 'bg-white text-gray-700 border-gray-300 hover:border-orange-500',
    base: 'px-4 py-2 rounded-lg border transition-colors'
  },
  table: {
    header: 'px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase',
    cell: 'px-6 py-4 text-sm',
    rowHover: 'hover:bg-gray-50'
  },
  modals: {
    overlay: 'fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50',
    content: 'bg-white rounded-lg w-full max-w-3xl my-8',
    header: 'flex items-center justify-between p-6 border-b border-gray-300',
    headerTitle: "text-2xl font-bold",
    closeBtn: "text-gray-400 hover:text-gray-600",
    closeIcon: "w-4 h-4",
    body: 'max-h-[70vh] overflow-y-auto',
    footer: 'border-t border-t-gray-300 bg-gray-50'
  },
  emptyState: {
    container: "bg-white rounded-lg shadow-sm p-12 text-center",
    searchContainer: "w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
    searchIcon: "text-gray-400",
    title: "text-xl font-semibold text-gray-900 mb-2",
    description: "text-gray-600",
  }
};

// Restaurant booking page styles
export const bookingStyles = {
  // Button styles
  buttons: {
    primary: 'px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center gap-2',
    secondary: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2',
    danger: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2',
    success: 'px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2',
    ghost: 'px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5',
    icon: 'p-2 hover:bg-gray-100 rounded-lg transition-colors',
    
    // Pagination button variants
    pagination_default: 'p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50',
    pagination_disabled: 'p-2 rounded-lg border border-gray-200 text-gray-400 cursor-not-allowed',
    pagination_active: 'px-3 py-1.5 rounded-lg border bg-orange-500 text-white border-orange-500 text-sm font-medium',
    pagination_inactive: 'px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium'
  },

  // Badge styles
  badges: {
    pending: 'px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium',
    confirmed: 'px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium',
    completed: 'px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium',
    cancelled: 'px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium'
  },

  // Card styles
  cards: {
    base: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4',
    hover: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer',
    stat: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-orange-300 transition-colors cursor-pointer',
    stat_active: 'border-orange-500 ring-2 ring-orange-200'
  },

  // Stat card colors
  stat_colors: {
    total: { color: 'text-gray-900', bgColor: 'bg-gray-50' },
    pending: { color: 'text-yellow-700', bgColor: 'bg-yellow-50' },
    confirmed: { color: 'text-orange-700', bgColor: 'bg-orange-50' },
    completed: { color: 'text-green-700', bgColor: 'bg-green-50' },
    cancelled: { color: 'text-red-700', bgColor: 'bg-red-50' }
  },

  // Modal action colors
  modal_colors: {
    confirm: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600' },
    complete: { bg: 'bg-green-600', hover: 'hover:bg-green-700' },
    cancel: { bg: 'bg-red-600', hover: 'hover:bg-red-700' }
  },

  // Input styles
  inputs: {
    base: 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent',
    search: 'w-full pl-9 sm:pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent',
    select: 'px-3 sm:px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent',
    textarea: 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none'
  },

  // Layout styles
  layout: {
    page: 'mt-20 min-h-screen bg-gray-50',
    header: 'bg-white border-b border-gray-200 px-4 sm:px-6 py-4',
    stats_grid: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-6',
    filters_container: 'm-5 bg-white border rounded border-gray-200 px-4 sm:px-6 py-4',
    content_container: 'px-4 sm:px-6 pb-6',
    
    // Drawer styles
    drawer_overlay: 'fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 z-40 xl:hidden',
    drawer_container: 'fixed top-0 right-0 h-full bg-white shadow-xl z-50 overflow-y-auto w-full sm:w-96 xl:w-1/3 transform transition-transform duration-300',
    drawer_header: 'sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between z-10',
    drawer_content: 'p-4 sm:p-6 space-y-6',
    
    // Modal styles
    modal_overlay: 'fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4',
    modal_container: 'bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6',
    
    // Empty state styles
    empty_state_container: 'flex flex-col items-center justify-center py-12 sm:py-16 px-4',
    empty_state_icon: 'w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4',
    
    // Table styles
    table_container: 'hidden xl:block overflow-x-auto',
    table_header: 'px-2 py-5 bg-gray-50 border-b border-gray-200',
    table_row: ' px-2 py-3 hover:bg-gray-50 transition-colors',
    table_cell: 'px-4 py-3 whitespace-nowrap',
    
    // Mobile cards grid
    mobile_cards: 'xl:hidden space-y-3 sm:space-y-4 p-4',
    
    // Pagination container
    pagination_container: 'flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-white',
    pagination_text: 'text-sm text-gray-600',
    pagination_controls: 'flex items-center gap-2'
  },

  // Text styles
  text: {
    heading: {
      h1: 'text-xl sm:text-2xl font-bold text-gray-900',
      h2: 'text-lg sm:text-xl font-bold text-gray-900',
      h3: 'text-base sm:text-lg font-semibold text-gray-900',
      h4: 'text-sm font-semibold text-gray-900'
    },
    body: {
      subtitle: 'text-sm sm:text-base text-gray-600 mt-1',
      regular: 'text-sm text-gray-900',
      muted: 'text-sm text-gray-500',
      small: 'text-xs sm:text-sm',
      small_muted: 'text-xs text-gray-500'
    },
    label: {
      regular: 'block text-sm font-medium text-gray-700 mb-1',
      table_header: 'px-2 py-5 text-xs font-medium text-gray-500 uppercase tracking-wider'
    }
  },

  // Special request styles
  special_requests: {
    container: 'mb-3 p-2 bg-orange-50 rounded text-sm text-gray-700',
    tooltip: 'hidden group-hover:block absolute left-0 top-6 bg-gray-900 text-white text-xs rounded p-2 w-64 z-10'
  },

  // Feature/badge styles
  features: {
    feature_badge: 'px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs',
    restaurant_badge: 'px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium'
  },

  // Icon colors
  icon_colors: {
    special_request: 'text-orange-600',
    check_circle: 'text-green-600 hover:text-green-700',
    x_circle: 'text-red-600 hover:text-red-700',
    orange: 'text-orange-600 hover:text-orange-700',
    yellow: 'text-yellow-500 fill-yellow-500',
    gray: 'text-gray-400'
  },

  // Border/divider styles
  borders: {
    section: 'border-t border-gray-200',
    card_divider: 'pt-3 border-t border-gray-200',
    filter_divider: 'mt-4 pt-4 border-t border-gray-200'
  },

  // Image styles
  images: {
    restaurant: 'w-full h-48 object-cover rounded-lg',
    stat_icon: 'w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2 sm:mb-3'
  }
};

// Customer page styles
export const customerStyles = {
  layout: {
    container: 'mt-21 min-h-screen bg-gray-50',
    main: ' max-w-7xl mx-auto'
  },
  header: {
    container: 'mx-6 border-1 bg-white border-b border-gray-200 shadow-sm',
    content: 'max-w-7xl px-4 sm:px-6 py-6',
    top: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3',
    titleGroup: 'flex-1',
    title: 'text-2xl font-semibold text-gray-900',
    subtitle: 'text-sm text-gray-600 mt-1',
    actions: 'flex items-center gap-2'
  },
  stats: {
    container: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-6 py-6',
    card: 'bg-white py-8 px-5 rounded-lg border border-orange-200 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer',
    content: 'flex items-center justify-between',
    textGroup: 'flex-1',
    label: 'text-sm font-medium text-gray-600 mb-1',
    value: 'text-3xl font-bold text-gray-900',
    iconWrapper: 'p-3 rounded-full'
  },
  filters: {
    container: 'mx-6 bg-white border-1 border-orange-200 px-4 sm:px-6 py-4 rounded-lg',
    searchRow: 'flex items-center gap-3 mb-4',
    searchWrapper: 'flex-1 relative',
    searchIcon: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400',
    search: 'w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
    filterButton: 'flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors',
    filterBadge: 'ml-1 px-2 py-0.5 bg-orange-600 text-white text-xs rounded-full',
    panel: 'grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    select: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
  },
  table: {
    container: 'px-4 sm:px-6 py-4',
    wrapper: 'bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm',
    scroll: 'overflow-x-auto',
    table: 'w-full min-w-[800px]',
    thead: 'bg-gray-50 border-b border-gray-200',
    th: 'px-4 py-5 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider',
    tbody: 'divide-y divide-gray-100',
    tr: 'hover:bg-gray-50 transition-colors cursor-pointer',
    td: 'px-4 py-4 text-sm text-gray-900',
    tdName: 'font-medium text-gray-900',
    tdEmail: 'text-gray-600',
    tdId: 'text-xs text-gray-500 mt-1',
    actions: 'flex items-center gap-2'
  },
  card: {
    container: 'px-4 sm:px-6 py-4 space-y-3',
    card: 'bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer',
    header: 'flex items-start justify-between mb-3',
    name: 'font-semibold text-gray-900',
    id: 'text-xs text-gray-500',
    grid: 'grid grid-cols-2 gap-3 mb-3',
    label: 'text-xs text-gray-500',
    value: 'text-sm font-medium text-gray-900 truncate',
    footer: 'flex items-center justify-between pt-3 border-t border-gray-100'
  },
  badge: {
    base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    active: 'bg-green-100 text-green-800',
    blocked: 'bg-red-100 text-red-800',
    inactive: 'bg-gray-100 text-gray-800'
  },
  button: {
    primary: 'px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium',
    danger: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium',
    icon: 'p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900',
    iconDanger: 'p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600'
  },
  modal: {
    overlay: 'fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4',
    container: 'bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl',
    header: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10',
    title: 'text-xl font-semibold text-gray-900',
    body: 'px-6 py-6',
    footer: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white'
  },
  form: {
    section: 'mb-6',
    sectionTitle: 'text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200',
    group: 'mb-4',
    label: 'block text-sm font-medium text-gray-700 mb-1.5',
    required: 'text-red-500 ml-1',
    input: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent',
    textarea: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-24 resize-y',
    grid2: 'grid grid-cols-1 md:grid-cols-2 gap-4'
  },
  pagination: {
    container: 'bg-white border-t border-gray-200 px-4 sm:px-6 py-3',
    content: 'flex flex-col sm:flex-row items-center justify-between gap-3',
    info: 'text-sm text-gray-700',
    controls: 'flex items-center gap-4',
    select: 'px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500',
    navButtons: 'flex items-center gap-2',
    navButton: 'p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
  },
  empty: {
    container: 'flex flex-col items-center justify-center py-16 px-6',
    icon: 'w-20 h-20 text-gray-300 mb-4',
    title: 'text-xl font-semibold text-gray-900 mb-2',
    description: 'text-gray-600 mb-6 text-center'
  },
  toast: {
    container: 'fixed top-4 right-4 z-50 animate-slide-in',
    success: 'bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2',
    error: 'bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2'
  }
};

// subscription page styles
export const subscriptionStyles = {
  // Button variants
  button: {
    primary: 'px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center gap-2 outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
    secondary: 'px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2',
    ghost: 'p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2',
    danger: 'px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    success: 'px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  
  // Badge variants
  badge: {
    popular: 'px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold',
    status: {
      active: 'px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold',
      inactive: 'px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold'
    },
    savings: 'px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold',
    count: 'ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full'
  },
  
  // Table styles
  table: {
    container: 'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
    header: 'px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider bg-gray-50',
    cell: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900',
    row: 'hover:bg-gray-50 transition-colors border-b border-gray-200'
  },
  
  // Card styles
  card: {
    container: 'bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow',
    header: 'flex items-center justify-between mb-4',
    title: 'text-lg font-semibold text-gray-900',
    content: 'space-y-4',
    divider: 'py-4 border-y border-gray-200'
  },
  
  // Input styles
  input: {
    text: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-shadow',
    textarea: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none outline-none transition-shadow',
    checkbox: 'w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500',
    radio: 'w-4 h-4 text-orange-600 focus:ring-2 focus:ring-orange-500',
    currency: 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-shadow'
  },
  
  // Modal styles
  modal: {
    backdrop: 'fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4',
    container: 'bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col',
    header: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between',
    body: 'flex-1 overflow-y-auto px-6 py-6',
    footer: 'px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3',
    confirmation: 'bg-white rounded-xl shadow-2xl max-w-md w-full p-6'
  },
  
  // Layout styles
  layout: {
    container: 'min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8',
    content: 'mt-20 max-w-7xl mx-auto',
    grid: 'grid gap-4',
    flex: {
      row: 'flex items-center gap-2',
      col: 'flex flex-col gap-4',
      between: 'flex items-center justify-between',
      start: 'flex items-start gap-2'
    }
  },
  
  // Tab styles
  tab: {
    container: 'border-b border-gray-200',
    nav: 'flex gap-1 overflow-x-auto',
    button: {
      active: 'px-6 py-3 font-medium text-sm border-b-2 border-orange-600 text-orange-600',
      inactive: 'px-6 py-3 font-medium text-sm text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
    }
  },
  
  // Typography styles
  typography: {
    heading_1: 'text-3xl font-bold text-gray-900',
    heading_2: 'text-xl font-bold text-gray-900',
    heading_3: 'text-lg font-semibold text-gray-900',
    body: 'text-gray-600',
    body_small: 'text-sm text-gray-600',
    body_xsmall: 'text-xs text-gray-500',
    price: 'text-3xl font-bold text-gray-900',
    price_small: 'font-semibold text-gray-900'
  },
  
  // Icon styles
  icon: {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-orange-600',
    info: 'text-gray-600'
  },
  
  // Feature list styles
  feature_list: {
    container: 'space-y-2',
    item: 'flex items-start gap-2 text-sm text-gray-700'
  },
  
  // Form styles
  form: {
    grid_2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    preview: 'bg-gray-50 rounded-lg p-4 border border-gray-200',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    field: 'space-y-6',
    group: 'flex gap-4'
  },
  
  // Utility classes
  utility: {
    empty_state: 'bg-white rounded-lg border border-gray-200 p-12 text-center',
    price_container: 'flex items-baseline gap-2',
    currency_symbol: 'flex items-center gap-1',
    action_buttons: 'grid grid-cols-2 gap-2 pt-4'
  }
};

// Enquiry page styles
export const enquiryStyles = {
  // Layout styles
  container: 'mt-20 min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 max-w-[1440px] mx-auto',
  
  // Header styles
  header_section: 'mb-8',
  header_wrapper: 'flex justify-between items-center flex-wrap gap-4 mb-6',
  header_title: 'mb-2 text-3xl md:text-4xl font-bold text-gray-800',
  header_subtitle: 'text-sm text-gray-500',

  // Stats section styles
  stats_grid: 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6',
  stat_card: 'bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-5 hover:scale-105 cursor-pointer',
  stat_wrapper: 'flex items-start justify-between',
  icon_wrapper: 'w-12 h-12 rounded-full flex items-center justify-center',
  stat_icon: 'w-6 h-6 text-white',
  stat_value: 'text-3xl font-bold text-gray-800',
  stat_label: 'mt-5 text-sm text-gray-500 mt-1',

  // Action bar styles
  action_bar: 'bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6',
  action_bar_inner: 'flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4',
  search_wrapper: 'relative flex-1',
  search_input: 'w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white',
  search_icon: 'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400',
  clear_search_icon: 'absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600',
  action_buttons: 'flex gap-2 flex-wrap',

  // Button styles
  button_primary: 'px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-2',
  button_secondary: 'px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all flex items-center gap-2',
  button_danger: 'px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-all flex items-center gap-2',
  button_icon: 'w-4 h-4',

  // Filter panel styles
  filter_panel: 'bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6',
  filter_header: 'flex items-center justify-between mb-4',
  filter_title: 'text-lg font-semibold text-gray-800',
  filter_grid: 'grid grid-cols-1 md:grid-cols-3 gap-4',
  filter_group: 'space-y-2',
  filter_label: 'text-sm font-medium text-gray-700',
  filter_select: 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400',

  // Table styles
  table_card: 'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hidden xl:block',
  table_wrapper: 'overflow-x-auto',
  table: 'w-full',
  table_head: 'bg-gray-50 border-b border-gray-200',
  table_header_cell: 'px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
  table_row: 'border-b border-gray-100 hover:bg-gray-50 transition-colors',
  table_row_highlight: 'border-b border-gray-100 bg-blue-50 hover:bg-blue-100 transition-colors',
  table_cell: 'px-6 py-4 text-sm text-gray-700',

  // Badge styles
  status_badge: 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
  status_icon: 'w-3.5 h-3.5',

  // Action icons styles
  action_icons: 'flex items-center gap-2',
  icon_button: 'p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer',
  icon_button_view: 'text-blue-500 hover:text-blue-600',
  icon_button_edit: 'text-green-500 hover:text-green-600',
  icon_button_resolve: 'text-orange-500 hover:text-orange-600',
  icon_button_delete: 'text-red-500 hover:text-red-600',
  action_icon: 'w-4 h-4',

  // Mobile card styles
  mobile_card: 'grid grid-cols-1 md:grid-cols-2 gap-4 xl:hidden mb-6',
  mobile_card_wrapper: 'bg-white border border-gray-200 rounded-2xl shadow-sm p-4',
  mobile_card_header: 'flex justify-between items-start mb-3 pb-3 border-b border-gray-100',
  mobile_card_body: 'space-y-2 mb-3',
  mobile_card_row: 'flex justify-between text-sm',
  mobile_card_label: 'text-gray-500',
  mobile_card_value: 'font-medium text-gray-800',
  mobile_card_actions: 'flex justify-end gap-2 pt-3 border-t border-gray-100',

  // Pagination styles
  pagination_wrapper: 'px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4',
  pagination_info: 'text-sm text-gray-600',
  pagination_controls: 'flex items-center gap-2',
  pagination_button: 'px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed',
  pagination_button_active: 'px-3 py-1.5 border border-orange-400 bg-orange-50 text-orange-600 rounded-lg text-sm font-medium',
  pagination_select: 'px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400',

  // Modal styles
  modal_overlay: 'fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4',
  modal_container: 'bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col',
  modal_header: 'px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600',
  modal_title: 'text-xl font-bold text-white',
  modal_close_button: 'p-2 hover:bg-white/20 rounded-lg transition-colors',
  modal_close_icon: 'w-5 h-5 text-white',
  modal_body: 'px-6 py-6 overflow-y-auto',
  modal_footer: 'px-6 py-4 border-t border-gray-200 flex justify-end gap-3',

  // Form styles
  form_grid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  form_group: 'space-y-2',
  form_group_full: 'space-y-2 md:col-span-2',
  form_label: 'text-sm font-medium text-gray-700',
  form_input: 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400',
  form_select: 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400',
  form_textarea: 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400',

  // Empty state styles
  empty_state: 'py-16 text-center',
  empty_state_icon: 'w-16 h-16 mx-auto mb-4 text-gray-400',
  empty_state_title: 'text-xl font-semibold text-gray-800 mb-2',
  empty_state_message: 'text-sm text-gray-500',

  // Loading styles
  loading_overlay: 'absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10',
  spinner: 'w-8 h-8 border-4 border-gray-200 border-t-orange-400 rounded-full animate-spin',

  // Info card styles
  info_card: 'bg-gray-50 rounded-xl p-4',
  info_card_title: 'text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2',
  info_card_content: 'space-y-3',
  info_card_field: 'space-y-1',
  info_card_label: 'text-xs text-gray-500 mb-1',
  info_card_value: 'text-sm font-medium text-gray-900'
};
