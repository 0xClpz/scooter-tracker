import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyDaqIOj0_Sh5_-UfBLMAOLxmsmPKsrfkbk',
  authDomain: 'scooter-tracker-e4a80.firebaseapp.com',
  databaseURL: 'https://scooter-tracker-e4a80.firebaseio.com',
  projectId: 'scooter-tracker-e4a80',
  storageBucket: 'scooter-tracker-e4a80.appspot.com',
  messagingSenderId: '19849491991',
})

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
