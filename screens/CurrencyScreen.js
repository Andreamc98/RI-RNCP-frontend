import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native'
import { Header, Button, Input, Card } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select'
import { AntDesign } from '@expo/vector-icons';

function CurrencyScreen(props) {
  const [deviseA, setDeviseA] = useState("EUR");
  const [amountA, setAmountA] = useState(1);
  const [amountB, setAmountB] = useState(0);
  const [deviseB, setDeviseB] = useState("EUR");

  // ----------------------------- Appel à l'API Bourse ----------------------------- //
  // Pour récupéartion des données boursières (Currency)
  useEffect(() => {
    const findAPI = async () => {
        const API = await fetch(`https://finnhub.io/api/v1/forex/rates?base=${deviseA}&token=c2oemgqad3i8sitlsfbg`)
        const body = await API.json()

        // récupéartion des données de change des devises pour affichage
        if(deviseB === "EUR"){
          setAmountB(Math.round(body.quote.EUR * 100) / 100) // Montant des devises (chiffre arrondi)
        } else if(deviseB === "USD"){
          setAmountB(Math.round(body.quote.USD * 100) / 100)
        } else if(deviseB === "GBP"){
          setAmountB(Math.round(body.quote.GBP * 100) / 100)
        } else if(deviseB === "CAD"){
          setAmountB(Math.round(body.quote.CAD * 100) / 100)
        } else if(deviseB === "AUD"){
          setAmountB(Math.round(body.quote.AUD * 100) / 100)
        } else if(deviseB === "CHF"){
          setAmountB(Math.round(body.quote.CHF * 100) / 100)
        } else if(deviseB === "JPY"){
          setAmountB(Math.round(body.quote.JPY * 100) / 100)
        } else if(deviseB === "CNY"){
          setAmountB(Math.round(body.quote.CNY * 100) / 100)
        } else if(deviseB === "AED"){
          setAmountB(Math.round(body.quote.AED * 100) / 100)
        } else {
          setAmountB(Math.round(body.quote.EUR * 100) / 100)
        }
        
      }
    if(deviseA && deviseB) {    // Condition pour valider la présence des données de la devise du pays
    findAPI()
    }
  }, [deviseA, deviseB])

  // Condition de vérification et affichage si l'état amountA est un nombre sinon afficher "?"
  if (isNaN(amountA) == true){
    var amountA1 = "?"
  } else {
    var amountA1 = amountA;
  }

  // Condition de vérification et affichage si l'état amountA est un nombre sinon afficher "?"
  if (isNaN(amountA) == true){
    var addAmount = "?"
  } else {
    var addAmount = amountA * amountB; // Calcul montant total * currency exchange
  }


  var now = new Date();  // date du jour
  now = now.toLocaleDateString();  // tranforme la date en xx/xx/2021

  // ----------------------------- RETURN -----------------------------//
  return (
    <View style={styles.container}>
        {/* ----------------------------------- Affichage du Header -------------------------------------- */}
        <Header containerStyle={{ backgroundColor: '#A1A1A1' }}
            leftComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="home" size={33} color="black"
                        onPress={() => props.navigation.navigate('DashboardScreen')} />}
            centerComponent={{ text: 'DEVISES', style: { color: '#fff', fontSize: 16, marginTop: 10 } }}
            rightComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="logout" size={30} color="black"
                        onPress={() => {props.addToken(null); props.navigation.navigate('HomePageScreen')}} />}
        />

        <View style={{alignSelf: "center"}}>
            <Text style={{ fontSize: 22, paddingBottom: 15, textAlign: 'center', marginTop: 20}}>Taux de change devises</Text>

        {/* ----------------------------------- Affichage du montant en € -------------------------------------- */}
            <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 10 }}>Entrer le montant :</Text>
            <Input containerStyle={ styles.amount } inputContainerStyle={{alignItems: "center"}} placeholder='1.00€' onChangeText={(val) => setAmountA(val)} />

        {/* ----------------------------------- Sélecteur de la devise -------------------------------------- */}
            <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 10 }}>De :</Text>
            <RNPickerSelect
                placeholder={{ label: 'Selectionner votre devise', value: 'null' }}
                style={{ ...pickerSelectStyles }}
                onValueChange={(value) => {console.log(value); setDeviseA(value)}}
                items={[
                    { label: 'EUR - Euro', value: 'EUR' },
                    { label: 'USD - Dollar US', value: 'USD' },
                    { label: 'GBP - Livre Britannique', value: 'GBP' },
                    { label: 'CAD - Dollar Canadien', value: 'CAD' },
                    { label: 'AUD - Dollar Australien', value: 'AUD' },
                    { label: 'CHF - Franc Suisse', value: 'CHF' },
                    { label: 'JPY - Yen Japonais', value: 'JPY' },
                    { label: 'CNY - Yuan Chinois', value: 'CNY' },
                    { label: 'AED - Dirham EAU', value: 'AED' },
                ]}
            />

        {/* ----------------------------------- Sélecteur de la devise -------------------------------------- */}
            <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 10 }}>Vers :</Text>
            <RNPickerSelect
                placeholder={{ label: 'Selectionner votre devise', value: 'null' }}
                style={{ ...pickerSelectStyles }}
                onValueChange={(value) => {console.log(value); setDeviseB(value)}}
                items={[
                    { label: 'EUR - Euro', value: 'EUR' },
                    { label: 'USD - Dollar US', value: 'USD' },
                    { label: 'GBP - Livre Britannique', value: 'GBP' },
                    { label: 'CAD - Dollar Canadien', value: 'CAD' },
                    { label: 'AUD - Dollar Australien', value: 'AUD' },
                    { label: 'CHF - Franc Suisse', value: 'CHF' },
                    { label: 'JPY - Yen Japonais', value: 'JPY' },
                    { label: 'CNY - Yuan Chinois', value: 'CNY' },
                    { label: 'AED - Dirham EAU', value: 'AED' },
                ]}
            />
        </View>

        {/* ----------------------------------- Affichage du change de devise en temps réel -------------------------------------- */}
        <Card containerStyle={{borderRadius: 20, height:150, width: 300, marginTop:50, alignSelf:"center" }} >
            <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center", marginTop: 10 }}>Exchange au {now} {"\n"}</Text>
            <Text style={{ fontSize: 18, alignSelf: "center", marginTop: 10 }}>{amountA1} {deviseA} = {addAmount} {deviseB}</Text>
        </Card>
        
        {/* ----------------------------------- Bouton "retour" -------------------------------------- */}
        <View style={{marginTop: 50}}>
            <Button
            buttonStyle={{ borderRadius: 20, backgroundColor: '#fff', width: 300, height: 50, alignSelf: 'center', borderColor: '#e1191d' }}
            title="Retour"
            titleStyle={{ color: '#e1191d' }}
            type="outline"
            onPress={() => props.navigation.navigate('DashboardScreen')}
            />
        </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E6E6',
  },
  amount:{
    alignSelf: "center",
    marginTop: 10,
    width: 300,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    borderRadius: 20,
  },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      width: 300,
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
      marginTop: 10,
      marginHorizontal: 37,
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'center',
      borderRadius: 20,
    },
  })

function mapStateToProps(state) {
  return { token: state.token }
}

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
)(CurrencyScreen);
