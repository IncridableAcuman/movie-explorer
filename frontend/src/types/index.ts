export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath?: string;
  poster_path?: string; // Qo'shildi
  backdropPath?: string;
  backdrop_path?: string; // Qo'shildi
  releaseDate?: string;
  release_date?: string; // Qo'shildi
  voteAverage?: number;
  vote_average?: number; // Qo'shildi
  genreIds: number[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
}