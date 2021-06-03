import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';

function ScreenerScreen(props) {

  // ----------------------------- RETURN -----------------------------//
  return (
    <View style={styles.container}>

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
)(ScreenerScreen);
