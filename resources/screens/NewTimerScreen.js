import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';

function NewTimerScreen({ navigation }) {

    const [totalChukkers, setTotalChukkers] = useState('4');
    const [chukkerDuration, setChukkerDuration] = useState('5');
    const [intervalDuration, setIntervalDuration] = useState('5');
    const [extraTime, setExtraTime] = useState('5');

    let setNumberOfChukkers = (value) => {
        setTotalChukkers(parseInt(value));
    }

    let stringToMillis = (value) => {
        
        if (typeof value === 'string') {
            let number = parseInt(value);

            switch (number) {
                case 4:
                    number = 240000;
                    break;
                case 5:
                    number =5000;
                    break;
                case 6:
                    number =360000;
                    break;
                case 8:
                    number = 480000;
                    break;
                case 30:
                    number = 30000;
            }

            return number;
        }
    }

    let handleOnPress = () => {
        navigation.navigate('TimeViewer', {
            totalChukkers: parseInt(totalChukkers),
            chukkerDuration: stringToMillis(chukkerDuration),
            intervalDuration: stringToMillis(intervalDuration),
            extraTime: stringToMillis(extraTime),
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.formContainer}>

                <Text>Number of chukkers</Text>
                <TextInput
                    placeholder='Num'
                    value={totalChukkers}
                    style={styles.textInput}
                    keyboardType='numeric'
                    onChangeText={value => setNumberOfChukkers(value)}
                />

                <Text>Chukker Duration</Text>
                <TextInput
                    placeholder='Minutes'
                    value={chukkerDuration}
                    style={styles.textInput}
                    keyboardType='numeric'
                    onChangeText={value => setChukkerDuration(value)}
                />

                <Text>Interval Duration</Text>
                <TextInput
                    placeholder='Minutes'
                    value={intervalDuration}
                    style={styles.textInput}
                    keyboardType='numeric'
                    onChangeText={value => setIntervalDuration(value)}
                />

                <Text>Extra Time</Text>
                <TextInput
                    placeholder='Seconds'
                    value={extraTime}
                    style={styles.textInput}
                    keyboardType='numeric'
                    onChangeText={value => setExtraTime(value)}
                />

                <Button
                    title='Start'
                    onPress={handleOnPress}
                />

            </View>

        </View>
    )
}

export default NewTimerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'transparent',
        width: '100%',
        aspectRatio: 100/100,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    textInput: {
        width: '90%',
        aspectRatio: 100/10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})