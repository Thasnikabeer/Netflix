import React, { useEffect, useRef, useState } from "react";
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'

import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGFiZmVjMDU1MjY4OTE2ZTllYWFkMWUyZDE1N2QyNSIsIm5iZiI6MTcyNjQ4MTEzNC42MDg0MDUsInN1YiI6IjY2ZTdmZjkzMzc2OGE3M2Y4ZDkxYzY1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v2LnBcYICHPtESlA95tW5DEOOouC-Lv1NrNYiD4Axj8'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY; 
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category.trim() : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    const cardsElement = cardsRef.current;
    cardsElement.addEventListener('wheel', handleWheel);

    return () => {
      cardsElement.removeEventListener('wheel', handleWheel); // Cleanup on unmount
    };
  }, [category]); // added category as a dependency

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
