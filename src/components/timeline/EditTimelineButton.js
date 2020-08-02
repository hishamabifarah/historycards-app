import React, { useContext } from 'react'
import { StyleSheet } from 'react-native';
import { Context as AuthContext } from "../../context/authContext";
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const EditTimelineButton = ({ navigation, timelineId, userHandle , title, description }) => {

    const { state } = useContext(AuthContext);

    // console.log('state in EditTimelineButton' , state);

    const editButton =
        state.authenticated && state.credentials && state.credentials.handle === userHandle ?
            <FontAwesome
                name="edit"
                size={20}
                onPress={() =>
                    navigation.navigate('TimelineEdit',
                        {
                            title: title,
                            description : description,
                            id: timelineId
                        })}
                style={styles.editbutton}
                color={'#3498db'} />
            : null

    return editButton;

};

const styles = StyleSheet.create({
    editbutton: {
        marginRight: 15,
        marginTop: 3
    }
})

export default withNavigation(EditTimelineButton);