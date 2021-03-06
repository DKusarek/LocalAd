import React from 'react';
import { Text, View, Modal } from 'react-native';
import { PanelSection } from './PanelSection';
import { Button } from './Button';

const Inform = ({ children, visible, onOK }) => {
    const { containerStyle, textStyle, cardSectionStyle } = styles;
    
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
        >
            <View style={containerStyle}>
                <PanelSection style={cardSectionStyle}>
                    <Text style={textStyle}>
                        {children} 
                    </Text>
                </PanelSection>
                <PanelSection>
                    <Button onPress={onOK}>
                        OK
                    </Button>
                </PanelSection>
            </View>
        </Modal>        
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18, 
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
};

export { Inform };
