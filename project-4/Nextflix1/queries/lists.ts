//List for the sort categories
export const sort_by: string[] = [
  "Title",
  "Oldest",
  "Newest"
];
//List for what the query should return corresponding to the sort categories
export const sort_by_query: string[] = [
  "title",
  "release_year",
  "-release_year"
];

//List for the genre categories for movies
export const listed_in_movies: string[] = [
  "Action & Adventure",
  "Horror Movies",
  "Sci-Fi & Fantasy",
  "Children & Family Movies",
  "Classic Movies",
  "Comedies",
  "Music & Musicals",
  "Documentaries",
  "Dramas",
  "Romantic Movies",
  "Thrillers",
].sort();

//List for the genre categories for tv shows
export const listed_in_series: string[] = [
  "Anime Series",
  "British TV Shows",
  "Crime TV Shows",
  "Docuseries",
  "Kids' TV",
  "Korean TV Shows",
  "Reality TV",
  "TV Action & Adventure",
  "TV Comedies",
  "TV Dramas",
  "TV Horror",
  "TV Mysteries",
  "International TV Shows",
].sort();