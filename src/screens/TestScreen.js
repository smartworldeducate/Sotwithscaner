import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import React,{useState, useEffect} from 'react'
import { getPost } from "../redux/features/PostSlice";
import { ScrollView } from 'react-native-gesture-handler';

export default function TestScreen() {
    const dispatch = useDispatch();
    const { loading, post, body, edit } = useSelector((state) => ({
        ...state.app,
      }));

      console.log("redux data:",post)

    //   const getData=()=>{
        
    //      dispatch(getPost())
        
    //   }


      useEffect(()=>{
        dispatch(getPost())
      },[])
          
  return (
    <View style={{flex:1}}>
        <View>
            <TouchableOpacity onPress={()=>getData()}>
                <View>
                    <Text>getdata</Text>
                </View>
            </TouchableOpacity>
        </View>
      <ScrollView>
        {post?.map((item,i)=>{
            
            item.map((dt,i)=>{
                return(
                    <View key={i}>
                        <Text>
                            {dt.title}
                        </Text>
                    </View>
                )
            })
        })}
      </ScrollView>
    </View>
  )
}