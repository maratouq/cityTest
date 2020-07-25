DROP TABLE IF EXISTS movie;

CREATE TABLE IF NOT EXISTS movie(
  id SERIAL PRIMARY KEY,
  movie_name VARCHAR(255),
  genre VARCHAR(255)
);

INSERT INTO movie(movie_name,genre) VALUES ('Harry Potter', 'Fiction');