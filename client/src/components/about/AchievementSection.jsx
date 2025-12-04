import React from 'react'
import { achievementContent } from '@/utils/constant/admin/AboutConstant';
import { achievementStyle } from '@/utils/styles/AboutStyle';
import Title from '@/components/common/Title';
import Paragraph from '@/components/common/Paragraph';

function AchievementSection() {
  const styles = achievementStyle;
  const content = achievementContent.stats;
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <div className={styles.grid}>
                {content.items.map((statsItem) => {
                    const IconCompoent = statsItem.icon;
                    
                    return (
                        <div key={statsItem.id} className={styles.item}>
                            <div className={styles.iconContainer}>
                                <IconCompoent className={styles.icon} />
                            </div>
                            <Paragraph paragraph={statsItem.number} paragraphStyle={styles.number} />
                            <Title title={statsItem.label} titleStyle={styles.label} />
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  )
}

export default AchievementSection