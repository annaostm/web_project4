import { gql } from "@apollo/client";

//gql mutation for adding a review to the database
export const ADD_REVIEW = gql`
  mutation ($show_id: String, $input: String) {
    addReview(show_id: $show_id, input: $input)
  }
`;

//gql mutation for adding a rating to the database
export const ADD_RATING = gql`
  mutation ($show_id: String, $input: Int) {
    addRating(show_id: $show_id, input: $input)
  }
`;
