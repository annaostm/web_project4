import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView, TouchableOpacity, ImageBackground, Text
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { movieId } from './AboutPage';


//Data for the item-cards at the home page
const contentData = [
  {
    title: "Grown Ups",
    uri: "https://www.themoviedb.org/t/p/original/cQGM5k1NtU85n4TUlrOrwijSCcm.jpg",
    year: "2010",
    id: "s28",
  },
  {
    title: "Jaws",
    uri: "https://www.themoviedb.org/t/p/original/lxM6kqilAdpdhqUl2biYp5frUxE.jpg",
    year: "1975",
    id: "s42"
  },
  {
    title: "Aliens Stole My Body",
    uri: "https://www.themoviedb.org/t/p/original/8hORwWyXsNqX7eDZPSNN5iVTckF.jpg",
    year: "2020",
    id: "s925"
  },
  {
    title: "Free Willy",
    uri: "https://www.themoviedb.org/t/p/original/9iBgd9gi9ztWiVcYSG6zl8wDFBN.jpg",
    year: "1993",
    id: "s6799"
  },
  {
    title: "Squid Game",
    uri: "https://www.themoviedb.org/t/p/original/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    year: "2021",
    id: "s34"
  },
  {
    title: "La casa de papel",
    uri: "https://www.themoviedb.org/t/p/original/z01Dc0Ly2GmCpLe6Scx4d3dPP1S.jpg",
    year: "2021",
    id: "s110"
  },
];

//Type definition for the item-cards
export type ItemType = {
  title: string;
  uri: string;
  year: string;
  id: string;
  navigation: NavigationProp<ParamListBase>;
};

type newType = {
  title: string;
  uri: string;
  year: string;
  id: string;
}

//Component that displays the items in cards
const Item = ({ title, uri, year, id, navigation }: ItemType) => (
  <View>
    <TouchableOpacity
      //When the card is pressed, the movieId reactive variable is set to the id of the pressed card
      onPress={() => {
        movieId(id);
        navigation.navigate('About');
      }}>
      <View style={styles.cardContainer}>
        <Card
          style={{ height: 400, width: 280 }}
        >
          <Card.Content>
            <Title>{title}</Title>
            <Paragraph>{year}</Paragraph>
          </Card.Content>
          <Card.Cover
            style={{ justifyContent: 'center', marginLeft: 1, marginRight: 1, marginTop: 1, marginBottom: 1, height: 324 }}
            source={{ uri: uri }} />
        </Card>
      </View>
    </TouchableOpacity>
  </View>
);

//Home page function
export default function HomePage({ navigation }: { navigation: NavigationProp<ParamListBase> }) {

  //Renders the item-cards
  const renderItem = ({ item }: { item: newType }) => (
    <Item {...item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.theImage} source={require("../assets/cinema.jpg")}>
        <Text style={styles.infoText}>Welcome to NEXTFLIX!</Text>
      </ImageBackground>
      <Paragraph style={styles.title}>Editor's pick:</Paragraph>
      <FlatList
        data={contentData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={false}
      />
    </SafeAreaView>
  );
}


//Styles for the home page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#24272e",
  },
  cardContainer: {
    // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    backgroundColor: "#4C4E52",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginBottom: 20,
    borderRadius: 5
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 40,
  },

  text: {
    color: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  cards: {
    width: 190,
    height: 200,
    padding: 3,
    marginTop: 30,
  },
  title: {
    color: "white",
    paddingTop: 17,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  infoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    paddingLeft: 80,
    paddingTop: 45,
    maxWidth: 300

  },
  theImage: {
    width: 500,
    height: 200,
    resizeMode: "cover",
  }
});
