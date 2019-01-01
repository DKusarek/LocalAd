const functions = require('firebase-functions');
var fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendPushNotifications = functions.database.ref('/notifications')
.onWrite((change, context) => {
    var messages = [];
    return admin.database().ref('/userInfo').once('value').then((snapshot)=>{
        var expoToken;
        snapshot.forEach(childSnapshot => {
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
        return Promise.all(messages);
    }).then((messages) => {
        return fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json'
            },
            body: JSON.stringify(messages),
          });
        })
        .catch((error)=>{
            console.log(error);
        });
});
