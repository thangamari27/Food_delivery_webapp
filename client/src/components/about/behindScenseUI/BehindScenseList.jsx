import React from 'react'
import Title from '@/components/common/Title';
import Paragraph from '@/components/common/Paragraph';

function BehindScenseList({ deliveryProcess, styles }) {
  return (
    <div className={styles.behindScenseList}>
        {deliveryProcess.map((itemList) => {
            const IconCompoent = itemList.icons;

            return (
                <div key={itemList.id} className={styles.behindScenseItem}>
                    <div className={styles.iconContainer}>
                        <IconCompoent />
                    </div>
                    <div className={styles.behindScenseContainer}>
                        <Title title={itemList.name} titleStyle={styles.behindScenseName} />
                        <Paragraph paragraph={itemList.description} paragraphStyle={styles.behindScenseDescription} />
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default BehindScenseList