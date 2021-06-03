import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function DashboardScreen(props) {
  const [dataUsers, setdataUsers] = useState('');

// ----------------------------- Ajout du prénom de l'utilisateur dans la page du Dashboard -----------------------------//

  useEffect(() => {
    const findUsername = async () => {
      const dataUsers = await fetch(`https://rocketinvesting.herokuapp.com/wishList?token=${props.token}`)
      const body = await dataUsers.json()
      setdataUsers(body)
    }
    if(props.token) {
    findUsername()
    }
  }, [])

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>Bonjour {dataUsers.username}</Text>
        <Text style={styles.titleDashboard}>Tableau de bord</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Card containerStyle={{ borderRadius: 20, width: 130, height:130 , marginTop: 0, marginBottom: 0 , alignItems: 'center', justifyContent: 'center', borderColor: '#7A25A4', backgroundColor: "#FDF9FF" }}>
                <AntDesign style={{alignSelf: "center", color: '#7A25A4'}} name="areachart" size={50} color="black"
                // Redirection vers la page StrategyListScreen
                onPress={() => props.navigation.navigate('StrategyListScreen') }
                />
                <Text style={{ fontSize: 16, paddingTop: 10, color: '#7A25A4', fontWeight: "bold" }}
                // Redirection vers la page StrategyListScreen
                onPress={() => props.navigation.navigate('StrategyListScreen') }
                >
                Stratégies</Text>
            </Card>
            <Card containerStyle={{ borderRadius: 20, width: 130, height:130 , marginTop: 0, marginBottom: 0 , alignItems: 'center', justifyContent: 'center', borderColor: '#F2A324', backgroundColor: "#FFFDF9" }}>
                <FontAwesome style={{alignSelf: "center", color: '#F2A324'}} name="star" size={50} color="black"
                // Redirection vers la page WishListScreen
                onPress={() => props.navigation.navigate('WishListScreen') }
                />
                <Text style={{ fontSize: 16, paddingTop: 10, color: '#F2A324', fontWeight: "bold" }}
                // Redirection vers la page WishListScreen
                onPress={() => props.navigation.navigate('WishListScreen') }
                >
                Mes favoris</Text>
            </Card>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Card containerStyle={{ borderRadius: 20, width: 130, height:130 , marginTop: 0, marginBottom: 0 , alignItems: 'center', justifyContent: 'center', borderColor: '#0DA41C', backgroundColor: "#FCFFF9" }}>
                <MaterialCommunityIcons style={{alignSelf: "center", color: '#0DA41C'}} name="monitor-screenshot" size={50} color="black" 
                // Redirection vers la page ScreenerScreen
                onPress={() => props.navigation.navigate('ScreenerScreen') }
                />
                <Text style={{ fontSize: 16, paddingTop: 10, color: '#0DA41C', fontWeight: "bold" }}
                // Redirection vers la page ScreenerScreen
                onPress={() => props.navigation.navigate('ScreenerScreen') }
                >
                  Screener</Text>
            </Card>
            <Card containerStyle={{ borderRadius: 20, width: 130, height:130 , marginTop: 0, marginBottom: 0 , alignItems: 'center', justifyContent: 'center', borderColor: '#3398EF', backgroundColor: "#F9FDFF"}}>
                <MaterialCommunityIcons style={{alignSelf: "center", color: '#3398EF'}} name="currency-eur" size={50} color="black" 
                // Redirection vers la page CurrencyScreen
                onPress={() => props.navigation.navigate('CurrencyScreen') }                
                />
                <Text style={{ fontSize: 16, paddingTop: 10, color: '#3398EF', fontWeight: "bold" }}
                // Redirection vers la page CurrencyScreen
                onPress={() => props.navigation.navigate('CurrencyScreen') }                 
                >
                  Devises</Text>
            </Card>
        </View>
        <View style={{marginTop: 50, marginBottom: 60}}>
            <Button
                buttonStyle={{ borderRadius: 15, backgroundColor: '#fff', width: 300, height: 50, alignSelf: 'center', borderColor: '#e1191d' }}
                icon={<AntDesign style={{ marginRight: 8 }} name="logout" size={25} color="#e1191d" />}
                title="Déconnexion"
                titleStyle={{ color: '#e1191d' }}
                type="outline"
                onPress={() => { props.addToken(null);
                                props.navigation.navigate('HomePageScreen')}}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E7E6E6',
    paddingTop: 20,
  },
  // ----------------------------- style titre du Dashboard -----------------------------//
  titleDashboard: {
    fontSize: 25,
    paddingBottom: 0,
    textAlign: 'center',
  },
  // ----------------------------- style titre de la page -----------------------------//
  titleText: {
    fontSize: 20,
    marginTop: 50,
    marginBottom: 0,
    fontWeight: "bold",
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
)(DashboardScreen);
