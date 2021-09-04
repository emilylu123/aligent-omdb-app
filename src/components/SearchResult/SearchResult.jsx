import React, { useEffect, useState } from "react";
import "./SearchResult.styles.scss";
import MovieDetail from "./MovieDetail/MovieDetail";
import MovieItem from "./MovieItem/MovieItem";
import { Container, Row, Col } from "react-bootstrap";

export default function SearchResult(props) {
  const {
    yearRange: [startY, endY],
    type,
    result: { Search, totalResults },
  } = props;

  const [selectId, setSelectId] = useState(0);
  const [imdb, setImdb] = useState("tt0076759");
  const [movieInfo, setMovieInfo] = useState({});

  const API_KEY = "866364e";
  const detailURL = `http://www.omdbapi.com/?apikey=${API_KEY}&i=${imdb}`;

  function handleSelect(id) {
    setSelectId(id);
    setImdb(Search[id].imdbID);
    getMovieDetail();
  }

  const getMovieDetail = async () => {
    try {
      const response = await fetch(detailURL);
      const data = await response.json();
      console.log("data->", data, typeof data);
      setMovieInfo(data);
    } catch (e) {
      console.error(e.toString);
    }
  };

  useEffect(() => {
    //fetch data from api
    setImdb(Search[0].imdbID);
    getMovieDetail();
    console.log(movieInfo);
  }, []);

  return (
    <Container className="search-result-container">
      <Row>
        <Col xs={4} className="search-result-list">
          <p>{totalResults} RESULTS</p>
          {Search.map(({ Title, Year, Type, Poster, imdbID }, index) => {
            if (Year > startY && Year < endY) {
              return (
                <MovieItem
                  key={index}
                  id={index}
                  title={Title}
                  year={Year}
                  type={Type}
                  imgURL={Poster}
                  onClick={handleSelect}
                />
              );
            }
          })}
        </Col>
        <Col xs={8}>
          {movieInfo ? (
            <MovieDetail basic={Search[selectId]} info={movieInfo} />
          ) : (
            <div>Loading...</div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
