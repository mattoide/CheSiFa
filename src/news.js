import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import VideoPlayer from 'react-native-video-player';

const VIMEO_ID = '179859217';



export default class Example extends Component {

  constructor() {
    super();

    this.state = {
      video: { width: undefined, height: undefined, duration: undefined },
      thumbnailUrl: undefined,
      videoUrl: undefined,
    };
  }
  componentDidMount() {

  }

  render() {


    return (
      <View style={styles.mainView}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={console.log()}>

              <View style={styles.itemContainer}>
                <MaterialIcons name='people-outline' size={50} />
                <Text style={styles.itemName}>Invita</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 0,
    height: 150,
    backgroundColor: 'gray',

  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  mainView: {
    flex: 1,
    backgroundColor:'#121212'
    },
    button:{
        
    }
});