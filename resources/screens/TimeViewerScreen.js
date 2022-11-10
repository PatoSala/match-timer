import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';

function TimeViewer({ navigation, route }) {

    // play bell sound

    const [sound, setSound] = React.useState();

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../../assets/bellSound.wav')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
            }
        : undefined;
    }, [sound]);


    // play bell sound ends

    const data = route.params;

    const [currentChukker, setCurrentChukker] = useState(1);

    const [status, setStatus] = useState('inGame')
    const [pause, setPause] = useState(false);

    const [remainingTime, setRemainingTime] = useState(data.chukkerDuration);


    let formatTime = (value) => {
        let minutes = Math.floor(value / 60000);
        let seconds = ((value % 60000) / 1000).toFixed(0);

        return (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }



    let handleCancelPress = () => {
        navigation.goBack();
    }

    let handlePauseResumePress = () => {
        setPause(!pause);
    }

    let handleRestartPress = () => {
        handlePauseResumePress();
        setRemainingTime(data.chukkerDuration);
        setStatus('inGame');
        setCurrentChukker(1);
    }


    
    if (status === 'inGame' || status === 'interval' && pause === false) {
        let timeout1 = setTimeout(() => setRemainingTime(remainingTime - 1000), 1000);

        if (pause || remainingTime == 0) {
            clearTimeout(timeout1);
        }
    }


    if (status === 'extraTime' && pause === false) {
        let timeout2 = setTimeout(() => setRemainingTime(remainingTime + 1000), 1000);

        if (status === 'extraTime' && remainingTime === data.extraTime) {
            clearTimeout(timeout2);
        }
    }

    useEffect(
        () => {
            if (remainingTime == 0 && status === 'inGame') {
                Alert.alert('Primer Campana');
                setStatus('extraTime');
                playSound();
            } else if (remainingTime == data.extraTime && status === 'extraTime') {
                setStatus('interval');
                Alert.alert('Segunda Campana');
                playSound();
                setRemainingTime(data.intervalDuration);
            } else if (remainingTime == 0 && status === 'interval') {
                setStatus('inGame');
                setRemainingTime(data.chukkerDuration);
                setPause(true);
                setCurrentChukker(currentChukker + 1);
            }
        }, [remainingTime]
    );

    return (
        <View style={styles.screenContainer}>
            <View style={styles.timerInfoContainer}>

                <Text>Chukker {currentChukker} of {data.totalChukkers}</Text>

                <View style={styles.countDownContainer}>

                    <Text style={styles.remainingTime}>
                        {
                            formatTime(remainingTime)
                        }
                    </Text>

                    <Text>{status}</Text>

                </View>

                <View style={styles.controlButtonsContainer}>

                    <TouchableOpacity style={styles.controlButton} onPress={handleRestartPress}>
                        <Text>Restart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.controlButton} onPress={handlePauseResumePress}>
                        {
                            pause ? <Text>Resume</Text> : <Text>Pause</Text>
                        }
                    </TouchableOpacity>

                </View>

                <Button
                    title="Cancel"
                    onPress={handleCancelPress}
                />

            </View>
        </View>
    )
}

export default TimeViewer;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerInfoContainer: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingVertical: 40
    },
    countDownContainer: {
        alignItems: 'center',
        marginVertical: 100,
    },
    remainingTime: {
        fontSize: 70,
    },
    extraTime: {
        fontSize: 25
    },
    controlButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 100
    },
    controlButton: {
        width: 80,
        aspectRatio: 1/1,
        backgroundColor: 'pink',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 60
    }
})