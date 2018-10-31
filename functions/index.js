const functions = require('firebase-functions');
var fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendPushNotifications = functions.database.ref('/notifications')
.onWrite((change, context) => {
    var messages = [];
    console.log(change);
    console.log(context);
    return admin.database().ref('/userInfo').once('value').then((snapshot)=>{
        var expoToken;
        console.log(snapshot);
        console.log('snapshot');
        console.log(snapshot.val());
        snapshot.forEach(childSnapshot => {
            console.log(childSnapshot);
            expoToken = childSnapshot.val().expoToken;
            if(expoToken){
                messages.push({
                    to: expoToken,
                    notification : {
                        title :"test from server",
                        body :"test lorem ipsum"
                    }
                });
            }
        });
        console.log(messages);
        return Promise.all(messages);
    }).then((messages) => {
        return fetch('https://localad-53d66.firebaseio.com/users/push-token', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(messages),
          });
        })
});
