import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native'
import { Header, Button, Input, Card } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select'
import { AntDesign } from '@expo/vector-icons';

function CurrencyScreen(props) {
  const [dataAPI, setDataAPI] = useState({});
  const [country, setCountry] = useState("EUR");
  const [amount, setAmount] = useState(1);

    // ----------------------------- Appel à l'API Bourse ----------------------------- //
  // Pour récupéartion des données boursières
  useEffect(() => {
    const findAPI = async () => {
        const API = await fetch(`https://finnhub.io/api/v1/forex/rates?base=${country}&token=c2oemgqad3i8sitlsfbg`)
        const body = await API.json()
        setDataAPI(body)
         }
    if(country) {    // Condition pour valider la présence des données de la devise du pays
    findAPI()
    }
  }, [country])

  console.log("dataAPI :", dataAPI)

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

            <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 10 }}>Montant :</Text>
            <Input containerStyle={ styles.amount } inputContainerStyle={{alignItems: "center"}} placeholder='1.00€' onChangeText={(val) => setAmount(val)} />

            <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 10 }}>De :</Text>
            <RNPickerSelect
                placeholder={{ label: 'Selectionner votre devise', value: 'EUR' }}
                style={{ ...pickerSelectStyles }}
                onValueChange={(value) => console.log(value)}
                items={[
                    { label: 'EUR - Euro', value: 'EUR' },
                    { label: 'USD - Dollar US', value: 'USD' },
                    { label: 'GBP - Livre Britannique', value: 'GBP' },
                    { label: 'CAD - Dollar Canadien', value: 'CAD' },
                    { label: 'AUD - Dollar Australien', value: 'AUD' },
                    { label: 'CHF - Franc Suisse', value: 'CHF' },
                    { label: 'JPY - Yen Japonais', value: 'CHF' },
                    { label: 'CNY - Yuan Chinois', value: 'CNY' },
                    { label: 'AED - Dirham EAU', value: 'AED' },
                ]}
            />

            <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 10 }}>Vers :</Text>
            <RNPickerSelect
                placeholder={{ label: 'Selectionner votre devise', value: 'EUR' }}
                style={{ ...pickerSelectStyles }}
                onValueChange={(value) => console.log(value)}
                items={[
                    { label: 'EUR - Euro', value: 'EUR' },
                    { label: 'USD - Dollar US', value: 'USD' },
                    { label: 'GBP - Livre Britannique', value: 'GBP' },
                    { label: 'CAD - Dollar Canadien', value: 'CAD' },
                    { label: 'AUD - Dollar Australien', value: 'AUD' },
                    { label: 'CHF - Franc Suisse', value: 'CHF' },
                    { label: 'JPY - Yen Japonais', value: 'CHF' },
                    { label: 'CNY - Yuan Chinois', value: 'CNY' },
                    { label: 'AED - Dirham EAU', value: 'AED' },
                ]}
            />
        </View>

        <Card containerStyle={{borderRadius: 20, width: 300, marginTop:50, alignSelf:"center" }} >
            <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 10 }}>Exchange = ???</Text>
        </Card>
        
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
    // justifyContent: 'space-around',
    // alignItems: 'center',
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
