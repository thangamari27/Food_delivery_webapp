import React from 'react'
import Title from '@/components/common/Title'
import Subtitle from '@/components/common/SubTitle'
import Paragraph from '@/components/common/Paragraph'

function ComboHeader({ header, styles}) {
  return (
    <header className={styles.container}>
        <Title title={header.title} titleStyle={styles.title} />
        <Subtitle subTitle={header.subtitle} subTitleStyle={styles.subTitle} />
        <Paragraph paragraph={header.description} paragraphStyle={styles.description} />
    </header>
  )
}

export default ComboHeader