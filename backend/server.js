const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./path/to/serviceAccountKey.json'); 
const firebaseConfig = {
    apiKey: "AIzaSyCz0uAMDnDk7T0v9BYV6ueIwp8zJGn0f10",
    authDomain: "psysync-6e2aa.firebaseapp.com",
    projectId: "psysync-6e2aa",
    storageBucket: "psysync-6e2aa.appspot.com",
    messagingSenderId: "186386703961",
    appId: "1:186386703961:web:59b7808ab3e53258bf3348",
    measurementId: "G-0RRF2PHJC2"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = admin.firestore();

app.post('/signup/google', async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, uid } = decodedToken;

    const userRecord = await admin.auth().createUser({
      uid: uid,
      email: email,
      provider: 'google'
    });

    console.log('User signed up successfully:', userRecord.uid);

    const username = email.replace(/@gmail\.com$/, '');
    await db.collection('users').doc(uid).set({
      email: email,
      name: username,
      response: ""
    });

    console.log('User data added to Firestore:', uid);

    res.status(200).send('User signed up successfully');
  } catch (error) {
    console.error('Error signing up with Google:', error.message);
    res.status(500).send('Error signing up with Google');
  }
});

app.post('/login/google', async (req, res) => {
  try {
    const idToken = req.body.idToken;
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid } = decodedToken;

    console.log('User logged in successfully:', uid);
    res.status(200).send('User logged in successfully');
  } catch (error) {
    console.error('Error logging in with Google:', error.message);
    res.status(500).send('Error logging in with Google');
  }
});


app.post('/responses', async (req, res) => {
    try {
      const responseList = req.body.response;
      const email = req.body.email;
      const nodeRef = admin.database().ref('response');
  
      nodeRef.orderByChild('email').equalTo(email).once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
  
            nodeRef.child(key).update({
              'response': responseList,
            })
            .then(() => {
              console.log('Data updated successfully');
            })
            .catch((error) => {
              console.error('Error updating data:', error);
            });
          });
        })
        .catch((error) => {
          console.error('Error querying data:', error);
          res.status(500).send('Error updating responses');
        });
  
      console.log('Responses updated successfully');
      res.status(200).send('Responses updated successfully');
    } catch (error) {
      console.error('Error updating responses:', error.message);
      res.status(500).send('Error updating responses');
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

