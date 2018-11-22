import { Permissions, Notifications } from 'expo';
import firebase from 'firebase';

export default async (user) => {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
    
      console.log(existingStatus);
      if (existingStatus !== 'granted') {
       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
    
      if (finalStatus !== 'granted') {
        return;
      }
    
      var token = await Notifications.getExpoPushTokenAsync();
      console.log('weszlo');
      firebase.database().ref('/userInfo')
            .on('value', snapshot => {       
                if (snapshot.val() != null) {                
                    Object.keys(snapshot.val()).forEach((key, index) => {
                        if (snapshot.val()[key].uid === user.uid) {
                            firebase.database().ref(`/userInfo/${Object.keys(snapshot.val())[index]}`)
                            .update({ expoToken: token })
                            .catch((error) => console.log(error));
                        }
                    });
                }
            });
        };
