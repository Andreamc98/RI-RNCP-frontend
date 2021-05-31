import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

function IntroductionScreen(props) {
  const [dataUsers, setdataUsers] = useState("");



// ----------------------------- Ajout du prénom de l'utilisateur dans la page d'introduction -----------------------------//
  useEffect(() => {
    const findUsername = async () => {
      const dataUsers = await fetch(`https://rocketinvesting.herokuapp.com/introduction?token=${props.token}`)
      const body = await dataUsers.json()
      setdataUsers(body.username)
    }
    findUsername()
  }, [props.token])


  // ----------------------------- RETURN -----------------------------//
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}> Bonjour {dataUsers} ! </Text>
      <Text style={styles.paragraph}>    Bienvenue sur l'application Rocket Investing. La première application boursière qui facilite tes investissements long terme.</Text>
      <Text style={styles.paragraph}>    Cette application a été conçue pour faciliter l'investissements boursier des particuliers qui ne possèdent aucune connaissance en finance de marché.</Text>
      <Text style={styles.paragraph}>    Laissez-nous vous guider pas à pas dans la définition de votre stratégie boursière long terme et appliquez facilement nos conseils pour placer votre argent.</Text>

      <View style={{marginBottom: 100}}>
        <Button buttonStyle={{ backgroundColor: "#e1191d", marginBottom: 15, alignItems: 'baseline', width: 250, height: 50, alignSelf: 'center' }}
          title="Accès aux portefeuilles"
          titleStyle={{ paddingTop: 5 }}
          type="solid"
          onPress={() => props.navigation.navigate('StrategyListScreen')}
        />

        <Button
          type="outline"
          buttonStyle={{ backgroundColor: '#fff', width: 250, height: 50, alignSelf: 'center', borderColor: '#e1191d' }}
          title="Déconnexion"
          titleStyle={{ color: '#e1191d' }}
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

  // ----------------------------- style titre de la page -----------------------------//
  titleText: {
    marginTop: 100,
    fontSize: 20,
    fontWeight: "bold",
  },

  // ----------------------------- style div contenant les paragraphes -----------------------------//
  paragraphs: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ----------------------------- style paragraphes -----------------------------//
  paragraph: {
    width: 300,
    fontSize: 15,
    textAlign: 'justify',
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
)(IntroductionScreen);
