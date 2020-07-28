import React, { useContext } from 'react'
import { Context as AuthContext } from "../../context/authContext";
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const LikeTimelineButton = ({ navigation }) => {

    const { state } = useContext(AuthContext);

    const likedTimeline = () => {
        // if(this.props.user.likes && 
        //     this.props.user.likes.find(
        //         (like) => like.timelineId === this.props.timelineId
        //     )    
        // )
        // return true;
        // else return false;
        return false;
    }

    const likeButton =
        !state.authenticated ? (
            <Icon
                style={{ marginRight: 3, marginLeft: 3 }}
                name={'md-heart'}
                onPress={() => navigation.navigate('Splash')}
                color='red'
                size={20} />
        ) : likedTimeline() ? (
            <Icon
                style={{ marginRight: 3, marginLeft: 3 }}
                name={'md-heart'}
                size={20}
                color={'3498db'} />
        ) : (
            <Icon
                style={{ marginRight: 3, marginLeft: 3 }}
                name={'md-heart'}
                color='green'
                size={20} />
                )

    return (

        likeButton
    )

};

export default withNavigation(LikeTimelineButton);