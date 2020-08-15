import React, { useContext, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View , TouchableOpacity , ActivityIndicator } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import TimelinesLatestList from '../components/timeline/TimelinesLatestList';
import Divider from '../elements/Divider';
import Spacer from '../elements/Spacer';
import TimelineAdd from '../components/timeline/TimelineAdd';
import Notifications from '../components/notifications/Notifications';
import RecentActivitiesList from '../components/activities/RecentActivitiesList';


const filterTimelinesLatest = (arr, n) => {
    const newArr = arr.slice(0, n);
    return newArr;
};

const TimelinesHomeScreen = ({ navigation }) => {

    const { state, getTimelines , getRecentActivities} = useContext(TimelineContext);

    useEffect(() => {
        getTimelines(1);
        getRecentActivities();
    }, []);

    const reloadOnError = () =>{
        getTimelines(1);
        getRecentActivities();
    }

    return (
        state.loading 
            ? <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" />
            : !state.errors.length > 0 ? (
                <ScrollView>
                    <TimelinesLatestList
                        timelines={filterTimelinesLatest(state.timelines,8)}  
                        title="Latest Timelines"
                    />

                    <TouchableOpacity  onPress={() => navigation.navigate('TimelineListAll')}>
                        <Spacer margin={10}>
                            <Text style={styles.link}>{'View All'}</Text>
                        </Spacer>
                    </TouchableOpacity>

                    <Divider margin={[15 * 0.9, 0]} />

                     <RecentActivitiesList
                        activities={state.activities}
                        title="Recent Activities"
                    /> 

                </ScrollView>
            ) : (
                    <View style={styles.mainErrorContainer}>
                        <View style={styles.errorContainer}>
                            <Text>{state.errors}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={reloadOnError}
                            style={styles.errorbutton}>
                            <Text style={styles.errorText}>Reload Timelines</Text>
                        </TouchableOpacity>
                    </View>
            )
    )
};

TimelinesHomeScreen.navigationOptions = () => ({
    title: 'History Cards',
    headerTintColor: '#FFF',
    headerStyle: {
        backgroundColor: '#3498db'
    },
    color: '#000',
    headerRight: () => (
        <View style={styles.icons}>
            <Notifications/>
            <TimelineAdd />
        </View>
    ),
});

const styles = StyleSheet.create({
    icons:{
        flexDirection:'row',
        marginHorizontal: 10
    },
    link:{
        color: '#3498db',
        alignSelf: 'flex-end'
    },
    mainErrorContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
      },
      errorbutton: {
        alignItems: "center",
        backgroundColor: "#3498db",
        padding: 10
      },
      errorContainer: {
        alignItems: "center",
        padding: 10
      },
      errorText:{
          color: '#FFF'
      }
});

export default TimelinesHomeScreen;