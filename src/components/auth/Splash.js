import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

const Splash = () => {
    return (
        <View style={styles.wrapper}>

            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Hello World!</Text>
            </View>

            <View>
                <Text style={styles.subtitle}>Footer Text!</Text>
            </View>
            
        </View>
    )

};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center', // align item vertically center
        alignItems: 'center' // align item horizontally center  
    },
    title: {
        color: '#FFF',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#FFF',
        fontWeight: '200'
    },
    titleWrapper: {
        backgroundColor: 'green',
        flex: 1 // will fill its parent so subtitle goes to bottom
    }

});

export default Splash;

// import React from 'react';
// import { TouchableOpacity, StyleSheet , View, Text} from 'react-native';

// const Splash = () => {
//     return (
//         <View style={styles.container}>
//             <TouchableOpacity style={styles.buttonContainer}>
//                 <Text style={styles.buttonText}>LOGIN</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.buttonContainer}>
//                 <Text style={styles.buttonText}>SIGNUP</Text>
//             </TouchableOpacity>
//         </View>
//     )

// };

// const styles = StyleSheet.create({
//     container:{
//         padding: 20
//     },
//     buttonContainer:{
//         backgroundColor: '#2980b9',
//         paddingVertical: 15,
//     },
//     buttonText:{
//         textAlign:'center',
//         color:'#FFF',
//         fontWeight: '700'
//     }

// });

// export default Splash;