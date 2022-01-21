import React, { useState, useCallback } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
    const { navigation } = props;
    const [foods, setFoods] = useState(null);
    const [userLogged, setUserLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reloadData, setReloadData] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    });

    useFocusEffect(
        useCallback(() => {
        if (userLogged) {
            const idUser = firebase.auth().currentUser.uid;
            db.collection("favorites")
            .where("idUser", "==", idUser)
            .get()
            .then((response) => {
                const idFoodsArray = [];
                response.forEach((doc) => {
                    idFoodsArray.push(doc.data().idFood);
                });
                const foods = []
                getDataFood(idFoodsArray).then((response) => {
                response.forEach((doc) => {
                    const food = doc.data();
                    food.id = doc.id;
                    foods.push(food);
                });
                setFoods(foods);
                });
            });
        }
        setReloadData(false);
        }, [userLogged, reloadData])
    );

    {/* Alle Speiseninformationen(id) werden abgerufen und in ein Array gepackt */}
    const getDataFood = (idFoodsArray) => {
        const arrayFoods = [];
        idFoodsArray.forEach((idFood) => {
        const result = db.collection("foods").doc(idFood).get();
        arrayFoods.push(result);
        });
        return Promise.all(arrayFoods);
    };

    {/* Wenn User nicht eingeloggt bekomm diesen Screen angezeigt */}
    if (!userLogged) {
        return <UserNoLogged navigation={navigation} />;
    }

    if (foods?.length === 0) {
        return <NotFoundFoods />;
    }

    return (
        <View style={styles.viewBody}>
        {foods ? (
            <FlatList
            data={foods}
            renderItem={(food) => (
                <Food
                food={food}
                setIsLoading={setIsLoading}
                setReloadData={setReloadData}
                navigation={navigation}
                />
            )}
            keyExtractor={(item, index) => index.toString()}
            />
        ) : (
            <View style={styles.loaderFoods}>
            <ActivityIndicator size="large" />
            <Text style={{ textAlign: "center" }}>Favoriten werden geladen</Text>
            </View>
        )}
        <Loading text="Favorit entfernen" isVisible={isLoading} />
        </View>
    );
    }

function NotFoundFoods() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Keine Speisen in deiner Favoritenliste!
      </Text>
    </View>
  );
}

{/* Funktion und Screen für ausgeloggte Nutzer */}
function UserNoLogged(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Du musst angemeldet sein, um deine Favoriten anzusehen!
      </Text>
      <Button
        title="MELDE DICH AN!"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#00a680" }}
        onPress={() => navigation.navigate("login")}
      />
    </View>
  );
}

function Food(props) {
  const {
    food,
    setIsLoading,
    setReloadData,
    navigation,
  } = props;
  const { id, name, color, iconName } = food.item;

  const confirmRemoveFavorite = () => {
    Alert.alert(
      "Speiße aus Favoriten entfernen",
      "Bist du dir sicher, die Speise aus deinen Favoriten zu entfernen?",
      [
        {
          text: "Abbrechen",
          style: "cancel",
        },
        {
          text: "Entfernen",
          onPress: removeFavorite,
        },
      ],
      { cancelable: false }
    );
  };

  const removeFavorite = () => {
    setIsLoading(true);
    db.collection("favorites")
      .where("idFood", "==", id)
      .where("idUser", "==", firebase.auth().currentUser.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
          const idFavorite = doc.id;
          db.collection("favorites")
            .doc(idFavorite)
            .delete()
            .then(() => {
              setIsLoading(false);
              setReloadData(true);
              alert("Favorite wurde erfolgreich entfernt");
            })
            .catch(() => {
              setIsLoading(false);
              alert("Ein Fehler beim Entfernen ist aufgetreten!");
            });
        });
      });
  };

  return (
    <View style={styles.food}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Refrectory", {
            screen: "refrectorydetail",
            params: { id: id, name: name },
          })
        }
      >
        <View style={{backgroundColor: color, height: 10}}>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            containerStyle={styles.favorite}
            onPress={confirmRemoveFavorite}
            underlayColor="transparent"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loaderFoods: {
    marginTop: 0,
    marginBottom: 10,
  },
  food: {
    margin: 10,
    marginTop: 20
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,  
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "600",
    fontSize: 20,
  },
  favorite: {
    marginTop: 35,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
    borderColor: "#AAA",
    borderWidth: 1,
  },
});