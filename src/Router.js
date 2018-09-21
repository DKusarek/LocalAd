import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ backgroundColor: '#B8E3F8' }}>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene 
                        key="login" 
                        component={LoginForm} 
                        title="Local Ad" 
                        initial 
                        navigationBarStyle={{ backgroundColor: '#1097D8' }}
                        titleStyle={{ color: '#ffffff', textAlign: 'center' }}
                    />
                </Scene>                
            </Scene>
        </Router>
    );
};

export default RouterComponent;
