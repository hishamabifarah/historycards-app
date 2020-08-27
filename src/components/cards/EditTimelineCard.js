import React, { useContext } from 'react'
import { StyleSheet } from 'react-native';
import { Context as AuthContext } from "../../context/authContext";
import { Context as TimelineContext } from "../../context/timelinesContext";
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const EditTimelineCard = ({ navigation , timelineId}) => {

    const { state } = useContext(AuthContext);
    const { state: { timeline } } = useContext(TimelineContext);

    const editButton =
        state.authenticated && timeline.cards && timeline.cards.length > 0 ?
            <FontAwesome
                name="edit"
                size={25}
                onPress={() =>
                    navigation.navigate('TimelineListAllCards',
                        {
                            id: timelineId
                        })}
                style={styles.editbutton}
                color={'#fff'} />
            : null

    return editButton;

};

const styles = StyleSheet.create({
    editbutton: {
        marginRight: 15,
        marginTop: 4
    }
})

export default withNavigation(EditTimelineCard);