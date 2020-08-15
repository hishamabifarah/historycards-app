import React, { useContext } from 'react'
import { Context as AuthContext } from "../../context/authContext";
import { Context as TimelineContext } from "../../context/timelinesContext";
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const LikeTimelineButton = ({ navigation, timelineId }) => {

    const { state, clearLikes , clearUnlikes } = useContext(AuthContext);
    const { likeTimeline, unlikeTimeline } = useContext(TimelineContext);

    // console.log('state get userhandle', state.credentials);

    const likedTimeline = () => {
        if (state.likes && state.likes.find((like) => like.timelineId === timelineId))
            return true;
        else return false;
    }

    const testLike = async () => {
        await likeTimeline({ timelineId })
        const handle = state.credentials.handle
        const id = timelineId
        clearLikes({ id, handle });
    }

    const testUnlikeTimeline = async () => {
        await unlikeTimeline({ timelineId })
        const id = timelineId
        clearUnlikes(id);
    }

    const likeButton =
        !state.authenticated ? (
            <Icon
                style={{ marginRight: 3, marginLeft: 3 }}
                name={'md-heart-empty'}
                onPress={() => navigation.navigate('Splash')}
                color={'#3498db'}
                size={20} />
        ) : likedTimeline() ? (
            <Icon
                style={{ marginRight: 3, marginLeft: 3 }}
                name={'md-heart'}
                size={20}
                onPress={() => testUnlikeTimeline({ timelineId })}
                color={'#3498db'} />
        ) : (
                    <Icon
                        style={{ marginRight: 3, marginLeft: 3 }}
                        name={'md-heart-empty'}
                        color={'#3498db'}
                        onPress={() => testLike()}
                        size={20} />
                )

    return likeButton;

};

export default withNavigation(LikeTimelineButton);