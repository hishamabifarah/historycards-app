import React, { useContext } from 'react'
import { Context as AuthContext } from "../../context/authContext";
import { Foundation } from '@expo/vector-icons';

const LikeTimelineCardButton = () => {

    const { state } = useContext(AuthContext);

    console.log('state in like card' , state.ratings)

    const likedTimelineCard = ({ handle, id }) => {

        if (state.ratings && state.ratings.length > 0) {
            let userRatings = state.ratings.filter(like =>
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
    return (
        likedTimelineCard() ?
            <Foundation name="like" size={24} color="red" />
            :
            <Foundation name="like" size={24} color="red" />
    )
};

export default LikeTimelineCardButton;