import {Component} from 'react'
import firebase from 'firebase'
import PropTypes from 'prop-types'

export class RidesProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    rides: undefined,
  }

  componentDidMount() {
    const {uid} = firebase.auth().currentUser
    firebase
      .database()
      .ref(`/rides/${uid}`)
      .on('value', snap => {
        this.setState({
          rides: snap.val(),
        })
      })
  }

  render() {
    const {rides} = this.state
    const {children} = this.props
    return children({
      loading: rides === undefined,
      empty: rides === null,
      rides,
    })
  }
}
