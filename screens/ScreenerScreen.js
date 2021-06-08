import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native'
import { Header, Button, Card, Badge } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select'
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

function ScreenerScreen(props) {
  const [dataAPI1, setDataAPI1] = useState();
  const [dataAPI2, setDataAPI2] = useState();
  const [action, setAction] = useState();

  const isFocused = useIsFocused();

  // ----------------------------- Appel à l'API Bourse ----------------------------- //
  // Pour récupéartion des données boursières (Currency)
  useEffect(() => {
    const findAPI = async () => {
        const API1 = await fetch(`https://finnhub.io/api/v1/quote?symbol=${action}&token=c2oemgqad3i8sitlsfbg`)
        const body1 = await API1.json()
        setDataAPI1(body1)
        const API2 = await fetch(`https://finnhub.io/api/v1/scan/technical-indicator?symbol=${action}&resolution=D&token=c2oemgqad3i8sitlsfbg`)
        const body2 = await API2.json()
        setDataAPI2(body2)
      }
    if(action && isFocused) {    // Condition pour valider la présence des données de la devise du pays
    findAPI()
    }
  }, [action, isFocused])

  var data;
  if (dataAPI2 && dataAPI1 && dataAPI1.c != 0){

    // changement de couleurs teandance marché
    var color;
    if(dataAPI2.technicalAnalysis.signal === "neutral"){
      color = "warning"
    } else if(dataAPI2.technicalAnalysis.signal === "sell"){
      color = "error"
    } else if(dataAPI2.technicalAnalysis.signal === "buy"){
      color = "success"
    }

    // changement de couleurs action jounrée positive / négative
    var colorDay1;
    if(dataAPI1.c >= dataAPI1.pc){
      colorDay1 = "green"
    } else if(dataAPI1.c < dataAPI1.pc){
      colorDay1 = "red"
    }

    // changement de couleurs action jounrée positive / négative
    var colorDay2;
    if(dataAPI1.o >= dataAPI1.pc){
      colorDay2 = "green"
    } else if(dataAPI1.o < dataAPI1.pc){
      colorDay2 = "red"
    } 

    // Affichage des données récupérées de l'API
    data = <Card containerStyle={{borderRadius: 20, height:350, width: 340, marginTop:40, alignSelf:"center" }} >
              <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 20, marginBottom:10, fontWeight: "bold" }}>Cours de l'action :</Text>
              <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 0 }}>Cours actuel: <Text style={{ color: colorDay1 }}>{dataAPI1.c} €</Text></Text>
              <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 0 }}>Cours de d'ouverture: <Text style={{ color: colorDay2 }}>{dataAPI1.o} €</Text></Text>
              <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 0 }}>Cours de cloture précédent: {dataAPI1.pc} €{"\n"}</Text>

              <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 0, marginBottom:10, fontWeight: "bold" }}>Tendance de l'action :</Text>
              <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 0 }}>Signal Buy: {dataAPI2.technicalAnalysis.count.buy}/10</Text>
              <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 0 }}>Signal Buy: {dataAPI2.technicalAnalysis.count.neutral}/10 </Text>
              <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 0 }}>Signal Buy: {dataAPI2.technicalAnalysis.count.sell}/10 {"\n"}{"\n"}</Text>
              <Badge  value={<Text>Tendance globale: {dataAPI2.technicalAnalysis.signal} </Text>}
                      status={color}
                      containerStyle={{fontSize: 16, fontWeight: "bold"}}
                      badgeStyle={{width:230, height:30, fontSize: 16, fontWeight: "bold", borderRadius:20}}
                      />
          </Card>
  } else {
    // Affichage si aucune données récupérées de l'API
    data = <Card containerStyle={{borderRadius: 20, height:350, width: 340, marginTop:40, alignSelf:"center" }} >
              <Text style={{ fontSize: 15, alignSelf: "center", marginTop: 150, fontWeight: "bold" }}>Aucune action sélectionnée </Text>
          </Card>
  }

  // ------------------------------------------------ RETURN -----------------------------------------------//
  return (
    <View style={styles.container}>
        {/* ----------------------------------- Affichage du Header -------------------------------------- */}
        <Header containerStyle={{ backgroundColor: '#A1A1A1' }}
            leftComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="home" size={33} color="black"
                        onPress={() => props.navigation.navigate('DashboardScreen')} />}
            centerComponent={{ text: 'SCREENER', style: { color: '#fff', fontSize: 16, marginTop: 10 } }}
            rightComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="logout" size={30} color="black"
                        onPress={() => {props.addToken(null); props.navigation.navigate('HomePageScreen')}} />}
        />

        {/* ----------------------------------- Sélecteur de l'action boursière -------------------------------------- */}
        <Text style={{ fontSize: 22, paddingBottom: 0, textAlign: 'center', marginTop: 20}}>Sélectionner l'action pour</Text>
        <Text style={{ fontSize: 22, paddingBottom: 20, textAlign: 'center', marginTop: 0}}>voir son cours actuel</Text>
            <RNPickerSelect
                placeholder={{ label: 'Selectionner une action', value: 'null' }}
                style={{ ...pickerSelectStyles }}
                onValueChange={(value) => {console.log(value); setAction(value)}}
                items={[
                    { label: 'ETF: SPY - SP500', value: 'SPY' },
                    { label: 'ETF: QQQ - NASDAQ', value: 'QQQ' },
                    { label: 'ETF: URTH - MSCI World', value: 'URTH' },
                    { label: 'ETF: VTV - Large cap value ', value: 'VTV' },
                    { label: 'ETF: IWM - Mid cap', value: 'IWM' },
                    { label: 'ETF: IJH - Mid cap growth', value: 'IJH' },
                    { label: 'ETF: VOE - Mid cap value', value: 'VOE' },
                    { label: 'ETF: VIOG - Small cap growth', value: 'VIOG' },
                    { label: 'ETF: VIOV - Small cap value', value: 'VIOV' },
                    { label: 'ETF: IEUS - MSCI EUR Small cap', value: 'IEUS' },
                    { label: 'ETF: VWO - Marchés émergents', value: 'VWO' },
                    { label: 'ETF: IAU - GOLD', value: 'IAU' },
                    { label: 'ETF: TLT - Obligations LT US 20+ ', value: 'TLT' },
                    { label: 'ETF: IEF - Obligations MT US 10+ ', value: 'IEF' },
                ]}
            />

        {/* -------------------- Affichage des données de l'action en temps réel --------------------- */}
        {data}

        {/* ----------------------------------- Bouton "retour" -------------------------------------- */}
        <View style={{marginTop: 40}}>
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
    alignItems: 'center',
    backgroundColor: '#E7E6E6',
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

// supression du Token lors de la déconnexion
function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'saveToken', token: token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenerScreen);
