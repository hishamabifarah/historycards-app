import React , {useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { Context as AuthContext } from "../../context/authContext";

const AddTimelineCardButton = ({ navigation , timelineId }) => {
    const { state } = useContext(AuthContext);

    const checkIfAuthenticated = () => {
        if(state.authenticated){
            navigation.navigate('CardsCreate' , {
                timelineId
            });
        }else{
            navigation.navigate('Splash');
        }
    }

    if (state.authenticated) {
        return (
            <Icon
                style={{marginRight: 15}}
                name={'add'}
                size={30}
                onPress={checkIfAuthenticated}
                color="#fff" />
        )
    } else
        return null;
};

export default withNavigation(AddTimelineCardButton);