import React , {useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { Context as AuthContext } from "../../context/authContext";

const AddTimelineCardButton = ({ navigation }) => {
    const { state } = useContext(AuthContext);

    const checkIfAuthenticated = () => {
        if(state.authenticated){
            navigation.navigate('CardsCreate');
        }else{
            navigation.navigate('Splash');
        }
    }

    if (state.authenticated) {
        return (
            <Icon
                style={{marginLeft: 20}}
                name={'add'}
                size={30}
                onPress={checkIfAuthenticated}
                color="#fff" />
        )
    } else
        return null;
};

export default withNavigation(AddTimelineCardButton);