import "./App.css";
import axios from "axios";
import Display from "./Display";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Navigation from "./Navigation";

function App() {
  const [data, setData] = useState([{}]);
  const [level, setLevel] = useState(1);
  const [clicks, setClicks] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(0);
  const [limit, setLimit] = useState(3);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentUrl, setCurrentUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=1&limit=3`
  );

  //https://pokeapi.co/api/v2/pokemon?offset=6&limit=6
  //"https://pokeapi.co/api/v2/pokemon?limit=6"
  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    axios
      .get(currentUrl, {
        cancelToken: source.token,
      })
      .then((result) => result.data)
      .then((allPokemon) => {
        setData([]);
        allPokemon.results.forEach((pokemon) => fetchPokemonData(pokemon));
      });

    const fetchPokemonData = (pokemon) => {
      let url = pokemon.url;
      axios
        .get(url)
        .then((response) => response.data)
        .then((response) => {
          setData((prevData) => [
            ...prevData,
            {
              img: response.sprites.other.dream_world.front_default,
              name: response.name,
              order: response.order,
            },
          ]);
          setTimeout(() => setLoading(false), 2500);
          setClicks(0);
        });
    };

    // return () => source.cancel();
  }, [currentUrl]);

  const onHandleChange = () => {
    setClicks((prev) => prev + 1);
    setScore((prev) => prev + 1);
    if (score >= bestScore) setBestScore(score + 1);

    if (clicks >= numberOfCards - 1) {
      setOffset(Math.floor(Math.random() * 100));
      setLimit((prev) => prev + 1);
      setCurrentUrl(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      setLevel((prev) => prev + 1);
      setClicks(0);
    }
  };

  const onPlayAgainHandle = () => {
    if (score >= bestScore) setBestScore(score);
    setLevel(1);
    setClicks(0);
    setScore(0);
    setOffset(Math.floor(Math.random() * 100));
    setLimit(5);
    setCurrentUrl(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=4`);
  };
  const onCardLengthChanges = (cardTotal) => {
    setNumberOfCards(cardTotal);
  };

  if (loading) return <LoadingSpinner level={level} />;
  return (
    <div className="App">
      <Navigation level={level} score={score} bestScore={bestScore} />
      <Display
        cards={data}
        calculateScore={onHandleChange}
        playAgain={onPlayAgainHandle}
        cardsLength={onCardLengthChanges}
      />
    </div>
  );
}

export default App;
