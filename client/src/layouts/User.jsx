import Header from "@/components/global/Header"
import Footer from "@/components/global/Footer"
import { Outlet } from "react-router-dom"

function User() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default User