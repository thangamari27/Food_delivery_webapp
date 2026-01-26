import VerifyEmailNoticeSection from "@/components/emailverification/VerifyEmailNoticeSection"
import PageLoaderWrapper from "@/components/common/PageLoaderWrapper"

function VerifyEmailNoticePage() {
  return (
    <PageLoaderWrapper>
      <main>
        <VerifyEmailNoticeSection />
      </main>
    </PageLoaderWrapper>
  )
}

export default VerifyEmailNoticePage