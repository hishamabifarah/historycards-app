import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

const Profile = ({ profile, navigation }) => {
    if (typeof profile === 'undefined' || profile === null) {
        return;
    }

    return (
        <SafeAreaView >
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{ uri: profile.imageUrl }} />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.title}>{profile.handle}</Text>
                    <Text style={styles.info}>{profile.bio}</Text>

                    <View style={styles.bodyDetailsContent}>

                        {/* Twitter */}
                        {profile.twitter &&
                            <View style={styles.content}>
                                <Icon style={styles.inputIcon} name={'logo-twitter'} size={24} color={'#3498db'} />
                                <Text style={styles.name}>{profile.twitter}</Text>
                            </View>
                        }

                        {/* Facebook */}
                        {profile.facebook &&
                            <View style={styles.content}>
                                <Icon style={styles.inputIcon} name={'logo-facebook'} size={24} color={'#3498db'} />
                                <Text style={styles.name}>{profile.facebook}</Text>
                            </View>
                        }

                        {/* Location */}
                        {profile.location &&
                            <View style={styles.content}>
                                <Icon style={styles.inputIcon} name={'md-locate'} size={24} color={'#3498db'} />
                                <Text style={styles.name}>{profile.location}</Text>
                            </View>
                        }

                        {/* Website */}
                        {profile.website &&
                            <View style={styles.content}>
                                <Icon style={styles.inputIcon} name={'md-link'} size={24} color={'#3498db'} />
                                <Text style={styles.name}>{profile.website}</Text>
                            </View>
                        }
                        {/* Joined Date */}
                        <View style={styles.content}>
                            <Icon style={styles.inputIcon} name={'md-calendar'} size={24} color={'#3498db'} />
                            <Text style={styles.name}>{profile.createdAt}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() =>
                            navigation.navigate('ProfileEditDetails',
                                {
                                    twitter: profile.twitter,
                                    facebook: profile.facebook,
                                    location: profile.location,
                                    website: profile.website,
                                    bio: profile.bio
                                })}>
                        <Text style={styles.buttonText}>Update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3498db",
        height: 100,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 63,
        borderWidth: 0,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 30
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    bodyDetailsContent: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 10,
    },
    content: {
        flexDirection: 'row',
        marginVertical: 8
    },
    name: {
        fontSize: 18,
        color: "#696969",
        fontWeight: "600",
        marginLeft: 20
    },
    title: {
        fontSize: 24,
        color: "#696969",
        fontWeight: "600",
    },
    info: {
        fontSize: 16,
        color: "#3498db",
        marginTop: 10,
        fontWeight: "600",
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        borderRadius: 30,
        backgroundColor: "#3498db"
    },
    buttonText: {
        color: '#fff'
    }
});

export default withNavigation(Profile);