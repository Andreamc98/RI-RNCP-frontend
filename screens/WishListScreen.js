import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function WishListScreen(props) {
  const [dataUsers, setdataUsers] = useState('');
  const [dataPortofolio, setDataPortofolio] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  const isFocused = useIsFocused();

// ----------------------------- Ajout du prénom de l'utilisateur dans la page d'introduction -----------------------------//

  useEffect(() => {
    const findUsername = async () => {
      const dataUsers = await fetch(`https://rocketinvesting.herokuapp.com/wishList?token=${props.token}`)
      const body = await dataUsers.json()
      setdataUsers(body)
      setDataPortofolio(body.portofolios.portofoliosId)
    }
    if(props.token && isFocused) {
    findUsername()
    }
  }, [isFocused, isToggled])

  // ----------------------------- Supprimer un article -----------------------------//
  var deleteArticle = async (i) => {
    const deleteReq = await fetch('https://rocketinvesting.herokuapp.com/wishlist', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `position=${i}&token=${props.token}`
    })
      const body = await deleteReq.json()
      if (body.result) {
        setIsToggled(!isToggled)
      }
  }

  let portefeuille = [];
  if (dataPortofolio && dataUsers.result && isFocused) {

    portefeuille = <View>
      {dataPortofolio.map((data, i) => {
        return <View key={i} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Button
            buttonStyle={{ borderRadius: 10, backgroundColor: '#fff', width: 250, height: 50, alignSelf: 'center', borderColor: "#0DA41C", marginBottom: 10 }}
            title={data.name}
            titleStyle={{ color: "#0DA41C" }}
            type="outline"
            onPress={() => { props.onSave(data.name); props.navigation.navigate('PortfolioScreen') }}
          />
          <Entypo style={{marginBottom: 10}}
            name="squared-cross"
            size={55}
            color="#e1191d"
            onPress={() => deleteArticle(i)}
            />
        </View>
      })}
    </View>
  } else {
    portefeuille = <Text style={{ alignSelf:'center',fontSize: 15, marginTop: 190, fontWeight: "bold" }}>Aucun portefeuille enregistré</Text>
  }

  return (
    <View style={styles.container}>

      {/* ----------------------------------- Affichage du Header -------------------------------------- */}
      <Header containerStyle={{ backgroundColor: '#A1A1A1' }}
        leftComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="home" size={33} color="black"
                      onPress={() => props.navigation.navigate('DashboardScreen')} />}
        centerComponent={{ text: 'MES FAVORIS', style: { color: '#fff', fontSize: 16, marginTop: 10 } }}
        rightComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="logout" size={30} color="black"
                      onPress={() => {props.addToken(null); props.navigation.navigate('HomePageScreen')}} />}
      />

      <Text style={styles.titleText}>Bonjour {dataUsers.username}</Text>
      <Text style={styles.titleFavorite}>Mes portefeuilles favoris :</Text>

      <Card containerStyle={{ borderRadius: 10, height: 430, marginBottom: 30 }}>
      <ScrollView style={{width: 310, height:'auto'}}>
        
        <View style={{}}>

          {portefeuille}

        </View>
        
      </ScrollView>
      </Card>

      <View style={{marginBottom:50}}>
        <Button buttonStyle={{ borderRadius: 20, backgroundColor: "#e1191d", marginBottom: 15, alignItems: 'baseline', width: 300, height: 50, alignSelf: 'center' }}
          icon={<AntDesign style={{ marginRight: 7 }} name="pluscircleo" size={25} color="white" />}
          title="Ajouter un nouveau produit"
          titleStyle={{ paddingTop: 5 }}
          type="solid"
          onPress={() => props.navigation.navigate('StrategyListScreen')}
        />
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E7E6E6',
  },

  // ----------------------------- style titre des favoris -----------------------------//

  titleFavorite: {
    fontSize: 22,
    paddingBottom: 15,
    textAlign: 'center',
  },

  // ----------------------------- style titre de la page -----------------------------//

  titleText: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: "bold",
  },

  paragraph: {
    padding: 15,
    fontSize: 15,
  },
})


function mapStateToProps(state) {
  return { token: state.token }
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: function (name) {
      dispatch({ type: 'saveWishlist', name : name })
    },
    addToken: function (token) {
      dispatch({ type: 'saveToken', token: token })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WishListScreen);
