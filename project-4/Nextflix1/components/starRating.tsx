import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ADD_RATING } from '../queries/mutations';

interface ratingProps {
  show_id: string | undefined;
  updateRatings: () => void;
};


//Component for the star rating system
export default function Rating(props: ratingProps) {
  const starRatingOptions: number[] = [1, 2, 3, 4, 5];

  //Constants for the star rating system
  const [starRating, setStarRating] = useState<number>(0);

  //Constant for the rating using useMutation
  const [addRating, { data: ratingData }] = useMutation(ADD_RATING);

  //Constants for the animation of the stars
  const animatedButtonScale = new Animated.Value(1);

  //Functions for animating the star rating system when the user clicks on a star
  const handlePressIn = (option: number) => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  //Functions for animating the star rating system when the user stops clicking on a star
  const handlePressOut = (option: number) => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  //Function for adding a rating to the database and updating the rating
  async function ratingSubmit() {
    if (starRating == 0) return alert("Please rate the movie/show before submitting");
    addRating({ variables: { show_id: props.show_id, input: starRating } });
    await setStarRating(0);
    await props.updateRatings();
    return alert("Rating submitted! The average score for the title will now be recalculated:)");
  }

  //Setting the text for the star rating system depending on the number of stars the user has clicked
  let starstext: string = starRating === 1 ? " star" : " stars";

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>{starRating ? `${starRating + starstext} ` : 'Tap to rate'}</Text>
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn(option)}
              onPressOut={() => handlePressOut(option)}
              onPress={() => setStarRating(option)}
              key={option}
            >
              <Animated.View style={animatedScaleStyle}>
                <MaterialIcons
                  name={starRating >= option ? 'star' : 'star-border'}
                  size={32}
                  style={starRating >= option ? styles.starSelected : styles.starUnselected}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => {
            ratingSubmit();
          }}
        >
          Add rating
        </Button>
        <Text style={styles.text}> </Text>
      </View>
    </ScrollView>
  );
}

//Styling for the star rating system
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#24272e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    width: 340,
    color: 'white',
  },
  button: {
    margin: 10,
    width: 200,
    backgroundColor: "#3498DB",
  },
});