import React, { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

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
            buttonStyle={{ backgroundColor: '#fff', width: 250, height: 50, alignSelf: 'center', borderColor: '#e1191d', marginBottom: 10 }}
            title={data.name}
            titleStyle={{ color: '#e1191d' }}
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
    portefeuille = <Text style={{ alignSelf:'center',fontSize: 15, marginTop: 250, fontWeight: "bold" }}>Aucun portefeuille enregistré</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Bonjour {dataUsers.username}</Text>
      <Text style={styles.titleFavorite}>Mes portefeuilles favoris :</Text>
      <ScrollView style={{width:500, height:'auto'}}>
        <View style={styles.listButton}>

          {portefeuille}

        </View>
      </ScrollView>

      <View style={{marginBottom:100}}>
        <Button buttonStyle={{ backgroundColor: "#e1191d", marginBottom: 15, alignItems: 'baseline', width: 300, height: 50, alignSelf: 'center' }}
          title="Ajouter un nouveau produit"
          titleStyle={{ paddingTop: 5 }}
          type="solid"
          onPress={() => props.navigation.navigate('StrategyListScreen')}
        />
        <Button
          buttonStyle={{ backgroundColor: '#fff', width: 300, height: 50, alignSelf: 'center', borderColor: '#e1191d' }}
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
    backgroundColor: '#fff',
  },

  // ----------------------------- style titre des favoris -----------------------------//

  titleFavorite: {
    fontSize: 20,
    paddingBottom: 15,
    textAlign: 'center',
  },

  // ----------------------------- style titre de la page -----------------------------//

  titleText: {
    fontSize: 20,
    marginTop: 100,
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
