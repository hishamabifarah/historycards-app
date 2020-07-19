import React , {useContext} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { Context as AuthContext } from "../../context/authContext";

const TimelineAdd = ({ navigation }) => {
    const { state } = useContext(AuthContext);

    if (state.authenticated) {
        return (
            <Icon
                 style={{marginLeft: 10}}
                name={'add'}
                size={26}
                onPress={() => navigation.navigate('TimelineAddImage')}
                color="#fff" />
        )
    } else
        return null;
};

export default withNavigation(TimelineAdd);