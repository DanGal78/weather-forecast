import { FC, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

interface WeatherCardProps {
    iconName: string;
    description: string;
    text: string;
    isFisrt?: boolean;
}

export const WeatherCard:FC< WeatherCardProps> = ({
    iconName,
    text, 
    description,
    isFisrt,

}) => {
return(
    <View style={[styles.weatherCard, isFisrt ? styles.removeBorderLeft : null]}>
              <FaIcon name={iconName}  size={20}/>
              <Text style={styles.textInfo}>{text}</Text>
              <Text style={styles.textDescription}>{description}</Text>
    </View>
)

}

const styles = StyleSheet.create({
    weatherCard: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        borderLeftWidth: 1,
        borderLeftColor: '#e8e8e8',
        flex: 1,
    },

    removeBorderLeft:{
        borderLeftWidth: 0,
    },

    textInfo: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    
    textDescription:{
        color: "#808080",
        fontSize: 12,
    },
});