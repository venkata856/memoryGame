import { useEffect, useState } from "react";
import "./Display.css";
import LoadingSpinner from "./LoadingSpinner";
const Display = (props) => {
  const { cards, calculateScore, playAgain, cardsLength } = props;
  const [selected, setSelected] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const handleOnClick = (event) => {
    if (selected.includes(event.target.id)) setGameOver(true);
    setSelected((current) => [...current, event.target.id]);
    setData(shuffle(data));
    if (!gameOver) calculateScore();
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    setData(props.cards);
    cardsLength(props.cards.length);
    setLoading(false);
  }, [props]);

  if (loading) return <LoadingSpinner />;

  if (gameOver) {
    return (
      <>
        <h1 className="gameOver"> GAME OVER</h1>
        <button className="play" onClick={playAgain}>
          Play Again
        </button>
      </>
    );
  } else {
    return (
      <div className="cardsContainer">
        {data.map((card, index) => (
          <img
            src={card.img}
            onClick={handleOnClick}
            alt="pokemon"
            id={card.order}
            key={index}
          ></img>
        ))}
      </div>
    );
  }
};

export default Display;
