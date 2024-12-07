/**
 * App.tsx
 * Entry point for the React Native application
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import Dashboard from './src/screens/Dashboard'; // Adjust the path as per your directory structure
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            {/* Render the Dashboard screen */}
            <View style={styles.container}>
                <Dashboard />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
