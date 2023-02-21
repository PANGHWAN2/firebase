import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useCallback,useState } from 'react';
import firebaseAuth from '@react-native-firebase/auth'

GoogleSignin.configure({
  webClientId:
    '367008973898-rd88qpr76mv89n9254gsbbtq5r16fals.apps.googleusercontent.com',
});


export default function App() {
  const [userInfo,setUserInfo] = useState(null);

  const onPressGoogleSignin = useCallback(async()=>{
    try{
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog:true
      })
      const userInfo = await GoogleSignin.signIn();
      console.log('check')
      console.log('userInfo',userInfo)

      const credential = firebaseAuth.GoogleAuthProvider.credential(userInfo.idToken);
      const result = await firebaseAuth().signInWithCredential(credential);

      console.log(result);

      setUserInfo({
        name:result.additionalUserInfo.profile.name,
        profileImage:result.additionalUserInfo.profile.picture,
      })

    }catch(ex){

    }
  },[])
  return (
    <View style={{flex:1, alignItems:'center', justifyContent : 'center'}}>
      {userInfo !== null ?
      (
        <View style={{}}>
          <Image source={{uri:userInfo.profileImage}} style={{width:100, height:100, borderRadious:50}}/>
          <Text style={{fontSize:24, marginTop:20}}>{userInfo.name}</Text>
        </View>
      ):(
      <GoogleSigninButton onPress={onPressGoogleSignin}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
