import React, { useContext } from 'react'
import { StyleSheet } from 'react-native';
import { Context as AuthContext } from "../../context/authContext";
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const EditCardTimeline = ({ navigation, cardId, userHandle, title, body, cardDate, source, timelineId }) => {

    const { state } = useContext(AuthContext);

    const editButton =
        state.authenticated && state.credentials && state.credentials.handle === userHandle ?
            <FontAwesome
                name="edit"
                size={20}
                onPress={() =>
                    navigation.navigate('TimelineEditCard',
                        {
                            title: title,
                            body: body,
                            cardId: cardId,
                            cardDate: cardDate,
                            source: source,
                            timelineId: timelineId
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

export default withNavigation(EditCardTimeline);