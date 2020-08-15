import React, { useContext } from 'react'
import { Context as AuthContext } from "../../context/authContext";
import { Context as TimelineContext } from "../../context/timelinesContext";
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoriteTimelineButton = ({ navigation, timelineId }) => {

    const { state } = useContext(AuthContext);
    const { favoriteTimeline, unfavoriteTimeline } = useContext(TimelineContext);

    const favoritedTimeline = () => {
        if (state.favorites &&
            state.favorites.find(
                (favorite) => favorite.timelineId === timelineId
            )
        )
            return true;
        else return false;
    }

    const likeButton =
        !state.authenticated ? (
            <Icon
                style={{ marginRight: 3, marginLeft: 3 }}
                name={'ios-bookmark'}
                onPress={() => navigation.navigate('Splash')}
                color={'#3498db'}
                size={20} />
        ) : favoritedTimeline() ? (
            <Icon
                style={{ marginRight: 3, marginLeft: 3 }}
                name={'ios-bookmark'}
                size={20}
                onPress={() => unfavoriteTimeline({ timelineId })}
                color={'#3498db'} />
        ) : (
                    <Icon
                        style={{ marginRight: 3, marginLeft: 3 }}
                        name={'ios-bookmark'}
                        color={'#ff3d00'}
                        onPress={() => favoriteTimeline({ timelineId })}
                        size={20} />
                )

    return likeButton;

};

export default withNavigation(FavoriteTimelineButton);