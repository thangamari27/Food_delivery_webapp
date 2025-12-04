import React from "react";
import PopularMenuCarousel from "./popularMenuUI/PopularMenuCarousel";
import PopularMenuHeader from "./popularMenuUI/PopularMenuHeader";
import Button from '@/components/common/Button'
import { popularMenuContent } from '@/utils/constant/admin/HomeConstant'
import { popularMenuStyles } from "@/utils/styles/HomeStyle";

export default function PopularMenuSection() {
  const { popularMenuCard } = popularMenuContent;
  const styles = popularMenuStyles;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* popular menu Header section */}
        <PopularMenuHeader title={popularMenuContent.title} description={popularMenuContent.description} styles={styles.header} />

        {/* Carousel: pass items and speed (seconds per full cycle) */}
        <PopularMenuCarousel items={popularMenuCard} speed={30} styles={styles.menuCarousel} />

        {/* View all popular food menu */}
        <div className={styles.buttonStyle.buttonContainer}>
            <Button 
              buttonText={popularMenuContent.button.buttonText} 
              buttonLink={popularMenuContent.button.buttonLink}
              buttonStyle={styles.buttonStyle.button}
            />
        </div>
      </div>
    </section>
  );
}
