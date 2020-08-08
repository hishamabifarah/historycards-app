import React, { useContext } from 'react'
import { StyleSheet } from 'react-native';
import { Context as AuthContext } from "../../context/authContext";
import { withNavigation } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

const EditTimelineCard = ({ navigation , timelineId}) => {

    const { state } = useContext(AuthContext);

    // console.log('state in EditTimelineCard' , state);

    const editButton =
        state.authenticated ?
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