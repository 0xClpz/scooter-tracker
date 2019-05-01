import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// Init
admin.initializeApp()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const realtimeTracking = functions.https.onRequest(
  (request, response) => {
    const {body} = request

    admin
      .database()
      .ref(`/latest-position`)
      .set(body)
      .then(() => response.send('OK'))
      .catch(() => response.send('ERROR'))
  }
)
