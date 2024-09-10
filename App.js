import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList, Button, ActivityIndicator, Image } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meal, setMeal] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = () => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => {
      if (!response.ok)
        throw new Error("Error in fetch:" + response.statusText);
        
      return response.json()
    })
    .then(data => setMeal(data.meals))
    .catch(err => console.error(err))
    .finally(() => setLoading(false));   
  }

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <TextInput
        underlineColorAndroid={'gray'}
        style={styles.input} 
        placeholder='Search' 
        value={keyword}
        onChangeText={text => setKeyword(text)} 
      />
      <View style={styles.button}>
        <Button title="Find" onPress={handleFetch}/>
      </View>
      {loading && <ActivityIndicator size="large" />}
      <View style={styles.list}>
        <FlatList
          data={meal} 
          keyExtractor={(item) => item.idMeal}
          renderItem={({item}) =>
            <View>
              <Text style={styles.header}>
                {item.strMeal}
              </Text>
              <Image source={{uri: item.strMealThumb}}
                style = {styles.image}>
              </Image>
            <Separator/>
            </View>
          }
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
  },
  input: {
    height: 40,
    width: 200,
    //borderColor: 'gray', 
    //borderWidth: 1,
  },
  list: {
    paddingTop: 20,
  },
  header: {
    fontSize: 13, 
    fontWeight: "bold",
  },
  image: {
    width: 50, 
    height: 50, 
    margin: 5,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "gray"
  },
});
