/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { RootNavigation } from "./src/navigation/RootNavigation.tsx";

function App(): React.JSX.Element {
    return (
        <RootNavigation></RootNavigation>
    );
}


export default App;
// react Native는 사진앱 or 카메라앱을 실행하는 기능이 없음
// // 그래서 라이브러리 사용 - ImagePicker
// // 라이브러리가 외부저장소 사용에 대한 퍼미션을 알아서 처리하기에 별도로 할 필요 없다
//
// import React, { useState } from "react";
// import { View, Text, Image, Button, Alert, StyleSheet, ImageURISource, SafeAreaView } from "react-native";
//
// // 1. 카메라 실행 시키는 라이브러리 추가 - 이미지피커라이브러리 임포트
// import {launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse, ImageLibraryOptions, Asset} from 'react-native-image-picker';
//
//
// //함수형 컴포넌트
// export default function Main():JSX.Element {
//
//     //화면 갱신에 영향을 주는 특별한 변수 state 하지만 여긴 함수임 useState() 사용
//     const [img, setImg] = useState<ImageURISource>({uri:'https://cdn.pixabay.com/photo/2023/05/21/12/40/dog-8008483_1280.jpg'}) //setState를 대신하는 넘이랑 변수랑 같이 하기
//     //제네릭 필수!!!
//
//
//     //버튼 동작
//     //카메라 앱을 실행하는 기능 화살표 함수
//     const showCamera =()=> {
//
//         //1. launchCamera 하기 위한 옵션 객체
//         const options : CameraOptions = {
//             //Property 'mediaType' is missing in type '{}' but required in type 'CameraOptions'
//             mediaType : 'photo', //필수 속성
//             cameraType : 'back',
//             saveToPhotos : true,
//             quality : 1,
//             videoQuality : "high",
//         }
//
//         //2. 촬영 결과를 받아오는 callback 메소드 등록
//         launchCamera(options , (response:ImagePickerResponse)=>{
//             if(response.didCancel) Alert.alert('촬영취소')
//             else if(response.errorMessage) Alert.alert('Error : '+ response.errorMessage)
//             else {
//                 //이곳에 왔다면 이미지가 잘 촬영된 것
//                 //촬용된 이미지는 response 객체의 assets 라는 속성으로 전달됨
//                 if(response.assets != null) {
//                     //선택된 이미지 객체를 이미지뷰가 보여주는 state변수 img에 저장
//                     //선택된 이미지의 uri 경로 얻어오기
//                     const uri = response.assets[0].uri //assets 여러개가 올수 있는데 중에 0번방 거
//
//                     const souce = {uri:uri}
//
//                     setImg(souce)
//                 }
//             }
//         }) //파라미터로 응답객체 받음
//     }
//
//
//     //사진앱을 실행하는 기능 화살표 함수
//     const showPhoto = async ()=> {
//         //1. 옵션객체 만들기
//         const option: ImageLibraryOptions = {
//             mediaType : "photo",
//             selectionLimit : 5,
//         }
//
//         //callback 말고 async-await 문법 사용해보기!!!!!!
//         //ES7의 새로운 문법 : async-await 문법 [callback 비동기 작업을 동기작업처럼 처리함]
//         const response = await launchImageLibrary(option) //함수에 async가 붙어 있어야 함
//         //결과를 기다렸다가 받아와라
//
//         if(response.didCancel) Alert.alert('취소')
//         else if(response.errorMessage) Alert.alert('Error : '+ response.errorMessage)
//         else {
//             const uris:Asset[] = []
//             response.assets?.forEach((value)=>uris.push(value)) //선택한 사진 순서와 상관없이 들어옴
//
//             //원래는 FlatList로 이미지 보여줘야하지만
//             //첫번째 이미지만 보여주기
//             setImg( uris[0] )
//
//         }
//     }
//
//     return (
//         <SafeAreaView>
//             <View style={style.root}>
//
//                 <View style={{flexDirection:'row', justifyContent : 'space-evenly'}}>
//                     <Button title="show camera app" onPress={showCamera}></Button>
//                     <Button title="show photo app" color={'green'} onPress={showPhoto}></Button>
//                 </View>
//
//                 <Text style={style.text}>{img.uri}</Text>
//
//                 <Image source={ img } style={style.img}></Image>
//
//             </View>
//         </SafeAreaView>
//     )
//
// }
//
//
//
// //스타일
// const style = StyleSheet.create({
//
//     root: {
//         height : "100%",
//         padding : 16,
//     },
//     text : {
//         padding:8,
//         color : 'black'
//     },
//     img : {
//         marginTop : 8,
//         flex : 1, //가로넓이는 alien-item이 관리하고 기본 스트래치로 되어 있음
//     }
// })
