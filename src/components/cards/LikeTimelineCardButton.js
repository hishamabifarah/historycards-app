import React, { useContext } from 'react'
import { Context as AuthContext } from "../../context/authContext";
import { Context as TimelineContext } from '../../context/timelinesContext';
import { withNavigation } from 'react-navigation';
import { Foundation } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

const LikeTimelineCardButton = ({ handle, timelineId , id , navigation  }) => {

    const { state: { authenticated } } = useContext(AuthContext);
    const { state: { ratings } , likeTimelineCard } = useContext(TimelineContext);

    const likedTimelineCard = () => {
        if (ratings && ratings.length > 0) {
            let userRatings = ratings.filter(like =>
                like.userHandle === handle &&
                like.cardId === id);

            if (userRatings.length === 0) {
                return;
            }
            else
                if (userRatings.length === 1) {
                    if (userRatings[0].liked) {
                        return true
                    } else {
                        return false;
                    }
                } else {
                    if (userRatings.length === 2) {
                        if (userRatings[0].liked) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
        }
    }

    // const likeCard = async () => {
    //     let cardId = id;
    //     console.log('clicked like card' , cardId);
    //     await likeTimelineCard({ timelineId, cardId })
    // }

    return (
        !authenticated ? (
            <Foundation
                name="like"
                size={26}
                onPress={() => navigation.navigate('Splash')}
                color="grey" />
        ) : likedTimelineCard() ? (
            <Foundation
                name="like"
                size={26}
                color={'#3498db'}  /> 
        ) : <Foundation
                name="like"
                // onClick={()=> likeCard()}
                size={26}
                color="grey" />
    )
};

export default withNavigation(LikeTimelineCardButton);