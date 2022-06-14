import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './Components/MovieRow';
import FeaturedMovie from './Components/FeaturedMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
      //Pegando a lista
     const loadAll = async () => {
       let list = await Tmdb.getHomeList();
       setMovieList(list);
    
     // Pegando o flme em destaque da lista
     let originals = list.filter(i => i.slug === 'originals');
     let randomChosen = Math.floor(Math.random() * originals[0].items.results.length -1);
     let chosen = originals[0].items.results[randomChosen];
     let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
     setFeaturedData(chosenInfo);
    }
     loadAll();
  }, []);

  return (
    <div className='page'>

      {featuredData &&
        <FeaturedMovie item = {featuredData}/>
      }
      

      <section className='lists'>
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title = {item.title} items = {item.items}/>
          </div>
        ))}
      </section>
    </div>
  )
}