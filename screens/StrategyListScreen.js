import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { connect } from 'react-redux'
import { Octicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native'
import { Header, Button, Divider, Overlay } from 'react-native-elements'

function StrategyListScreen(props) {
  const [visibleStrategy, setVisibleStrategy] = useState(false)
  const [visiblePrudent, setVisiblePrudent] = useState(false)
  const [visibleEquilibre, setVisibleEquilibre] = useState(false)
  const [visibleAudacieux, setVisibleAudacieux] = useState(false)

  const [strategyValue, setStrategyValue] = useState('')
  const [profilName, setProfilName] = useState([])
  const [uniqueName, setUniqueName] = useState('')

  // Show or Hide Strategy Popup
  const toggleOverlayStrategy = () => {
    setVisibleStrategy(!visibleStrategy)
  }

  // Show or Hide Prudent Profil Popup
  const toggleOverlayPrudent = () => {
    setVisiblePrudent(!visiblePrudent)
  }

  // Show or Hide Equilibre Profil Popup
  const toggleOverlayEquilibre = () => {
    setVisibleEquilibre(!visibleEquilibre)
  }

  // Show or Hide Audacieux Profil Popup
  const toggleOverlayAudacieux = () => {
    setVisibleAudacieux(!visibleAudacieux)
  }

  // Send Strategy and profilType to backend
  const handleStrategy = async (param) => {
    const dataStrategy = await fetch('https://rocketinvesting.herokuapp.com/strategy', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `strategy=${ param }`
    })

    const body = await dataStrategy.json()

    // Send Wallet Name to Redux Store
    props.onSave(uniqueName)
    setProfilName(body.profilName)
  }

  const handleUniqueName = name => {
    // Send unique Name to Reducer
    props.onSave(name)
  }

  // Text if no strategy selected
  var strategySelected = <Text style={ styles.message }>Pas de Stratégie selectionnée</Text>

  // Show list of wallets
  if (strategyValue !== '' && strategyValue !== 'null') {
    strategySelected = <View>
      <View>
          <Text
            style={{
              marginTop: 50,
              marginBottom: 10
            }}
            onPress={ toggleOverlayPrudent }
          >
            Profil prudent <Octicons name="question" size={16} color="black" />
          </Text>

          {/* // Popup */}
          <Overlay
            isVisible={ visiblePrudent }
            onBackdropPress={ toggleOverlayPrudent }
            overlayStyle={{
              width: 300,
              height: 300,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text>Profil PRUDENT</Text>
            <Text>risque de perte 0 à 5%</Text>
            <Button
              title="OK"
              buttonStyle={{
                width: 80,
                height: 50,
                marginTop: 40,
                backgroundColor: '#e1191d'
              }}
              onPress={ toggleOverlayPrudent }
            />
          </Overlay>

          {/* ----------------------------- First Wallet ---------------------------- */}

          {/* // Wallet Name */}
          <View style={ styles.profilContainer }>
            <Text style={ styles.portefeuil }>{ profilName[0] }</Text>
            <Button
              title="détails"
              buttonStyle={{
                backgroundColor: '#e1191d',
                width: 80,
                height: 50
              }}
              onPress={ () => {
                props.navigation.navigate('PortfolioScreen');
                handleUniqueName(profilName[0])
              }}
            />
          </View>
        </View>

      <View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10
          }}
          onPress={ toggleOverlayEquilibre }
        >
          Profil équilibré <Octicons name="question" size={16} color="black" />
        </Text>

        {/* // Popup */}
        <Overlay
          isVisible={ visibleEquilibre }
          onBackdropPress={ toggleOverlayEquilibre }
          overlayStyle={{
            width: 300,
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>Profil EQUILIBRE</Text>
          <Text>risque de perte 5% à 20%</Text>
          <Button
            title="OK"
            buttonStyle={{
              width: 80,
              height: 50,
              marginTop: 40,
              backgroundColor: '#e1191d'
            }}
            onPress={ toggleOverlayEquilibre }
          />
        </Overlay>

        {/* ----------------------------- Second Wallet ---------------------------- */}

        {/* // Wallet Name */}
        <View style={ styles.profilContainer }>
          <Text style={ styles.portefeuil }>{ profilName[1] }</Text>
          <Button
            title="détails"
            buttonStyle={{
              backgroundColor: '#e1191d',
              width: 80,
              height: 50
            }}
            onPress={ () => {
                props.navigation.navigate('PortfolioScreen');
                handleUniqueName(profilName[1])
              }}
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10
          }}
          onPress={ toggleOverlayAudacieux }
        >
          Profil audacieux <Octicons name="question" size={16} color="black" />
        </Text>

        {/* // Popup */}
        <Overlay
          isVisible={ visibleAudacieux }
          onBackdropPress={ toggleOverlayAudacieux }
          overlayStyle={{
            width: 300,
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>Profil AUDACIEUX</Text>
          <Text>risque de perte 20% à 50%</Text>
          <Button
            title="OK"
            buttonStyle={{
              width: 80,
              height: 50,
              marginTop: 40,
              backgroundColor: '#e1191d'
            }}
            onPress={ toggleOverlayAudacieux }
          />
        </Overlay>

        {/* ----------------------------- Third Wallet ---------------------------- */}

        {/* // Wallet Name */}
        <View style={ styles.profilContainer }>
          <Text style={ styles.portefeuil }>{ profilName[2] }</Text>
          <Button
            title="détails"
            buttonStyle={{
              backgroundColor: '#e1191d',
              width: 80,
              height: 50,
            }}
            onPress={ () => {
                props.navigation.navigate('PortfolioScreen');
                handleUniqueName(profilName[2])
              }}
          />
        </View>
      </View>
    </View>
  }

  return (
    <View style={ styles.container }>

      <Header
        containerStyle={{ backgroundColor: '#2c2c2c' }}
        leftComponent={<Button title='Mes Favoris' buttonStyle={{ width: 130, color: '#fff', backgroundColor: '#2c2c2c' }} onPress={() => props.navigation.navigate('WishListScreen')} />}
        rightComponent={<Button title='Déconnexion' buttonStyle={{ width: 130, color: '#fff', backgroundColor: '#2c2c2c' }} onPress={() => {props.addToken(null); props.navigation.navigate('HomePageScreen')}} />}
      />

      <Text style={styles.title, { marginTop: 20 }}>Liste des Stratégies</Text>
      <Text style={styles.title}>(Sélection manuelle)</Text>
      <Divider style={{ backgroundColor: 'gray', marginTop: 30 }} />

      {/* // Select Strategy */}
      <RNPickerSelect
        placeholder={{
          label: 'Select Stratégie...',
          value: 'null'
        }}
        style={{ ...pickerSelectStyles }}
        onValueChange={ (value) => {
          setStrategyValue(value)
          handleStrategy(value)
        }}
        items={[
          { label: "Stratégie ACTIVE", value: "active" },
          { label: "Stratégie PASSIVE", value: "passive" },
        ]}
      />

      <Text
        style={ styles.text }
        onPress={ toggleOverlayStrategy }
      >
        Voir détails stratégie
      </Text>

      {/* // Popup */}
      <Overlay
        isVisible={ visibleStrategy }
        onBackdropPress={ toggleOverlayStrategy }
        overlayStyle={{
          width: 300,
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>Stratégie { strategyValue.toUpperCase() }</Text>
        <Text style={ styles.popupStrategy }>
        {
          strategyValue === 'active'
          ? 'Intervention 1 fois par MOIS sur le portefeuille'
          : 'Intervention 1 fois par TRIMESTRE sur le portefeuille'
        }
        </Text>
        <Button
          title="OK"
          buttonStyle={{
            width: 80,
            height: 50,
            marginTop: 40,
            backgroundColor: '#e1191d'
          }}
          onPress={ toggleOverlayStrategy }
        />
      </Overlay>

      { strategySelected }

      <Button
        buttonStyle={{ backgroundColor: '#fff', width: 200, height: 50, alignSelf: 'center', borderColor: 'black', marginTop: 50 }}
        title="Retour"
        titleStyle={{ color: 'black' }}
        type="outline"
        onPress={ () => props.navigation.navigate('WishListScreen') }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
  },
  text: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'left',
    fontSize: 16,
  },
  profilContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center'
  },
  portefeuil: {
    width: '73%',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 18,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    color: '#e1191d',
    textAlign: 'center'
  },
  message: {
    marginTop: 130,
    fontSize: 16,
    fontWeight: 'bold'
  },
  popupStrategy: {
    marginTop: 30,
    textAlign: 'center'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center'
  },
})


// Dispatch Wallet Name to Redux Store
function mapDispatchToProps(dispatch) {
  return {
    onSave: function (name) {
      dispatch({
        type: 'saveWishlist',
        name: name
      })
    },
    addToken: function (token) {
      dispatch({ type: 'saveToken', token: token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(StrategyListScreen)