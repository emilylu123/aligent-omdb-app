import React from "react";
import "./MovieItem.styles.scss";
import { Container, Row, Col } from "react-bootstrap";

export default function MovieItem(props) {
  const { title, year, imgURL, id, onClick } = props;

  // use defaultPosterURL if imgURL is not available
  const defaultPosterURL =
    "https://allaboutvanya.files.wordpress.com/2012/02/ilovemovies2.jpg";

  return (
    // Executed on click
    <Container className={props.className} onClick={() => onClick(id)}>
      <Row>
        <Col md={12} xl={3}>
          <img
            src={imgURL !== "N/A" ? imgURL : defaultPosterURL}
            alt="Poster"
            className="movie-item-poster  d-none d-xl-block"
          />
        </Col>
        <Col md={12} xl={9}>
          <Row>
            <div className="movie-item-title grey-font">{title}</div>
          </Row>
          <Row>
            <div className="movie-item-year grey-font">{year}</div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}