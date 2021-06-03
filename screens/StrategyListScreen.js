import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { connect } from 'react-redux'
import { Octicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native'
import { Header, Button, Divider, Overlay, Card } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';

function StrategyListScreen(props) {
  const [visibleStrategy, setVisibleStrategy] = useState(false)
  const [visiblePrudent, setVisiblePrudent] = useState(false)
  const [visibleEquilibre, setVisibleEquilibre] = useState(false)
  const [visibleAudacieux, setVisibleAudacieux] = useState(false)

  const [strategyValue, setStrategyValue] = useState('')
  const [profilName, setProfilName] = useState([])

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
              marginTop: 10,
              marginBottom: 10,
              fontSize: 12,
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
              alignItems: 'center',
              borderRadius: 10, 
            }}
          >
            <Text>Profil PRUDENT</Text>
            <Text>risque de perte 0 à 5%</Text>
            <Button
              title="OK"
              buttonStyle={{
                width: 60,
                height: 50,
                marginTop: 40,
                backgroundColor: '#e1191d',
                borderRadius: 20, 
              }}
              onPress={ toggleOverlayPrudent }
            />
          </Overlay>

          {/* ----------------------------- First Wallet ---------------------------- */}

          {/* // Wallet Name */}
          <View style={ styles.profilContainer }>
            <Text style={ styles.portefeuil }>{ profilName[0] }</Text>
            <AntDesign style={{marginLeft: 3}}
                name="rightsquare" 
                size={50} 
                color="#e1191d" 
                onPress={ () => { props.navigation.navigate('PortfolioScreen');
                                  handleUniqueName(profilName[0])
                                }}
                />
          </View>
        </View>

      <View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 12,
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
            alignItems: 'center',
            borderRadius: 10, 
          }}
        >
          <Text>Profil EQUILIBRE</Text>
          <Text>risque de perte 5% à 20%</Text>
          <Button
            title="OK"
            buttonStyle={{
              width: 60,
              height: 50,
              marginTop: 40,
              backgroundColor: '#e1191d',
              borderRadius: 20, 
            }}
            onPress={ toggleOverlayEquilibre }
          />
        </Overlay>

        {/* ----------------------------- Second Wallet ---------------------------- */}

        {/* // Wallet Name */}
        <View style={ styles.profilContainer }>
          <Text style={ styles.portefeuil }>{ profilName[1] }</Text>
          <AntDesign style={{marginLeft: 3}}
                name="rightsquare" 
                size={50} 
                color="#e1191d" 
                onPress={ () => { props.navigation.navigate('PortfolioScreen');
                                  handleUniqueName(profilName[1])
                                }}
          />
        </View>
      </View>

      <View>
        <Text
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 12,
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
            alignItems: 'center',
            borderRadius: 10, 
          }}
        >
          <Text>Profil AUDACIEUX</Text>
          <Text>risque de perte 20% à 50%</Text>
          <Button
            title="OK"
            buttonStyle={{
              width: 60,
              height: 50,
              marginTop: 40,
              backgroundColor: '#e1191d',
              borderRadius: 20, 
            }}
            onPress={ toggleOverlayAudacieux }
          />
        </Overlay>

        {/* ----------------------------- Third Wallet ---------------------------- */}

        {/* // Wallet Name */}
        <View style={ styles.profilContainer }>
          <Text style={ styles.portefeuil }>{ profilName[2] }</Text>
          <AntDesign style={{marginLeft: 3}}
                name="rightsquare" 
                size={50} 
                color="#e1191d" 
                onPress={ () => { props.navigation.navigate('PortfolioScreen');
                                  handleUniqueName(profilName[2])
                                }}
          />
        </View>
      </View>
    </View>
  }

  var detailStrategy;
  if (strategyValue === 'active' || strategyValue === 'passive'){
    detailStrategy = <Text
                        style={ styles.text }
                        onPress={ toggleOverlayStrategy }
                      >
                      Détails stratégie <Octicons name="question" size={16} color="black" />
                    </Text>
  } else {
    detailStrategy = <Text>{"\n"}</Text>
  }

  return (
    <View style={ styles.container }>

      <Header containerStyle={{ backgroundColor: '#A1A1A1' }}
        leftComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="home" size={33} color="black"
                      onPress={() => props.navigation.navigate('DashboardScreen')} />}
        centerComponent={{ text: 'STRATEGIES', style: { color: '#fff', fontSize: 16, marginTop: 10 } }}
        rightComponent={<AntDesign style={{alignSelf: "center", color: '#fff', marginBottom: 10}} name="logout" size={30} color="black"
                      onPress={() => {props.addToken(null); props.navigation.navigate('HomePageScreen')}} />}
      />

      <Text style={styles.title, { fontSize: 20, fontWeight: "bold", marginTop: 20 }}>Sélectionner une stratégie</Text>
      <Divider style={{ backgroundColor: 'gray', marginTop: 20 }} />

      {/* // Select Strategy */}
      <RNPickerSelect
        placeholder={{ label: 'Sélection...', value: 'null' }}
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

      {detailStrategy}

      {/* // Popup */}
      <Overlay
        isVisible={ visibleStrategy }
        onBackdropPress={ toggleOverlayStrategy }
        overlayStyle={{
          width: 300,
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10, 
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
            width: 60,
            height: 50,
            marginTop: 40,
            backgroundColor: '#e1191d',
            borderRadius: 20, 
          }}
          onPress={ toggleOverlayStrategy }
        />
      </Overlay>
      
      <Card containerStyle={{ borderRadius: 10, width: 340, height: 350, marginBottom: 40, alignItems:"center" }}>
      { strategySelected }
      </Card>

      <Button
        buttonStyle={{ borderRadius: 20, backgroundColor: '#fff', width: 300, height: 50, alignSelf: 'center', borderColor: '#e1191d', marginTop: 10 }}
        title="Retour"
        titleStyle={{ color: '#e1191d' }}
        type="outline"
        onPress={ () => props.navigation.navigate('DashboardScreen') }
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
    alignItems: 'center',
    backgroundColor: '#E7E6E6',
  },
  title: {
    textAlign: 'center',
  },
  text: {
    marginTop: 10,
    marginBottom: 20,
    color: 'black',
    textAlign: 'left',
    fontSize: 14,
  },
  profilContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center'
  },
  portefeuil: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 15,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    color: '#e1191d',
    textAlign: 'center',
    alignSelf: "center",
    borderRadius: 10,
  },
  message: {
    marginTop: 140,
    justifyContent: "center",
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
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginTop: 10,
    marginHorizontal: 37,
    borderWidth: 1,
    borderColor: '#e1191d',
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    borderRadius: 20,
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