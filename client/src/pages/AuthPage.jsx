import AuthSection from "@/components/auth/AuthSection"
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper"

function AuthPage() {
  return (
    <PageLoaderWrapper>
      <main>
          <AuthSection />
      </main>
    </PageLoaderWrapper>
  )
}

export default AuthPage