import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native'
import { Header, Text, Card, Overlay, Button } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';
import { connect } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { LineChart } from "react-native-chart-kit";
import { AntDesign } from '@expo/vector-icons';

function PortfolioScreen(props) {
  // ---------------------------- Déclaration des états ---------------------------- //
  const [visible, setVisible] = useState(false);
  const [dataBDD, setdataBDD] = useState({});
  const [username, setUsername] = useState("");
  const [dataUsers, setdataUsers] = useState('');
  const [dataPortofolio, setDataPortofolio] = useState([]);
  const [dataAPI, setDataAPI] = useState({});
  const [ticker, setTicker] = useState("SPY");

  const isFocused = useIsFocused();

  // ------------------------ API Bourse ==> marketstack.com ------------------------ //
  // var APIkey1 = "dd62a27db1860da653545a9bdee0bdce";
  // var APIkey2 = "233b0ce2bd6d0973636042250c2ccc3d";
  var APIkey3 = "bd943945515e4ccec711630fb3df5069";

  // ----------------------------- Appel à l'API Bourse ----------------------------- //
  // Pour récupéartion des données boursières
  useEffect(() => {
    const findAPI = async () => {
      const API = await fetch(`http://api.marketstack.com/v1/eod?access_key=${APIkey3}&symbols=${ticker}`)
      const body = await API.json()
      setDataAPI(body)
      }
    if(dataBDD.selectBS) {    // Consition pour valider la présence des données du "Ticker"
    setTicker(dataBDD.selectBS[0].ticker)
    findAPI()
    }
  }, [dataBDD])

  // ----------------------- Appel backend : route /portofolio GET ----------------------- //
  // Pour récupération du portefeuille défini en BDD
  useEffect(() => {
    const findPortofolio = async () => {
      const dataPortofolio = await fetch(`https://rocketinvesting.herokuapp.com/portofolio?name=${props.name}`)
      const body = await dataPortofolio.json()
      setdataBDD(body.portofolios)
    }
    if(props.name && isFocused) {     // condition pour valider la présence dans le store du nom du portefeuille + "isFocused == True"
    findPortofolio()
    }
  }, [isFocused, dataPortofolio])

  // ----------------------- Appel backend : route /wishlist GET ----------------------- //
  // Pour récupération de la liste des portefeuilles déjà enregistrés dans User afin de comparer avec le nouveau portefeuille
  useEffect(() => {
    const findDouble = async () => {
      const dataDouble = await fetch(`https://rocketinvesting.herokuapp.com/wishList?token=${props.token}`)
      const body = await dataDouble.json()
      setDataPortofolio(body.portofolios.portofoliosId)
      setdataUsers(body)
    }
    if(props.token && isFocused) {    // condition pour valider la présence dans le store du token User + "isFocused == True"
    findDouble()
    }
  }, [isFocused])

  // ------------------- Vérification des doublons de portfeuilles ------------------- //
  // condition de vérification si un user existe et un portefeuille est bien enregistré
  let ButtonIsValid = false
  if (dataPortofolio && dataUsers.result && isFocused) {

    for (let i=0; i<dataPortofolio.length; i++){
      if(dataBDD._id == dataPortofolio[i]._id){   // on compare si le portefeuilel affiché est enregistré dans la liste favoris du User ou pas
        ButtonIsValid = true    // Si oui, on passe la variable "ButtonIsValid" à "True" sinon elle reste à "False"
      }
    }
  }

  // condition de d'affichage du bouton "enregistrer le portefeuille" ou "retour aux favoris" en utilisant le booléan définir précédement "ButtonIsValid"
  let ButtonVisible;
  if(ButtonIsValid && isFocused){
    // le portefeuille est deja enregistré ==> retour à mes favoris
    ButtonVisible = <Button containerStyle={{ marginTop: 20, alignItems: 'center' }}
                    buttonStyle={{ borderRadius: 20, backgroundColor: "#5DC803", marginBottom: 15, alignItems: 'baseline', width: 300, height: 50, alignSelf: 'center' }}
                    icon={{
                      name: "check-circle",
                      size: 30,
                      color: "white",
                      paddingBottom: 5
                    }}
                    title=" Retour à Mes Favoris"
                    titleStyle={{ paddingBottom: 5 }}
                    type="solid"
                    onPress={() => props.navigation.navigate('WishListScreen')}
                    />
  } else {
    // le portefeuille n'est pas enregistré ==> on enregistre + on fais apparaitre le popup de confirmation d'enregistrement
    ButtonVisible = <Button containerStyle={{ marginTop: 20, alignItems: 'center' }}
                    buttonStyle={{ borderRadius: 20, backgroundColor: "#e1191d", marginBottom: 15, alignItems: 'baseline', width: 300, height: 50, alignSelf: 'center' }}
                    icon={{
                      name: "star",
                      size: 30,
                      color: "white",
                      paddingBottom: 5
                    }}
                    title=" Enregistrer cette stratégie"
                    titleStyle={{ paddingBottom: 5 }}
                    type="solid"
                    onPress={() => { saveToWishlist(); setVisible(true) }}
                    />
  }
  
  // --------------------------- Portefeuille ACTIF ou PASSIF --------------------------- //
  // condition de validation si l'état de dataBDD est "True" + recherche en BDD si =le portefeuille appartient à une stratégie "Active" ou "Passive"
  let passif = [];
  let actif = [];
  if (dataBDD && dataBDD.strategy === "passive" && isFocused) {

    // Si la stratégie est "Passive", affichage personnalisé pour ce typologie de stratégie
    passif = <Card containerStyle={{ borderRadius: 10, marginTop: 15, marginBottom: 30}}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Composition du portefeuille : {"\n"}</Text>

      {dataBDD.actifs.map((data, i) => {  //lecture en BDD du tableau de données pour affichage
        return <Text style={{fontSize: 16}} key={i}>Actif {i + 1}: {"\n"}
                                          Description: {data.description} {"\n"}
                                          Ticker : ({data.ticker}) {"\n"}
                                          Répartition : {data.repartition} % {"\n"}
                                          type : {data.type} {"\n"}
                          </Text>
                  })}
                  <Text style={{fontSize: 16}}>Total répartition des actifs = 100% {"\n"}</Text>
                  <Text style={{fontSize: 16,fontWeight: "bold"}}>Rééquilibrage chaque trimestre pour conserver les mêmes proportions.</Text>
            </Card>

  } else if (dataBDD.strategy === "active") {

    // Si la stratégie est "Active", affichage personnalisé pour ce typologie de stratégie
    actif = <Card containerStyle={{ borderRadius: 10, marginTop: 15, marginBottom: 30}}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Mois en cours : {"\n"}Du 01/05/21 au 30/05/21 {"\n"}</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Composition du portefeuille : {"\n"}</Text>

      {dataBDD.selectBS.map((data, i) => {  //lecture en BDD du tableau de données pour affichage
        return <Text style={{fontSize: 16}} key={i}>Actif à {data.action} {"\n"}
                                          Description: {data.description} {"\n"}
                                          Ticker : ({data.ticker}) {"\n"}
                                          Répartition : {data.repartition} % {"\n"}
                                          type : {data.type} {"\n"}
        </Text>
      })}

      <Text style={{fontSize: 16}}>Total répartition des actifs = 100% {"\n"}</Text>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>Rééquilibrage du portefeuille tous les débuts de mois</Text>
    </Card>
  }

  // ----------------------- Appel backend : route /wishlist POST ----------------------- //
  // Pour l'enregistrement en BDD de l'_ID du portefeuille sélectionné avec appui sur le bouton "enregistrer le portefeuille"
  var saveToWishlist = async () => {

    const reqWishlist = await fetch('https://rocketinvesting.herokuapp.com/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `_idFront=${dataBDD._id}&token=${props.token}`
    })
    const body = await reqWishlist.json()
    setUsername(body.userName)
  }

  //------------changement de couleur pour la catégorie Risque du portefeuille -----------//
  var riskStyle = dataBDD.risk
  var colorRisk;

  if (riskStyle === 'audacieux') {colorRisk=<Text style={{color:'red'}}>{dataBDD.risk} <FontAwesome5 name="chess-king" size={16} color="black" /> </Text>}
  else if (riskStyle === 'prudent') {colorRisk=<Text style={{color:'orange'}}>{dataBDD.risk} <FontAwesome5 name="chess-rook" size={16} color="black" /></Text>}
  else {colorRisk=<Text style={{color:'green'}}>{dataBDD.risk} <FontAwesome5 name="chess-knight" size={16} color="black" /></Text>}

  // ------------------ Algorithme de traitement graphique portfeuille ------------------ //
  let date = [];
  let price = [];
  var monthValid;
  let perf6M = 0;
  if (dataAPI.data && isFocused) {

    // traitement de la data par filtre avec des données journalière pour ne récupérer que les données mensuelles
    for (let i=0; i<dataAPI.data.length; i++){

      var now = new Date(dataAPI.data[i].date) // format date formaté: 2021-05-24T11:46:22.692Z
      var nowToString = now.getMonth(); // récupération des Mois en chiffre
      
      // condition de sélection des donnnées mensuelles au lieu de journalières
      if(nowToString != monthValid){
        var months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
        months = months[nowToString]  // transformation des mois en "String"
        // création de deux tableaux avec les données mensuelles consolidées
        date.push(months)
        price.push(dataAPI.data[i].close)
      }
      monthValid = nowToString  // incrémentation de vérification du mois en cours
    }
    // inversion du tableau pour obtenir des données exploitatbles graphiquement (dans le bon sens de lecture)
    date = date.reverse();
    price = price.reverse();

    // Analyse performances sur 6 mois : (exploitation des données maximum gratuites de l'API)
    perf6M = 100-((price[0]*100)/price[4])
    perf6M = perf6M.toFixed(2)
  }

  // --------------------- Affichage du graphique du portefeuille --------------------- //
  // Avec le module React Chart Kit
  let graph;
  if(dataAPI.data && isFocused){
    graph = <LineChart
              data={{
                labels: date, // tableau des dates vu précédement
                datasets: [
                  {
                    data: price // tableau des prix vu précédement
                  }
                ]
              }}
              width={315}
              height={250}
              yAxisLabel="€"
              yAxisSuffix=""
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#3f9adb",
                backgroundGradientFrom: "#3f9adb",
                backgroundGradientTo: "#007ed9",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#007ed9"
                }
              }}
              bezier
              style={{
                marginVertical: 4,
                borderRadius: 5,
                alignSelf: 'center'
              }}
            />
  } 
  else {
    // si le pgraphique ne s'affiche pas, un indicateur de chargement apparait
    graph = <ActivityIndicator size="large" color="#e26a00" />
  }

  return (
    <View style={styles.container}>
      {/* ----------------------------------- Affichage du Header -------------------------------------- */}
      <Header containerStyle={{ backgroundColor: '#A1A1A1' }}
        leftComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="home" size={33} color="black"
                      onPress={() => props.navigation.navigate('DashboardScreen')} />}
        centerComponent={{ text: 'PORTEFEUILLE', style: { color: '#fff', fontSize: 16, marginTop: 10 } }}
        rightComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="logout" size={30} color="black"
                      onPress={() => {props.addToken(null); props.navigation.navigate('HomePageScreen')}} />}
      />

      {/* ----------------------------------- Affichage du Nom du portefeuille -------------------------------------- */}
      <Text h4 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, marginBottom: 15 }}>
        {dataBDD.name}
      </Text>
              <ScrollView>

                {/* ----------------------------------- Affichage du Graphique -------------------------------------- */}
                <Text style={{alignSelf:'center', fontSize: 16}}>Graphique <Entypo name="area-graph" size={15} color="black" /></Text>
                <Card containerStyle={{ borderRadius: 10, marginTop: 15, marginBottom: 30, display: 'flex', alignItems: 'center'}}>
                  {graph}
                </Card>

                {/* --------------------------------- Affichage des Performances ------------------------------------ */}
                <Text style={{alignSelf:'center', fontSize: 16}}>Performances <Ionicons name="rocket-outline" size={15} color="black" /></Text>
                <Card containerStyle={{ borderRadius: 10, marginTop: 15, marginBottom: 30 }}>
                  <Text style={{ fontSize: 16 }}>6 mois :  <Text style={{color:'green'}}>{perf6M} %</Text></Text>
                  <Text style={{ fontSize: 16 }}>1 an :  <Text style={{color:'green'}}>{dataBDD.perf1} </Text></Text>
                  <Text style={{ fontSize: 16 }}>2 ans :  <Text style={{color:'green'}}>{dataBDD.perf2}</Text></Text>
                  <Text style={{ fontSize: 16 }}>5 ans :  <Text style={{color:'green'}}>{dataBDD.perf5}</Text></Text>
                  <Text style={{ fontSize: 16 }}>Max :  <Text style={{color:'green'}}>{dataBDD.perfmax}</Text></Text>
                  <Text style={{ fontSize: 16 }}>Type de stratégie : <Text style={ (dataBDD.strategy == 'passive') ? styles.passif={color:'blue'} : styles.actif={color:'red'}}>{dataBDD.strategy} </Text></Text>
                  <Text style={{ fontSize: 16 }}>Profil de risque : {colorRisk}</Text>
                  <Text style={{ fontSize: 16 }}>Perte maximum : <Text style={{color:'red'}}>{dataBDD.maxloss}</Text></Text>
                  <Text style={{ fontSize: 16 }}>Volatilité : <Text style={{color:'red'}}>{dataBDD.volatility}</Text></Text>
                </Card>

                {/* -------------------------- Affichage de la description du portefeuille -------------------------- */}
                <Text style={{alignSelf:'center', fontSize: 16}}>Description <MaterialIcons name="description" size={15} color="black" /></Text>
                <Card containerStyle={{ borderRadius: 10, marginTop: 15, marginBottom: 30 }}>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description1} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description2} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description3} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description4} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description5} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description6} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description7} {"\n"}</Text>
                  <Text style={{textAlign: 'justify', fontSize: 16}}>{dataBDD.description8} {"\n"}</Text>
                </Card>

                {/* -------------------------------- Affichage Allocation d'Actifs ----------------------------------- */}
                <Text style={{alignSelf:'center', fontSize: 16}}>Allocation d'actifs <Foundation name="graph-horizontal" size={15} color="black" /></Text>
                {passif}
                {actif}

                </ScrollView>

        <View style={{marginBottom:50}}>

          {/* ------------------------ Affichage du bouton "enregistrer ou retour favoris" --------------------------- */}
          {ButtonVisible}

          {/* ------------------------------ Affichage du bouton "retour aux favoris" --------------------------------- */}
          <Button buttonStyle={{ borderRadius: 20, backgroundColor: '#fff', width: 300, height: 50, alignSelf: 'center', borderColor: 'black'}}
            title="Retour"
            titleStyle={{ color: "black" }}
            type="outline"
            onPress={() => props.navigation.navigate('DashboardScreen')}
          />
        </View>

        {/* ------------------ Affichage de la popup avec confirmation enregistrement portefeuille --------------------- */}
        <Overlay isVisible={visible} width="auto" height="auto" overlayStyle={{ width: '80%',alignItems: 'center', borderRadius: 20 }}>

          <FontAwesome5 style={{ marginTop: 30, marginBottom: 20 }}
            name="medal"
            size={100}
            color="#f6b93b"
          />

          <Text h4 style={{ textAlign: 'center', marginTop: 15, fontSize: 16 }}>Félicitation {username}</Text>
          <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 16 }}>Votre stratégie est enregistrée !</Text>

          {/*Bouton retour vers Mes Favoris + disparition du popup*/}
          <Button buttonStyle={{ borderRadius: 50, backgroundColor: '#e1191d', width: 70, alignSelf: 'center', borderColor: 'black', marginTop:20, marginBottom: 20}}
            title="ok"
            titleStyle={{ color: "#fff" }}
            type="solid"
            onPress={() => { props.navigation.navigate('WishListScreen'); setVisible(false) }}
          />

        </Overlay>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E6E6',
  },
})

// Fontion de récupération du token + du nom du portefefeuille depuis le Store
function mapStateToProps(state){
  return {token: state.token, name: state.wishlist}
}

// Fontion de d'envoie du token vide au Store pour destrcution lors du Logout
function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'saveToken', token: token })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioScreen);