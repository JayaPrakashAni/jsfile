import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ImageBackground, ActivityIndicator, ScrollView } from "react-native";



const GetClassId = ({ navigation, route}) => {
  const [dataArray, setDataArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const imagebackground = require('../Images/background/bg0.jpg');
 


  // const videocall = () => {
  //   navigation.navigate('VideoCallPage');
  // };

  const getUserData = async () => {
    try {
      const response = await fetch("https://my.bmusician.com/app/GetClassroomID/" + slotID);
      console.log('slotID---------->', slotID)
      const myData = await response.json();
      setDataArray(myData);
      setIsLoaded(true);
      console.log('Resultuuu>>>>', myData)
      console.log('clas id msg>>>', myData.message)
      console.log('clas id success>>>', myData.success)
      console.log('clas id allocation>>>', myData.Allocation)
    } catch (error) {
      console.log(error);
    }
  };
 
    useEffect(() => {
      getUserData();
    }, []);
    
    const { slotID } = route.params;
 
    if (!isLoaded) {
      return ( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
      );
    }

    return (
        <ImageBackground source={imagebackground} style={{ width: '100%', height: '100%' }}>
          <ScrollView>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "yellow", textAlign: 'center', padding: 20 }}>
                {dataArray.message}
                 </Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <View style={styles.callButton}>
                  <Button
                    onPress={() => {
                      navigation.navigate('VideoCallPage', {
                        roomId: dataArray.message.toString(),
                      });
                    }}
                    title="CallNow"
                    color="red"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      );
//.toString()

};
const styles = StyleSheet.create({

 
  callButton: {
    padding: 20,
    marginLeft: 20,
    borderRadius: 5

  },

 
});

export default GetClassId;


