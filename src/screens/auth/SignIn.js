import React, {Component} from 'react'
import {Constants} from 'expo'
import {Button, Text, Title} from 'native-base'
import {TextInput} from 'react-native'
import {Field, Form} from 'react-final-form'
import firebase from 'firebase'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.View`
  padding-top: ${Constants.statusBarHeight};
  padding-left: 24px;
  padding-right: 24px;
`

export class SignIn extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    error: null,
  }

  signIn = ({email, password}) => {
    const {navigation} = this.props
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Main')
      })
      .catch(error => {
        this.setState({error: error.message})
      })
  }

  render() {
    return (
      <Form onSubmit={this.signIn}>
        {({handleSubmit}) => (
          <Container style={{paddingTop: Constants.statusBarHeight}}>
            <Title>SIGN INTO SCOOTER TRACKER</Title>
            <Field name={'email'}>
              {({input}) => (
                <TextInput
                  placeholder={'email'}
                  onChangeText={v => input.onChange(v)}
                  value={input.value}
                />
              )}
            </Field>
            <Field name={'password'}>
              {({input}) => (
                <TextInput
                  placeholder={'password'}
                  secureTextEntry={true}
                  onChangeText={v => input.onChange(v)}
                  value={input.value}
                />
              )}
            </Field>

            <Button
              full
              primary
              style={{paddingBottom: 4}}
              onPress={handleSubmit}
            >
              <Text> Login </Text>
            </Button>
            <Button full light primary>
              <Text> Sign Up </Text>
            </Button>
            {this.state.error && <Text>{this.state.error}</Text>}
          </Container>
        )}
      </Form>
    )
  }
}
