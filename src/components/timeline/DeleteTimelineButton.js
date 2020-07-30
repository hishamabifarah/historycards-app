import React, { useContext } from 'react'
import { Alert } from 'react-native';
import { Context as AuthContext } from "../../context/authContext";
import { Context as TimelineContext } from "../../context/timelinesContext";
import Icon from 'react-native-vector-icons/Ionicons';

const DeleteTimelineButton = ({ timelineId, userHandle }) => {

    const { state } = useContext(AuthContext);
    const { deleteTimeline } = useContext(TimelineContext);

    const askDelete = () =>
        Alert.alert(
            "Delete Timeline",
            "Are you sure you want to delete?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteTimeline({ timelineId }) }
            ],
            { cancelable: false }
        );

    const deleteButton =
        state.authenticated && state.credentials && state.credentials.handle === userHandle ?
            <Icon
                style={{ marginRight: 3, marginLeft: 3 }}
                name={'md-trash'}
                onPress={askDelete}
                color={'#ff3d00'}
                size={20} />
            : null

    return deleteButton;

};

export default DeleteTimelineButton;