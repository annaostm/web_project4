import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavBar from './components/navBar';
import AboutPage from './pages/AboutPage';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useReactiveVar } from '@apollo/client';
import { movieId } from './pages/AboutPage';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://it2810-45.idi.ntnu.no:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          netflix: {
            //Merge incoming data with existing data in the cache and differentiate between the type "Movie" and "TV Show"
            keyArgs: ['type', 'input', "title", "sort", "category"],
            merge(existing, incoming) {
              return {
                count: incoming.count,
                data: [...(existing?.data || []), ...incoming.data],
                __typename: 'netflix',

              };
            },
          },
        },
      },
    },
  }),
});

const Stack = createNativeStackNavigator();


//About page component
function AboutScreen() {
  const id = useReactiveVar(movieId);
  return <AboutPage id={id} />;
}

//Main component that takes care of the navigation
function HomeTabs() {
  return <NavBar />;
}

//Main component that renders the app
const App = () => (
  <>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Nextflix" component={HomeTabs} />
          <Stack.Screen name="About" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider></>
);

export default App;


