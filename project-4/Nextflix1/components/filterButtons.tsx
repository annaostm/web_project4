import React, { ReactNode, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";
import { sort_by_query } from "../queries/lists";
import { Entypo } from "@expo/vector-icons";

//Interface for the filter button
interface FilterProps {
  options: string[]; //array of options for the filter/sort button
  name: string; //name of the filter/sort button
  defaultOption: string; //default option for the filter/sort button
  setOption: (option: string) => void; //function to set the option for the filter/sort button
}

//FilterButton component that renders the filter buttons (sort and filter)
export default function SelectLabels(props: FilterProps) {

  const [selectedOption, setSelectedOption] = React.useState(props.defaultOption);

  //Change defaultoption if the user changes the option
  const handlepress = (option: string) => {
    setSelectedOption(option);
    props.setOption(option);
  };


  //List of options for the filter/sort button
  const options = props.options.map((option) => {
    return {
      label: option,
      value: props.name === "Sort by" ? sort_by_query[props.options.indexOf(option)] : option
    };
  });

  return (
    <>
      <View style={styles.container}>
        <RNPickerSelect style={pickerSelectStyles}
          value={selectedOption}
          onValueChange={(value) => setSelectedOption(value)}
          onDonePress={() => handlepress(selectedOption)}
          placeholder={{ label: props.name }}
          items={options}
          //Has to be set to false to make theD filter/sort button work because of a bug in the RNPickerSelect library
          // @ts-ignore
          Icon={() => (<Entypo name="chevron-down" size={13} color="black" style={{ top: 15, right: 3 }} />)}
        />
      </View>
    </>
  );
}

//Styling for the filter/sort buttons
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    width: 150,
    height: 40,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 21,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    color: 'black',
    paddingRight: 20, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: 'black',
    paddingRight: 20, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: 'black',
  },

});