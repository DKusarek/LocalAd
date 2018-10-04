import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import AdList from './components/AdList';
import UserMenu from './components/UserMenu';
import AdForm from './components/AdForm';
import AdCreate from './components/AdCreate';
import PicturePanel from './components/AddPicturePanel/PicturePanel';
import TagInput from './components/Tag/TagInput';
import LocationPanel from './components/LocationPanel/LocationPanel';
import AdToEditList from './components/AdToEditList';
import AdEdit from './components/AdEdit';
import AdListForGuests from './components/AdListForGuests';

const RouterComponent = () => {
    const { menuButtonStyle, chatButtonStyle, navigationStyle, mainTitleStyle } = styles;

    return (
        <Router sceneStyle={{ backgroundColor: '#e8f6fd' }}>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene 
                        key="login" 
                        component={LoginForm} 
                        title="Local Ad" 
                        initial
                        navigationBarStyle={navigationStyle}
                        titleStyle={mainTitleStyle}
                    />
                    <Scene 
                        key="adListForGuests"
                        component={AdListForGuests}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                </Scene>
                <Scene key="main">
                    <Scene 
                        key="adList"
                        component={AdList}
                        navigationBarStyle={navigationStyle}
                        leftButtonImage={require('./images/chat.png')}
                        leftButtonIconStyle={chatButtonStyle}
                        rightButtonImage={require('./images/menu.png')}                       
                        rightButtonIconStyle={menuButtonStyle}
                        onLeft={() => {}} 
                        onRight={() => { Actions.userMenu(); }}
                    />
                    <Scene
                        key="userMenu"
                        component={UserMenu}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                    <Scene
                        key="adForm"
                        component={AdForm}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                    <Scene
                        key="adCreate"
                        component={AdCreate}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                    <Scene
                        key="picturePanel"
                        component={PicturePanel}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                    <Scene
                        key="adToEditList"
                        component={AdToEditList}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                    <Scene
                        key="adEdit"
                        component={AdEdit}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                    <Scene
                        key="tagInput"
                        component={TagInput}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                    <Scene 
                        key="locationPanel"
                        component={LocationPanel}
                        navigationBarStyle={navigationStyle}
                        navBarButtonColor='#fff'
                    />
                </Scene>                
            </Scene>
        </Router>
    );
};

const styles = {
    menuButtonStyle: { 
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 50,
        width: 50
    },
    chatButtonStyle: { 
        justifyContent: 'flex-end',
        flexDirection: 'row',
        height: 30,
        width: 37
    },
    navigationStyle: {
        backgroundColor: '#1097D8'
    },
    mainTitleStyle: { 
        color: '#ffffff', 
        textAlign: 'center' 
    }
};

export default RouterComponent;
