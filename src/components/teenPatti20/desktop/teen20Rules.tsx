
import { tprules } from "../../../assets/images";
const Teen20Rules = () => {
  return (
    <div className="rules-section">
      <ul>
        <li>
          The game is played with a regular 52 cards single deck, between 2
          players A and B.
        </li>
        <li>Each player will receive 3 cards.</li>
        <li>
          <b>Rules of regular teenpatti winner</b>
        </li>
      </ul>
      <div>
        <img src={tprules} alt="Rules" />
      </div>

      <div>
        <h6 className="rules-highlight">Rules of 3 Baccarat</h6>
        <p>There are 3 criteria for winning the 3 Baccarat:</p>

        <h6 className="rules-highlight">First Criteria:</h6>
        <p>
          The game having a trio will win. If both games have a trio, the higher
          trio wins.
          <br />
          Ranking of trio from high to low:
        </p>
        <ul>
          <li>1,1,1</li>
          <li>K,K,K</li>
          <li>Q,Q,Q</li>
          <li>J,J,J</li>
          <li>10,10,10</li>
          <li>9,9,9</li>
          <li>8,8,8</li>
          <li>7,7,7</li>
          <li>6,6,6</li>
          <li>5,5,5</li>
          <li>4,4,4</li>
          <li>3,3,3</li>
          <li>2,2,2</li>
        </ul>

        <p>If neither game has a trio, the second criteria will apply.</p>

        <h6 className="rules-highlight">Second Criteria:</h6>
        <p>
          The game having all three face cards (Jack, Queen, and King) will win.
          If both games have all three face cards, the game with the highest
          face card wins.
          <br />
          Ranking of face cards from high to low:
        </p>
        <ul>
          <li>Spade King</li>
          <li>Heart King</li>
          <li>Club King</li>
          <li>Diamond King</li>
        </ul>

        <p>
          The same order applies for Queen (Q) and Jack (J). If the second
          criteria is also not applicable, the third criteria will apply.
        </p>

        <h6 className="rules-highlight">Third Criteria:</h6>
        <p>
          The game having a higher baccarat value will win. To determine
          baccarat value, add the point values of all three cards.
          <br />
          Point values of the cards:
        </p>
        <ul>
          <li>1 = 1</li>
          <li>2 to 9 = face value</li>
          <li>10, J, Q, K = 0 point</li>
        </ul>

        <p>Examples:</p>
        <ul>
          <li>
            Example 1: 2, 5, 8 = 2+5+8 = 15. The last digit is 5, so the
            baccarat value is 5.
          </li>
          <li>
            Example 2: 1, 3, K = 1+3+0 = 4. The total is a single digit, so the
            baccarat value is 4.
          </li>
        </ul>

        <h6 className="rules-highlight">Tie Conditions:</h6>
        <p>In case of ties, the following conditions apply:</p>

        <ul>
          <li>
            <strong>Condition 1:</strong> The game with more face cards wins.
            <br />
            Example: Game A has 3, 4, K and Game B has 7, J, Q. Game B wins as
            it has more face cards.
          </li>
          <li>
            <strong>Condition 2:</strong> If the number of face cards is equal,
            the game with the higher-value face card wins.
            <br />
            Example: Game A has 4, 5, K (K Spade) and Game B has 9, 10, K (K
            Heart). Both games have the same baccarat value, but Game A wins
            because it has the higher-value face card.
          </li>
          <li>
            <strong>Condition 3:</strong> If no face cards, the game with the
            highest point card wins.
            <br />
            Example: Game A: 1, 6, 10 and Game B: 7, 10, 10. Game B wins because
            it has a higher-value point card (7).
          </li>
          <li>
            <strong>Condition 4:</strong> If point cards are equal, the suit of
            the highest point card determines the winner.
            <br />
            Example: Game A: 1(Heart), 2(Heart), 5(Heart) and Game B: 10(Heart),
            3(Diamond), 5(Spade). Game B wins because the Spade suit ranks
            higher than Heart.
            <br />
            Suit ranking from high to low: Spade, Heart, Club, Diamond.
          </li>
        </ul>

        <h6 className="rules-highlight">Rules of Total:</h6>
        <p>
          This compares the total points of all three cards from both games. If
          the totals are equal, it's a tie, and half the bet amount is returned.
          <br />
          Point values of the cards for total bet:
        </p>
        <ul>
          <li>Ace = 1</li>
          <li>2 to 9 = face value</li>
          <li>10, J, Q, K = 10, 11, 12, 13 respectively</li>
        </ul>

        <h6 className="rules-highlight">Rules of Pair Plus:</h6>
        <p>This bet provides multiple options for winning:</p>
        <ul>
          <li>
            <strong>Pair:</strong> Equal value return on your bet.
          </li>
          <li>
            <strong>Flush:</strong> Four times the bet return for all three
            cards of the same suit.
          </li>
          <li>
            <strong>Straight:</strong> Six times the return for three cards in
            sequence (e.g., 4,5,6 or J,Q,K).
          </li>
          <li>
            <strong>Trio:</strong> Thirty times the return for all three cards
            of the same rank (e.g., 4,4,4 or J,J,J).
          </li>
          <li>
            <strong>Straight Flush:</strong> Forty times the return for three
            cards in sequence of the same suit (e.g., 4,5,6).
          </li>
        </ul>

        <p>
          Note: If you have a trio, you will only receive the prize for the
          trio, not for a pair. Similarly, if you have a straight flush, you
          will only receive the prize for the straight flush, not for a straight
          or flush.
        </p>

        <h6 className="rules-highlight">Rules of Color:</h6>
        <p>
          This is a bet for having more red or black cards. (Heart and Diamond
          are red; Spade and Club are black.)
          <br />
          For side bets, you can place bets on either or both players.
          <br />
          In case of a tie between Player A and Player B, bets placed on Player
          A and Player B (Main Bets) will be returned (Pushed).
        </p>
      </div>
    </div>
  );
};

export default Teen20Rules;
