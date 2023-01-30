import React, {useState, useRef, Fragment} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/Fontisto';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Scaner from '../../assets/img/scaner.png'
import Left from 'react-native-vector-icons/AntDesign';
import Dot from 'react-native-vector-icons/Entypo';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Linking,
  View,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import axios from 'axios';
const Scanner = ({navigation}) => {
  const [state, setState] = useState({
    scan: false,
    ScanResult: false,
    result: '',
  });

  const {scan, ScanResult, result} = state;

  var ncode = result?.data;

  var [barcode, setBarcode] = useState({
    item: [],
  });

  // console.log(barcode.item)

  const addCode = data => {
    const newCode = barcode.item.concat(data);
    setBarcode({item: newCode});
  };

  console.log(barcode.item);

  const reaadCode = () => {
    return barcode.item?.map((v, index) => {
      console.log(v);
      if (v !== '') {
        return (
          <View style={styles.cardsWrapper} key={index}>
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>data : {v.data}</Text>

                <Text style={styles.cardDetails}>type of data : {v.type}</Text>
              </View>
            </View>
          </View>
        );
      }
    });
  };


  const scanner = useRef(null);

  const data = result;

  const onSuccess = e => {
    const check = e.data.substring(0, 4);

    setState({
      result: e,
      scan: false,
      ScanResult: true,
    });

    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    }
  };

  const activeQR = e => {
    setState({
      scan: true,
    });
  };
  const scanAgain = () => {
    setState({
      scan: true,
      ScanResult: false,
    });
    addCode(state.result);
  };
  return (
    <View style={styles.parant}>
      <Fragment>

      <View style={{flexDirection:'row',justifyContent:'space-between',width:wp(100),height:hp(8)}}>
           <TouchableOpacity onPress={()=>navigation.goBack()}>
           <View style={{flexDirection:'row',marginTop:hp(2)}}>
           <Left style={{marginTop:hp(1),marginLeft:hp(1)}} name='arrowleft' size={25} color="#5669FF"/>
             <Text style={{fontSize:hp(3),marginLeft:hp(2),marginTop:hp(1),color:"black",fontFamily:"SourceSansPro-SemiBold"}}>Scaner</Text>
           </View>
           </TouchableOpacity>
           <View style={{borderRadius:hp(1),marginRight:hp(0.5),marginTop:hp(2.5),width:wp(12),height:hp(6),backgroundColor:"#EBEEF2"}}>
           <Dot style={{marginTop:hp(1),marginLeft:hp(2)}} name='dots-three-vertical' size={25} color="#5669FF"/>

           </View>

        </View>
        

        {!scan && !ScanResult && (
          <View style={[styles.categoryContainer, {marginTop:hp(25),alignContent:'center',justifyContent:'center'}]}>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => activeQR('active qr')}>
              <View style={[styles.categoryIcon,{marginTop:hp(15)}]}>
                <Image source={Scaner}/>
              </View>
              
            </TouchableOpacity>
          </View>
        )}

        {ScanResult && (
          <>
            <View>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.text}>save now</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={scanAgain}>
                <Text style={styles.text}>
                  <Icon name="shopping-barcode" size={60} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView>{reaadCode()}</ScrollView>
          </>
        )}

        {scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={scanner}
            onRead={onSuccess}
            bottomContent={
              <View style={{paddingTop:hp(8),flexDirection:'row'}}>
                <View style={{marginRight:hp(2)}}>
                <TouchableOpacity 
                 onPress={() => scanner.reactivate()}
                style={{
                  backgroundColor: "#273746",
                  borderRadius: 15,
                  // alignItems: 'center',
                  width:wp(20),
                  paddingVertical:hp(3),
                  
                }}>
      
              
                
                <View >
                <Text style={{color:'#fff',fontSize:hp(2),marginLeft:hp(3)}}>
                  Start
                </Text>
                </View>
              

                
              </TouchableOpacity>
                
                </View>
                
                <View>
                <TouchableOpacity 
                 onPress={() => setState({scan: false})}
                style={{
                  backgroundColor: "#273746",
                  borderRadius: 15,
                  
                  width:wp(20),
                  paddingVertical:hp(3)
                  
                }}>
      
                
                
                <View>
                <Text style={{color:'#fff',fontSize:hp(2),marginLeft:hp(2)}}>
                  Cancel
                </Text>
                </View>
              

                
              </TouchableOpacity>
                </View>
                {/* <TouchableOpacity onPress={() => setState({scan: false})}>
                  <Text>Stop Scan</Text>
                </TouchableOpacity> */}
              </View>
            }
          />
        )}
      </Fragment>
    </View>
  );
};
export default Scanner;

const styles = StyleSheet.create({
  categoryContainer: {
    flex:1,
    width: wp(100),
    height:hp(50),
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#EAF2F8 ' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },

  parant: {
    flex: 1,
    height: 750,
    backgroundColor: '#EAF2F8 ',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  cardsWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    flexDirection: 'row',
    shadowColor: '#999',
    marginBottom: 10,
  },

  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
