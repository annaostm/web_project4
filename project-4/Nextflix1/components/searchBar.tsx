import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

//Props for the SearchBar component
interface searchBarProps {
  type: string;
  setInput: (input: string) => void;
  defaultInput?: string;
}

// SearchBar component that renders the search bar and the filter buttons
const SearchBar = (props: searchBarProps) => {
  // State variables for the search bar
  const [search, setSearch] = useState(props.defaultInput || "");

  //Renders the search bar and the filter buttons
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          onEndEditing={() => {
            props.setInput(search)
          }}
          placeholder={"Search for a " + props.type.toLowerCase() + "..."}
          style={styles.input}
          clearButtonMode="always"
        />
      </View>
    </View>
  );
};

//Styling for the search bar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24272e",
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24272e",
  },
  input: {
    height: 40,
    width: 320,
    margin: 12,
    borderWidth: 1,
    color: "white",
  },
});

export default SearchBar;
