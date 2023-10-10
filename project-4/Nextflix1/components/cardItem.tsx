import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { movieId } from "../pages/AboutPage";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

//type definition for the item-cards
type CardType = {
    title: string;
    type: string;
    id: string;
    year: number;
    navigation: NavigationProp<ParamListBase>;
    image_url: string;
  };

//Component that displays the items in cards
const Item = ({ title, type, id, year, navigation, image_url }: CardType) => {
    //Sets the default image by checking if type is movie or serie
    let no_image: string = "";
    type === "Movie"
      ? (no_image =
        "https://as1.ftcdn.net/v2/jpg/03/57/28/28/1000_F_357282894_xhQc58VUjqLhvA1ZwJc5JUIkC0a66QZt.jpg")
      : (no_image =
        "https://static.vecteezy.com/system/resources/thumbnails/002/267/298/small/tv-show-neon-signs-style-text-free-vector.jpg");
  
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            movieId(id);
            navigation.navigate("About");
          }}
        >
          <View style={styles.item}>
            <Card style={{ height: 400, width: 280 }}>
              <Card.Content>
                <Title style={styles.titleCard}>{title}</Title>
                <Paragraph>{year}</Paragraph>
              </Card.Content>
              <Card.Cover
                style={{
                  justifyContent: "center",
                  marginLeft: 1,
                  marginRight: 1,
                  marginTop: 25,
                  marginBottom: 1,
                  height: title.length > 27 ? 270 : 300,
                  overflow: "hidden",
                }}
                source={{
                  uri: image_url
                    ? "https://www.themoviedb.org/t/p/w300/" + image_url
                    : no_image,
                }}
              />
            </Card>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

//Stylesheet for displayData component
const styles = StyleSheet.create({
    titleCard: {
      paddingRight: 0,
    },
    item: {
        padding: 0,
        marginVertical: 8,
        marginHorizontal: 40,
      },
  });

export default Item;