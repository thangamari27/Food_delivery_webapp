import PageLoader from "./PageLoader"
import usePageLoader from "@/hooks/usePageLoader"

function PageLoaderWrapper({children}) {
  const loading = usePageLoader();
  if(loading) return <PageLoader />
  
  return (
    <div className="fade-in">
        {children}
    </div>
  )
}

export default PageLoaderWrapper