/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Platform,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Share from 'react-native-share';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
}

function App(): React.JSX.Element {
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const handleSelectVideo = async () => {
        console.log('Selecting video...');

        await launchImageLibrary({mediaType: 'video'}).then(response => {
            console.log('Response:', response);
            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.errorMessage) {
                console.log('Error:', response.errorMessage);
            } else {
                if (response.assets && response.assets.length > 0) {
                    const selectedVideo = response.assets[0].uri;
                    if (selectedVideo) {
                        setVideoUri(selectedVideo);
                    }
                }
            }
        });
    };

    const shareVideo = async () => {
        if (!videoUri) {
            console.warn('No video selected');
            return;
        }

        try {
            const shareOptions = {
                title: 'Share Video',
                url:
                    Platform.OS === 'android' ? `file://${videoUri}` : videoUri,
                type: 'video/mp4',
            };

            await Share.open(shareOptions);
        } catch (error) {
            console.error('Error sharing video:', error);
        }
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                <Header />
                <View
                    style={{
                        backgroundColor: isDarkMode
                            ? Colors.black
                            : Colors.white,
                    }}>
                    <Section title="Step One">Hello world!</Section>
                    <Button title="Select Video" onPress={handleSelectVideo} />
                    {videoUri && (
                        <Button title="Share Video" onPress={shareVideo} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
