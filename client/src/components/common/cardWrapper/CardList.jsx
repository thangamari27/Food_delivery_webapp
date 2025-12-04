import React from 'react'
import GridWrapper from './GridWrapper'
import Card from '../Card'

function CardList({ items, cardStyles, gridStyles, cardType }) {
  return (
    <GridWrapper gridStyle={gridStyles.gridWrapper}>
      {items.map((item) => (
        <Card
          key={item.id}
          item={item}
          cardStyles={cardStyles}
          cardType={cardType}
        />
      ))}
    </GridWrapper>
  )
}

export default CardList