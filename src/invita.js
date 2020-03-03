import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RNCamera } from 'react-native-camera';
import { apiUrls } from '../App';
import fetchTimeout from 'fetch-timeout';
var RNFS = require('react-native-fs');





export default class Example extends Component {

  constructor() {
    super();

    this.state = {
      video: "",
      invito: {},
      user:'',
      previewDisplay: false,
      isRecording:false

    };
  }

  componentDidMount() {

   

  }

  render() {


    return (
      <View style={styles.mainView}>

        <TouchableOpacity
          onPress={() => this.getCamera()}>

          <View style={styles.itemContainer}>
            <AntDesign name='pluscircleo' size={50} />
            {/* <Text style={styles.itemName}>Invita</Text> */}
          </View>
        </TouchableOpacity>

        {this.state.previewDisplay ?

          <View style={styles.preview}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}

              style={styles.previewCam}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permessi fotocamera',
                message: 'Per funzionare, dobbiamo avere i tuoi permessi per usare la fotocamera',
                buttonPositive: 'Dai il permesso',
                buttonNegative: 'Nega il permesso',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permessi audio',
                message: 'Per funzionare, dobbiamo avere i tuoi permessi per poter registrare audio',
                buttonPositive: 'Dai il permesso',
                buttonNegative: 'Nega il permesso',
              }}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
              }}

              onRecordingStart={()=> this.setState({isRecording:true})}
              onRecordingEnd={()=> this.setState({isRecording:false})}
              onCameraReady={() => console.log("camera ready")}
              captureAudio={true}
            >

              {
                <TouchableOpacity
                onPress={this.state.isRecording ? this.stopVideo.bind(this) : this.takeVideo.bind(this)}

                style={this.state.isRecording ? styles.isNotRecording : styles.isRecording }
              ></TouchableOpacity>
              }

            </RNCamera>

          </View> : null}

      </View>

    );
  }

  getCamera() {
    this.setState({ previewDisplay: true })
  }

  takeVideo = async () => {

    if (this.camera) {
      const options = { quality: 0.5, base64: true, maxDuration: 2 };

      //this.camera.resumePreview();

      this.camera.recordAsync(options).then((res, err)=>{

      if(res){

        this.setState({invito: res})

        RNFS.readFile(res.uri, 'base64').then(res => {

          let invito = this.state.invito
          invito.base64 = res;
          this.setState({invito: invito})

          this.aggiungiInvito(apiUrls.aggiungiInvito, function(res, err){
            if(res){



              return console.log(res)

            }
            
            return console.log(err)
          })

        })
        .catch(err => {
            console.log(err.message, err.code);
        });

  
      } 
    })
  }
  };

  stopVideo(){
    if (this.camera) {
      this.camera.stopRecording() 
    }
  };


  aggiungiInvito(url, callback) {


    fetchTimeout(url, {
      method: 'POST',

      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ invito: this.state.invito })
      // body: formData



    }, 5000, 'Il server non risponde')
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Status code not OK', res.status);
        } else {
          return res.json();
        }
      })
      .then(json => {
        callback(null, json);
      })
      .catch(err => {
        console.log("error", err);
      });
  }
}


const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    padding: 0,
    backgroundColor: 'transparent',
    width: 60,
    height: 60,
  },

  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },

  mainView: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {

  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  preview: {
    flex: 1,

    width: "100%", height: "100%",
  },
  previewCam: {
    flex: 1,

    width: "100%", height: "90%"
  },
  isRecording:{
    alignSelf: 'center', justifyContent:'flex-end', flexDirection:'column', backgroundColor: 'red', width: 30, height: 30, borderRadius: 100, borderWidth:2, marginTop:'123%'
  },
  isNotRecording:{
    alignSelf: 'center', justifyContent:'flex-end', flexDirection:'column', backgroundColor: 'black', width: 30, height: 30, borderRadius: 100, borderWidth:2,  borderColor:'red', marginTop:'123%'
  }
});