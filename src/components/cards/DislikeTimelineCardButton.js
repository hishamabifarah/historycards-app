import React, { useContext } from 'react'
import { Context as AuthContext } from "../../context/authContext";
import { Context as TimelineContext } from '../../context/timelinesContext';
import { withNavigation } from 'react-navigation';
import { Foundation } from '@expo/vector-icons';

const DislikeTimelineCardButton = ({ handle, id, navigation }) => {

    const { state: { authenticated } } = useContext(AuthContext);
    const { state: { ratings } } = useContext(TimelineContext);

    const dislikedTimelineCard = () => {
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
                        return false
                    } else {
                        return true;
                    }
                } else {
                    if (userRatings[0].liked) {
                        return false;
                    } else {
                        return true;
                    }
                }
        }
    }

    return (

        dislikedTimelineCard() ?

        <Foundation name="dislike" size={26} color={'#3498db'}   />

        : <Foundation name="dislike" size={26} color="grey" />
    )
};


export default withNavigation(DislikeTimelineCardButton);