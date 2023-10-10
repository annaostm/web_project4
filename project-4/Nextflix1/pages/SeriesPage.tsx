import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';
import DisplayData from '../components/displayData';

//This page is used to display the series
const SeriesPage = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {

  return (
    //Display the series by rendering the DisplayData component
    <>
      <DisplayData navigation={navigation} type={"TV Show"} />
    </>
  );
}


export default SeriesPage;