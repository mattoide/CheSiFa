import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import SearchIcon from 'react-native-vector-icons/MaterialIcons';

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
    global.fetch(`https://player.vimeo.com/video/${VIMEO_ID}/config`)
      .then(res => res.json())
      .then(res => this.setState({
        thumbnailUrl: res.video.thumbs['640'],
        videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
        video: res.video,
      }));
  }
  render() {
    const pages = [
      { name: 'Invita', descr: '#1abc9c', icon: 'people-outline' },
      { name: 'Cerca', descr: '#1abc9c', icon: 'location-searching' }
    ];

    return (
      <View style={styles.mainView}>
        <View style={styles.sectionView}>
          {/* <FlatGrid
            itemDimension={250}
            items={pages}
            style={styles.gridView}
            // staticDimension={300}
            // fixed
            // spacing={20}
            renderItem={({ item, index }) => (

              <TouchableOpacity
                onPress={console.log()}>

                <View style={[styles.itemContainer, { backgroundColor: '#1bba3c' }]}>
                  <SearchIcon name={item.icon} size={50} />
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>{item.code}</Text>
                </View>
              </TouchableOpacity>

            )}

          /> */}


          <View style={styles.singleSect}>
            <TouchableOpacity
              onPress={console.log()}>

              <View style={styles.itemContainer}>
                <SearchIcon name='people-outline' size={50} />
                <Text style={styles.itemName}>Invita</Text>
              </View>
            </TouchableOpacity>
          </View>


          <View>
            <TouchableOpacity
              onPress={console.log()}>

              <View style={styles.itemContainer}>
                <SearchIcon name='location-searching' size={50} />
                <Text style={styles.itemName}>Cerca</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.myVideo}>
          <VideoPlayer
            endWithThumbnail
            thumbnail={{ uri: this.state.thumbnailUrl }}
            video={{ uri: this.state.videoUrl }}
            videoWidth={this.state.video.width}
            videoHeight={this.state.video.height}
            duration={this.state.video.duration}          
            ref={r => this.player = r}
          />
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1
    },
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
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  mainView: {
    flex: 1,
    backgroundColor:'black'
    },
  sectionView: {
    flex: 0.5, 
    justifyContent: 'center',
    margin: 3
  },
  singleSect: {
    flex: 1
  },
  myVideo: {
    flex: 0.5,
    borderWidth:3
  }

});