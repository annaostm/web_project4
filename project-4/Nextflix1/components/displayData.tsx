import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "../queries/query";
import SearchBar from "./searchBar";
import SelectLabels from "./filterButtons";
import { sort_by, listed_in_movies, listed_in_series } from "../queries/lists";
import LottieView from "lottie-react-native";
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Item from "./cardItem";


//Data interface that defines the type of the netflix object
export type Data = {
  show_id: string;
  title: string;
  type: string;
  release_year: number;
  listed_in: string[];
  image_url: string;
}

//NetFlix type that defines the type of the netflix object
export type NetflixList = {
  netflix: {
    count: number; //number of total movie/serie objects
    data: Data[]; //array of movie/serie objects
  };
};

//Interface for the props
interface displayDataProps {
  navigation: NavigationProp<ParamListBase>;
  type: string;
}


//Component that displays the data
const DisplayData = (props: displayDataProps) => {
  //Function that renders the items in cards
  const renderItem = ({ item }: { item: Data }) => (
    <Item
      title={item.title}
      id={item.show_id}
      year={item.release_year}
      navigation={props.navigation}
      image_url={item.image_url}
      type={item.type}
    />
  );

  //Constants for batch size, page number and the input of the search bar
  const [batchSize, setBatchSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const flatListRef = useRef<FlatList | null>(null)

  //Function that scrolls to the top of the list when input/filter/sort is changed
  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ animated: false, offset: 0 });
  }

  //Function for setting the input when user types in search bar
  const setInput = (input: string) => {
    setSearchInput(input);
    setPageNumber(0);
    scrollToTop();

  };

  //Function for setting the sort when user selects a sort option
  const setSortButton = (input: string) => {
    setSort(input);
    setPageNumber(0);
    scrollToTop();

  };

  //Function for setting the filter when user selects a filter option
  const setFilterButton = (input: string) => {
    setFilter(input);
    setPageNumber(0);
    scrollToTop();

  };

  //useQuery hook that gets the data from the database
  const { loading, error, data, fetchMore } = useQuery<NetflixList>(GET_DATA, {
    variables: {
      limit: batchSize,
      offset: 0,
      type: props.type,
      title: searchInput,
      sort: sort,
      category: filter,
    },
  });

  //Handleloadmore function that fetches more data from the database when user scrolls down
  const handleLoadMore = async () => {
    await fetchMore({
      variables: {
        limit: batchSize, // * (pageNumber + 1),
        offset: (pageNumber + 1) * batchSize,
        type: props.type,
        title: searchInput,
        sort: sort,
        category: filter,
      },
    });
    setPageNumber((prevousPage) => prevousPage + 1);
  };

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

  //Error handling
  if (error) return <Text style={styles.text}>Error</Text>;

  return (
    <>
      <SafeAreaView style={styles.search}>
        <SearchBar
          type={props.type}
          setInput={setInput}
          defaultInput={searchInput}
        />
        <View style={styles.filter}>
          <SelectLabels
            options={
              props.type === "Movie" ? listed_in_movies : listed_in_series
            }
            name={"Filter"}
            defaultOption={filter}
            setOption={setFilterButton}
          />
          <SelectLabels
            options={sort_by}
            name={"Sort by"}
            defaultOption={sort}
            setOption={setSortButton}
          />
        </View>

        {data && data?.netflix.count >= 1 ? (
          <Text style={styles.searchText}>
            {props.type === "Movie"
              ? "Movies: " + data?.netflix.count
              : "Series: " + data?.netflix.count}
          </Text>
        ) : (
          <Text style={styles.searchTextEmpty}></Text>
        )}
      </SafeAreaView>
      {data && data?.netflix.count < 1 ? (
        <Text style={styles.waittext}>
          No content matched your {"\n"} search for "{searchInput}"
        </Text>
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={data?.netflix.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.show_id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
          />
        </SafeAreaView>
      )}
    </>
  );
};

//Stylesheet for displayData component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#24272e",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 0,
    marginVertical: 8,
    marginHorizontal: 40,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24272e",
    zIndex: 1,
  },
  title: {
    fontSize: 32,
  },
  search: {
    backgroundColor: "#24272e",
    height: 180,
  },
  waittext: {
    color: "white",
    backgroundColor: "#24272e",
    height: "100%",
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    color: "white",
    backgroundColor: "#24272e",
    height: "100%",
    paddingTop: 200,
    fontSize: 20,
    textAlign: "center",
  },
  loadingText: {
    color: "white",
    height: "100%",
    paddingTop: 500,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  searchText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  searchTextEmpty: {
    marginBottom: 10,
  },
  filter: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#24272e",
  },
  titleCard: {
    paddingRight: 0,
  }
});

export default DisplayData;
