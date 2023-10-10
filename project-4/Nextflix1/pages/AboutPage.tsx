import { useQuery, useMutation, makeVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { Button, Card, TextInput } from "react-native-paper";
import { GET_INFO } from "../queries/query";
import { ADD_REVIEW } from "../queries/mutations";
import Rating from "../components/starRating";
import LottieView from "lottie-react-native";
import { Rating as StarRating} from "react-native-ratings";


//Defining an interface with the types of the fields returned object from the database.
interface Data {
  show_id: string;
  title: string;
  type: string;
  release_year: number;
  rating: string;
  description: string;
  ratings: [number];
  cast: string;
  country: string;
  director: string;
  duration: string;
  listed_in: [string];
  review_array: [string];
  image_url: string;
}

//Defining an interface with the types of the fields returned object from the database.
type NetflixObject = {
  findMovieById: Data;
};

export const movieId = makeVar("s1");

export default function AboutPage({ id }: { id: string }) {

  //Getting the data for the spesific movie/show, and storing it in a constant. Updating the review array if the user has submitted a review.
  const { loading, error, data, refetch } = useQuery<NetflixObject>(GET_INFO, {
    variables: { show_id: id },
  });

  //Constants for setting review and rating input from the user
  const [review_input, setReviewInput] = useState("");
  const [addReview, { data: reviewData }] = useMutation(ADD_REVIEW);

  //Function for adding a review to the database
  function reviewSubmit() {
    if (review_input == "") return alert("Please write a review before submitting");
    addReview({ variables: { show_id: id, input: review_input } });
    alert("Review submitted! Your review will appear in the list:)");
    setReviewInput("");
  }

  //Updating the database when the user has submitted a rating so that the score is updated
  function updateRatings() {
    if (data) {
      refetch();
    }
  }

  //Updating the database and information on the page when the reviewSubmit function is called using the refetch function
  useEffect(() => {
    if (reviewData) {
      refetch();
    }
  }, [reviewData]);

  //Calculating the score from all the ratings of the title.
  let ratingSum = data?.findMovieById.ratings.reduce((a, b) => a + b, 0);
  let ratingCount = data?.findMovieById.ratings.length;

  //Calculating the average score from all the ratings of the title.
  let score = 0;
  let scorePercentage = "";
  if (ratingSum !== undefined && ratingCount !== undefined) {
    score = ratingSum/ratingCount;
    scorePercentage = Math.round((ratingSum / ratingCount) * 20).toString() + "%";
  }

  //If loading
  if (loading)
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.loading]}>
        <LottieView
          source={require("../assets/loading.json")}
          autoPlay={true}
          loop={true}
          style={{ backgroundColor: "#24272e" }}
        ></LottieView>
        <Text style={styles.loadingText}>Get your popcorn ready!</Text>
      </View>
    );
    
  //If error
  if (error) return <Text style={styles.errorText}>Error</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#24272e" }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{data?.findMovieById.title}</Text>
          <View style={styles.container}>
          <StarRating
          type="custom"
          readonly={true }
          startingValue={score}
          imageSize={55}
          tintColor='#24272e'
          ratingColor='#ffb300'
      />
          </View>
          <Text style={styles.rating}>Rating: {scorePercentage}</Text>
          <Card style={styles.card1}>
            <Card.Content>
              <Text style={styles.text}>
                {data?.findMovieById.description
                  .split(" ")
                  .slice(0, 50)
                  .join(" ")}
                ...
              </Text>
            </Card.Content>
          </Card>

          <Text style={styles.boldtext}>Cast:</Text>
          <Text style={styles.text}>
            {data?.findMovieById.cast ?? "Cast not specified"}{" "}
          </Text>

          <Text style={styles.boldtext}>Country:</Text>
          <Text style={styles.text}>
            {data?.findMovieById.country ?? "Country not specified"}
          </Text>

          <Text style={styles.boldtext}>Director: </Text>
          <Text style={styles.text}>
            {data?.findMovieById.director ?? "Director not specified"}
          </Text>

          <Text style={styles.boldtext}>Duration:</Text>
          <Text style={styles.text}>
            {data?.findMovieById.duration ?? "Duration not specified"}
          </Text>

          <Text style={styles.boldtext}>Listed in:</Text>
          <Text style={styles.text}>{data?.findMovieById.listed_in}</Text>

          <Text style={styles.boldtext}>Release year:</Text>
          <Text style={styles.text}>
            {data?.findMovieById.release_year ?? "Not specified"}
          </Text>

          <Text style={styles.boldtext}>Type:</Text>
          <Text style={styles.text}>{data?.findMovieById.type}</Text>

          {/* <Avatar.Image size={200} source={{ uri: full_img_url }} /> */}

          <Text style={styles.reviews}>Reviews</Text>

<ScrollView style={styles.reviewbox}>
          {data?.findMovieById.review_array.map((review, index) => (
            <Card style={styles.card2} key={index}>
              <Card.Content>
                <Text style={styles.review}>{review}</Text>
              </Card.Content>
            </Card>
          ))}
          </ScrollView>

          <Text style={styles.addreview}>Add a review:</Text>
          <TextInput
            style={styles.input}
            label="Write your opinion here!"
            value={review_input}
            onChangeText={(text) => setReviewInput(text)}
          />
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              reviewSubmit();
            }}
          >
            Add review
          </Button>

          {/* Rendering the rating with show_id */}
          <Rating
            show_id={data?.findMovieById.show_id}
            updateRatings={updateRatings}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

//Styling for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#24272e",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  rating: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  reviews: {
    color: "#3498DB",
    fontSize: 30,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
    fontWeight: "bold",
  },
  errorText: {
    color: "white",
    backgroundColor: "#24272e",
    height: "100%",
    paddingTop: 200,
    fontSize: 20,
    textAlign: "center",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
  loadingText: {
    color: "white",
    height: "100%",
    paddingTop: 500,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  review: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    margin: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    width: 340,
    color: "white",
  },
  button: {
    margin: 10,
    width: 200,
    backgroundColor: "#3498DB",
  },
  card1: {
    margin: 10,
    width: 340,
    backgroundColor: "#24272e",
    borderColor: "red",
    borderWidth: 2,
  },
  card2: {
    margin: 10,
    width: 340,
    backgroundColor: "#24272e",
    borderColor: "#3498DB",
    borderWidth: 2,
  },

  boldtext: {
    color: "red",
    fontSize: 20,
    textAlign: "center",
    margin: 20,
    fontWeight: "bold",
  },
  addreview: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    margin: 30,
    fontWeight: "bold",
  },
  circle: {
    width: 196,
    height: 196,
    borderRadius: 196 / 2,
    borderWidth: 2,
    borderColor: 'red',
    overflow: 'hidden',
  },
  circleFill: {
    backgroundColor: 'yellow',
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  reviewbox: {
    maxHeight: 300
  }
});
