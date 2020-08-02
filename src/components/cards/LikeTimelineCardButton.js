import React from 'react'
import { Entypo } from '@expo/vector-icons'; 

const LikeTimelineCardButton = () => {

    const likedTimelineCard = () => {
        return true;
    }
    return (
        <Entypo name="thumbs-up" size={24} color="black" />
    )
};

export default LikeTimelineCardButton;