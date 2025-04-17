import "../../commonStyle.scss";

const Abj2Rules = () => {
  return (
    <div className="rules-section">
      <h6 className="rules-highlight">Rules</h6>
      <ul className="pl-4 pr-4 list-style">
        <li>
          Andar Bahar is a very simple game that involves the use of a single
          pack of cards. The game is played between the House and the Player.
          The dealer deals a single card face up on the Joker place and then
          proceeds to deal cards face up on A (ANDAR) and B (BAHAR) spots. When
          a card appears that matches the value of the Joker card, the game
          ends. Before the start of the game, players bet on which side they
          think the game will end.
        </li>
        <li>
          Before the dealer starts dealing/opening cards from the deck, they
          also offer a side bet to the players who have time to bet if the
          card/joker will be dealt as the 1st card.
        </li>
        <li>
          If the 1st placed card doesn't match the Joker's card, the game
          continues and the dealer offers the option to put a 2nd bet on whether
          the card will be dealt on ANDAR or BAHAR.
        </li>
        <li>
          If the 1st dealt card matches the Joker’s card, Bahar side wins with a
          payout of 1:0.5.
        </li>
        <li>
          If the 1st dealt card matches the Joker’s card, Andar side wins with a
          payout of 1:0.5.
        </li>
        <li>
          If the 2nd dealt card matches the Joker’s card, Bahar side wins with a
          payout of 1:0.5.
        </li>
        <li>
          If the 2nd dealt card matches the Joker’s card, Andar side wins with a
          payout of 1:0.5.
        </li>
      </ul>

      <div className="payout-section">
        <h6 className="rules-highlight">Payout</h6>
        <div className="table-responsive">
          <table className="table" style={{ background: "#f2f2f2" }}>
            <thead>
              <tr>
                <th>Bet</th>
                <th>Description</th>
                <th>Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st Bet Bahar</td>
                <td>Payout if Bahar Wins on the 1st bet</td>
                <td>1 to 1</td>
              </tr>
              <tr>
                <td>1st Bet Andar</td>
                <td>Payout if Andar wins on the 1st bet</td>
                <td>1 to 1</td>
              </tr>
              <tr>
                <td>2nd Bet Bahar</td>
                <td>Payout if Bahar wins on the 2nd bet</td>
                <td>1 to 1</td>
              </tr>
              <tr>
                <td>2nd Bet Andar</td>
                <td>Payout if Andar wins on the 1st bet</td>
                <td>1 to 1</td>
              </tr>
              <tr>
                <td>Side Bets Bahar</td>
                <td>Payout for winning side bet</td>
                <td>1 to 14</td>
              </tr>
              <tr>
                <td>Side Bets Andar</td>
                <td>Payout for winning side bet</td>
                <td>1 to 14</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Abj2Rules;
