import {
  headerNavLinks,
  headerBrandConfig,
  initialCartItems,
  initialOrders,
  initialLikedItems,
  initialBookings,
  profiledropDown
} from '@/utils/constant/admin/GlobalConstant'
import { navbarStyles } from "@/utils/styles/GlobalStyle"
import { useNavbarState, useNavbarEffects } from '@/hooks/useNavbarState'
import Navbar from './headerUI/Navbar'

function Header() {
  const content = {
    headerNavLinks,
    headerBrandConfig,
    initialCartItems,
    initialOrders,
    initialLikedItems,
    initialBookings,
    profiledropDown
  }

  const styles = navbarStyles
  const navbarState = useNavbarState()

  useNavbarEffects(
    navbarState.isProfileOpen,
    navbarState.setIsScrolled,
    navbarState.setIsProfileOpen
  )

  return (
    <Navbar
      content={content}
      styles={styles}
      navbarState={navbarState}
    />
  )
}

export default Header