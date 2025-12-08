import React from 'react'
import CountdownTimer from './ActiveOfferUI/CountdownTimer'
import { offerConfig, offerContent } from '@/utils/constant/admin/CommonConstant';
import { activeOfferStyles } from '@/utils/styles/Common'

function ActiveOfferSection() {
  const styles = activeOfferStyles;
  return (
    <>
      <CountdownTimer offerContent={offerContent} offerConfig={offerConfig} styles={styles.countdownTimer} />
    </>
  )
}

export default ActiveOfferSection