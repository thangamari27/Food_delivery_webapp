import React from 'react'
import CountdownTimer from './ActiveOfferUI/CountdownTimer'
import { offerContent, offerConfig } from '@/utils/constant/admin/HomeConstant'
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