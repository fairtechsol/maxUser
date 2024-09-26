import React from 'react';

import { cmeterrules } from '../../../assets/images';

const CmeterRules = () => {
  return (
    <div className="rules-section">
      <div>
        <img
          src={cmeterrules}
        
          alt="Rules"
        />
      </div>

      <div>
        <h6 className="rules-highlight">Low Zone:</h6>
        <ul className="pl-4 pr-4 list-style">
          <li>
            The Player who bets on Low Zone will have all cards from Ace to 8 of all suits, plus 3 cards of 9: Heart, Club, and Diamond.
          </li>
        </ul>

        <h6 className="rules-highlight">High Zone:</h6>
        <ul className="pl-4 pr-4 list-style">
          <li>
            The Player who bets on High Zone will have all the cards of J, Q, K of all suits, plus 3 cards of 10: Heart, Club, and Diamond.
          </li>
        </ul>

        <h6 className="rules-highlight">Spade 9 &amp; Spade 10:</h6>
        <ul className="pl-4 pr-4 list-style">
          <li>If you bet on Low Card, Spades of 9 and 10 will be calculated along with High Cards.</li>
          <li>If you bet on High Card, Spades of 9 and 10 will be calculated along with Low Cards.</li>
        </ul>
      </div>
    </div>
  );
};

export default CmeterRules;
