import {Component} from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'

export class AuthLoading extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    const {navigation} = this.props
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return navigation.navigate('Main')
      }
      return navigation.navigate('SignIn')
    })
  }

  render() {
    return null
  }
}
