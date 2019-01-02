import { Permissions, Notifications } from 'expo';
import firebase from 'firebase';

export default async (user) => {
    var token;
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
    
      if (existingStatus !== 'granted') {
       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
      if (finalStatus !== 'granted') {
        return;
      }
    
      token = await Notifications.getExpoPushTokenAsync();
     
      firebase.database().ref('/userInfo')
            .on('value', snapshot => {       
                if (snapshot.val() != null) {                
                    Object.keys(snapshot.val()).forEach((key, index) => {
                        if (snapshot.val()[key].uid === user.uid) {
                            firebase.database()
                            .ref(`/userInfo/${Object.keys(snapshot.val())[index]}`)
                            .update({ expoToken: token })
                            
                           // .catch((error) => console.log(error));
                           .catch(error => {
                            console.log(error)
                           });
                        }
                    });
                }
            });
        };
