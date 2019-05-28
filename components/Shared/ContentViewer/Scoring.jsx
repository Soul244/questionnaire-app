import React from 'react';
import Rating from 'react-rating';
import Icon, { emptyScore, filledScore } from '~css/icons';


function Scoring() {
  return (
    <Rating
      initialRating={1}
      emptySymbol={<Icon size={24} icon={emptyScore} />}
      fullSymbol={<Icon size={24} icon={filledScore} />}
      fractions={2}
    />
  );
}

export default Scoring;
