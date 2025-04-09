import React from "react";

//import { cmeterrules } from "../../../assets/images";
import "../../commonStyle.scss";
const BTableRules = () => {
  return (
    <div className="rules-section">
      <ul className="pl-4 pr-4 list-style">
        <li>
          The bollywood table game will be played with a total of 16 cards
          including (J,Q, K, A) these cards and 2 deck that means game is
          playing with total 16*2 = 32 cards
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character-black"> A</span>
            <span className="card-black"> &spades;</span>
            <span>Don Wins</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character-red ">A</span>
            <span className="card-red"> &hearts;</span>
            <span className="card-character-red ">A</span>
            <span className="card-red"> &diams;</span>
            <span className="card-character-black ">A</span>
            <span className="card-black"> &clubs;</span>
            <span>Amar Akbar Anthony Wins</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character-black ">K</span>
            <span className="card-black"> &spades;</span>
            <span className="card-character-black ">Q</span>
            <span className="card-black"> &spades;</span>
            <span className="card-character-black ">J</span>
            <span className="card-black"> &spades;</span>
            <span>Sahib Bibi aur Ghulam Wins.</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character-red ">K</span><span className="card-red"> &diams;</span>
            <span className="card-character-black ">K</span><span className="card-black"> &clubs;</span>
            <span>Dharam Veer Wins.</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character-red ">K</span> <span className="card-red"> &hearts;</span>
            <span className="card-character-black ">Q</span><span className="card-black"> &clubs;</span>
            <span className="card-character-red ">Q</span><span className="card-red"> &diams;</span>
            <span className="card-character-red ">Q</span> <span className="card-red"> &hearts;</span>
            <span>Kis Kisko Pyaar Karoon Wins.</span>
          </div>
        </li>
        <li>
          <div className="cards-box">
            <span>If the card is</span>
            <span className="card-character-red ">J</span><span className="card-red"> &hearts;</span>
            <span className="card-character-black ">J</span><span className="card-black"> &spades;</span>
            <span className="card-character-red ">J</span><span className="card-red"> &diams;</span>
            <span>Ghulam Wins.</span>
          </div>
        </li>
      </ul>
      <ul className="pl-4 pr-4 list-style">
        <li>
          <b>ODD:</b>
          <span>J K A</span>
        </li>
        <li>
          <b>DULHA DULHAN:</b>
          <span>Q K</span>
          <span>Payout: 1.97</span>
        </li>
        <li>
          <b>BARATI:</b>
          <span>A J</span>
          <span>Payout: 1.97</span>
        </li>
        <li>
          <b>RED:</b>
          <span>Payout: 1.97</span>
        </li>
        <li>
          <b>BLACK:</b>
          <span>Payout: 1.97</span>
        </li>
        <li>
          <span>J,Q,K,A</span>
          <div>PAYOUT: 3.75</div>
        </li>
        <li>A = DON</li>
        <li>B = AMAR AKBAR ANTHONY</li>
        <li>C = SAHIB BIBI AUR GHULAM</li>
        <li>D = DHARAM VEER</li>
        <li>E = KIS KISKO PYAAR KAROON</li>
        <li>F = GHULAM</li>
      </ul>
    </div>
  );
};

export default BTableRules;
