import React from 'react'
import { IndianRupee } from 'lucide-react'
import Title from './Title'
import Paragraph from './Paragraph'
import ButtonClick from './ButtonClick'
import Image from './Image'

function Card({ item, cardStyles, cardType = 'default' }) {
  return (
    <div className={cardStyles.wrapper}>
      {/* Image Container */}
      {item.image && (
        <div className={cardStyles.imageContainer}>
          <Image
            src={item.image.src}
            srcFallback={item.image.srcFallback}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            imageStyle={item.image.imageStyle}
            pictureStyle={item.image.pictureStyle} 
          />
        </div>
      )}

      {/* Content Container */}
      <div className={cardStyles.contentContainer}>
        {/* Title */}
        {item.title && (
          <Title 
            title={item.title.title} 
            titleStyle={item.title.titleStyle} 
          />
        )}

        {/* Description */}
        {item.description && (
          <Paragraph
            paragraph={item.description.description}
            paragraphStyle={item.description.descriptionStyle}
          />
        )}

        {/* Optional: Price (for food items) */}
        {item.price && (
          <p className={cardStyles.priceStyle}>
            <IndianRupee />
            {item.price}
          </p>
        )}

        {/* Optional: Rating (for food items) */}
        {item.rating && (
          <div className={cardStyles.ratingContainer}>
            <span className={cardStyles.ratingStyle}>
              ⭐ {item.rating}
            </span>
          </div>
        )}

        {/* Optional: Author (for testimonials) */}
        {item.author && (
          <p className={cardStyles.authorStyle}>
            {item.author}
          </p>
        )}

        {/* Button/CTA */}
        {item.button && (
          <ButtonClick
            text={item.button.text}
            onClick={item.button.onClick}
            buttonStyle={item.button.style}
          />
        )}
      </div>
    </div>
  )
}

export default Card