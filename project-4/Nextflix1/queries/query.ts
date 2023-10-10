import { gql } from "@apollo/client";

//gql query for data about specific the movie/show
export const GET_INFO = gql`
  query ($show_id: String) {
    findMovieById(show_id: $show_id) {
      show_id
      type
      title
      release_year
      rating
      director
      country
      date_added
      duration
      listed_in
      description
      cast
      ratings
      review_array
      image_url
    }
  }
`;

//GET_DATA is a query that gets all the data from the database
export const GET_DATA = gql`
  # Query to get all the netflix data from the database with the filter and sort values
  query (
    $limit: Int
    $offset: Int
    $type: String
    $title: String
    $sort: String
    $category: String
    $image_url: String
  ) {
    netflix(
      limit: $limit
      offset: $offset
      type: $type
      title: $title
      sort: $sort
      category: $category
      image_url: $image_url
    ) {
      count
      data {
        show_id
        title
        type
        release_year
        rating
        duration
        listed_in
        image_url
      }
    }
  }
`;


