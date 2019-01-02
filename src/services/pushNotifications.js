import { Permissions, Notifications } from 'expo';
import firebase from 'firebase';
import { Alert } from 'react-native';

export default async (user) => {
    var token;
    console.log(user.user);
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
      Alert.alert(	 
        'New Push Notification',	
       token,	
       [{ text: 'Ok.' }]	
     );
      firebase.database().ref('/userInfo')
            .on('value', snapshot => {                 
                if (snapshot.val() != null) {                
                    Object.keys(snapshot.val()).forEach((key, index) => {
                    
                        if (snapshot.val()[key].uid === user.user.uid) {
                            firebase.database()
                            .ref(`/userInfo/${Object.keys(snapshot.val())[index]}`)
                            .update({ expoToken: token })
                                   
                            .catch((error) => {
                                console.log(error);
                            });    
                        }
                    });
                }
            });
        };
