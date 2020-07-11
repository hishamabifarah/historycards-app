import React from 'react'
import { View } from 'react-native';

// use as Global spacing for elements and screen 
// either use as <Spacer> </Spacer> to give margins between element(s)
// or use as <Spacer/> to add margins inside screen not elements
const Spacer = ({ children, margin }) => {
    return <View style={{ margin }}>{children}</View>
}

// const styles = StyleSheet.create({
//     spacer: {
//         margin: 15
//     }
// });

export default Spacer;