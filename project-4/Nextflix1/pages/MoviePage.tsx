import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';
import DisplayData from '../components/displayData';

//This page is used to display the movies
const MoviePage = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {

  return (
    //Display the movies by rendering the DisplayData component
    <>
      <DisplayData navigation={navigation} type={"Movie"} />
    </>
  );
}


export default MoviePage;