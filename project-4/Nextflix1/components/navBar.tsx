import * as React from 'react';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';
import SeriesPage from '../pages/SeriesPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//Navigation for the bottom tabs
const homeName: string = "Home";
const movieName: string = "Movies";
const seriesName: string = "Series";


//Create the bottom tabs
const Tab = createBottomTabNavigator();

//Function that returns the bottom tabs
export default function NavBar() {
    return (

        //Sets the name of the tabs and the icons
        <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
                tabBarActiveBackgroundColor: "black",
                tabBarInactiveBackgroundColor: "black",
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTitleStyle: {
                    color: 'white'
                },
                tabBarIcon: ({ focused, color, size }) => {
                    type IconName = keyof typeof Ionicons.glyphMap;
                    let iconName: IconName | undefined = undefined;
                    let rn: string = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline';
                        color = focused ? "#E50914" : "grey"
                    } else if (rn === seriesName) {
                        iconName = focused ? 'tv' : 'tv-outline';
                        color = focused ? "#E50914" : "grey"
                    }
                    else if (rn === movieName) {
                        iconName = focused ? 'videocam' : 'videocam-outline';
                        color = focused ? "#E50914" : "grey"
                    }

                    if (iconName !== undefined) {
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                },
            })}

        >
            <Tab.Screen name={homeName} component={HomePage} />
            <Tab.Screen name={movieName} component={MoviePage} />
            <Tab.Screen name={seriesName} component={SeriesPage} />
        </Tab.Navigator>

    );
};

