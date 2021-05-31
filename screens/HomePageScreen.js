import React, { useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text, Overlay, Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';


function HomePageScreen(props) {
  // ------------------------------------- ETATS Overlay -------------------------------------
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);

  // ------------------------------------- ETATS SignUp/In -----------------------------------
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signInUsername, setSignInUsername] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

    // ------------------------------------- ETATS erreurs -----------------------------------
  const [errorsSignIn, setErrorsSignIn] = useState([])
  const [errorsSignUp, setErrorsSignUp] = useState([])

  // ------------------------------------- Gestion Sign Up -------------------------------------
  var handleSubmitSignUp = async () => {
    // Création du user sur la BDD via le POST
    var rawData = await fetch('https://rocketinvesting.herokuapp.com/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signUpUsername}&passwordFromFront=${signUpPassword}`
    })
    const body = await rawData.json()

    // Si user n'existe pas, result=true et création d'un token
    if (body.result == true) {
      // Enregistrement du token dans le store (dispatch - ligne 186)
      props.addToken(body.token)
      // Redirection vers la page IntroductionScreen
      props.navigation.navigate('IntroductionScreen')
      // Initialisation des messages d'erreurs vides lors du chargement de la page
      setErrorsSignUp([])
      setErrorsSignIn([])
      // Initialisation des input vides lors du chargement de la page
      setSignInUsername("")
      setSignInPassword("")
      // Overlay n'apparaitra pas lors du chagement de la page
      setSignUpVisible(false)
    } else {
      // si si result=false, renvoi des messages d'erreurs ('champs vides', 'utilisateur déjà présent') récupérés dans le backend
      setErrorsSignUp(body.error)
    }
  }

  // ------------------------------------- Gestion Sign In -------------------------------------
  var handleSubmitSignIn = async () => {
    // Recherche du user dans la BDD via le POST
    const data = await fetch('https://rocketinvesting.herokuapp.com/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `usernameFromFront=${signInUsername}&passwordFromFront=${signInPassword}`
    })
    // Transforme les données en tableau
    const body = await data.json()

    // Si user exist, result=true et récupération du token
    if (body.result == true) {
      // Enregistrement du token dans le store (dispatch - ligne 186)
      props.addToken(body.token)
      // Redirection vers la page WishListScreen
      props.navigation.navigate('WishListScreen')
      // Initialisation des messages d'erreurs vides lors du chargement de la page
      setErrorsSignIn([])
      setErrorsSignUp([])
      // Initialisation des input vides lors du chargement de la page
      setSignInUsername("")
      setSignInPassword("")
      // Overlay n'apparaitra pas lors du chagement de la page
      setSignInVisible(false)
    } else {
      // Si result=false, renvoi des messages d'erreurs ('champs vides', 'utilisateur inconnu', 'mot de passe incorrect') récupérés dans le backend
      setErrorsSignIn(body.error)
    }
  }

  // ---------------------- Msgs d'erreurs récupérés dans les routes du backend -----------------------------
  // Map sur les différents msg d'erreurs disponibles dans le backend et définis par les conditions: champs vide, existe déjà, ...
  // Si renvoi des msgs d'erreurs, affichage sous Input dans overlay (ligne 138 et 160)
  var errorsSignInMsg = <View>
    {errorsSignIn.map((error, i) => {
      return (<Text key={i} style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>)
    })}</View>

  var errorsSignUpMsg = <View>
    {errorsSignUp.map((error, i) => {
      return (<Text key={i} style={{ color: 'red', alignSelf: 'center' }}>{error}</Text>)
    })}</View>

  // --------------------------------------Gestion des Overlay -----------------------------------------
    // BackDropPress = fermeture possible de l'overlay en cliquant hors de ce dernier(ligne 133 et 155)
  const toggleOverlaySignUp = () => {
    setSignUpVisible(false);
  };
  const toggleOverlaySignIn = () => {
    setSignInVisible(false);
  };

  // -------------------------------------------------------------------------------------------------
  // -------------------------------------- RETURN ---------------------------------------------------
  // -------------------------------------------------------------------------------------------------
  return (

    <View style={styles.container}>

      <Text h1 style={styles.title}>Rocket Investing</Text>

      <Text style={styles.text}>L'application boursière qui facilite vos investissements à long terme</Text>

      <Image source={require('../assets/Rocket_logo.png')} style={styles.image} />

      <View style={{ marginBottom: 70 }}>

        {/* ----------------------------------- BOUTON SIGN UP -------------------------------------- */}
        <Button
          buttonStyle={{ backgroundColor: "#e1191d", marginBottom: 15, alignItems: 'baseline', width: 250, height: 50, alignSelf: 'center' }}
          title="Sign Up"
          titleStyle={{ paddingTop: 5 }}
          onPress={() => setSignUpVisible(true)}
        />
        {/* ----------------------------------- Overlay Sign In -------------------------------------- */}
        <Overlay isVisible={signUpVisible} overlayStyle={{ marginTop: -60, alignItems: 'center', justifyContent: 'center', width: 300, height: 350 }} onBackdropPress={toggleOverlaySignUp}>
          <Text h4>Sign Up</Text>
          <Text>Entrez votre nom et mot de passe</Text>
          <Input containerStyle={{ marginTop: 30, width: 200 }} placeholder='John' onChangeText={(val) => setSignUpUsername(val)} />
          <Input containerStyle={{ width: 200 }} secureTextEntry={true} placeholder='*********' onChangeText={(val) => setSignUpPassword(val)} />
          {errorsSignUpMsg}
          <Button
            buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 80, height: 50, alignSelf: 'center' }}
            title="Go"
            onPress={() => handleSubmitSignUp()}
          />
        </Overlay>

        {/* ----------------------------------- BOUTON SIGN IN -------------------------------------- */}
        <Button
          type="outline"
          buttonStyle={{ backgroundColor: '#fff', width: 250, height: 50, alignSelf: 'center', borderColor: '#e1191d' }}
          title="Sign In"
          titleStyle={{ color: '#e1191d' }}
          onPress={() => setSignInVisible(true)}
        />
        {/* ----------------------------------- Overlay Sign Up -------------------------------------- */}
        <Overlay isVisible={signInVisible} overlayStyle={{ marginTop: -60, alignItems: 'center', justifyContent: 'center', width: 300, height: 350 }} onBackdropPress={toggleOverlaySignIn}>
          <Text h4>Sign In</Text>
          <Text>Entrez votre nom et mot de passe</Text>
          <Input containerStyle={{ marginTop: 30, width: 200 }} placeholder='John' onChangeText={(val) => setSignInUsername(val)} />
          <Input containerStyle={{ width: 200 }} secureTextEntry={true} placeholder='*********' onChangeText={(val) => setSignInPassword(val)} />
          {errorsSignInMsg}
          <Button
            buttonStyle={{ backgroundColor: "#e1191d", marginTop: 40, width: 80, height: 50, alignSelf: 'center' }}
            title="Go"
            onPress={() => { handleSubmitSignIn(); errorsSignIn }}
          />
        </Overlay>
      </View>

    </View>
  )
}

// ----------------------- STYLE --------------------------
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  text: {
    marginTop: -20,
    marginLeft: 75,
    marginRight: 75,
    textAlign: 'center',
    fontSize: 18
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300
  }
})

//-------------DISPATCH DU TOKEN------------------- 
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
)(HomePageScreen)