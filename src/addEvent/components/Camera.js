import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

const Camera = ({ onPhotoTaken, prop2 }) => {
  const [imageURI, setImageURI] = useState(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [isPhotoTaken, setIsPhotoTaken] = useState(false);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setIsPhotoTaken(true);
      setImageURI(data.uri);
    }
  };

  const toggleCameraType = () => {
    setCameraType(prevType =>
      prevType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back
    );
  };

  return (
    <View>
        {!isPhotoTaken && 
        <View style={styles.cameraContainer}>
            <RNCamera
            style={styles.cameraPreview}
            ref={cameraRef}
            type={cameraType}
            captureAudio={false}
            />
            <View style={styles.cameraCaptureButtonContainer}>
                <TouchableOpacity
                    style={[styles.cameraCaptureButton, { width: Dimensions.get('window').width * 0.15, height: Dimensions.get('window').width * 0.15, borderRadius: Dimensions.get('window').width * 0.075 }]}
                    onPress={takePicture}
                />
                <TouchableOpacity
                    style={[styles.cameraFlipButton, { width: Dimensions.get('window').width * 0.10, height: Dimensions.get('window').width * 0.10, borderRadius: Dimensions.get('window').width * 0.05 }]}
                    onPress={toggleCameraType}
                />
            </View>
        </View>
        }
        {isPhotoTaken &&
            <View style={styles.cameraContainer}>
                <Image source={{ uri: imageURI }} style={styles.cameraPreview} />
                <View style={[styles.cameraCaptureButtonContainer, {width: '40%', justifyContent: 'space-between'}]}>
                    <TouchableOpacity
                        style={[styles.acceptPhoto, { width: Dimensions.get('window').width * 0.10, height: Dimensions.get('window').width * 0.10, borderRadius: Dimensions.get('window').width * 0.05 }]}
                        onPress={() => { onPhotoTaken(imageURI); prop2(false);}}
                    />
                    <TouchableOpacity
                        style={[styles.acceptPhoto, { width: Dimensions.get('window').width * 0.10, height: Dimensions.get('window').width * 0.10, borderRadius: Dimensions.get('window').width * 0.05 }]}
                        onPress={() => {setIsPhotoTaken(false); setImageURI(null);}}
                    />
                </View>                    
            </View>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    position: 'relative',
  },
  cameraPreview: {
    width: Dimensions.get('window').width,
    height: '100%',
    zIndex: -1,
 },
  cameraCaptureButton: {
    backgroundColor: 'white',
    zIndex: 4,
    position: 'absolute',
    left: '42.5%',
  },
  cameraFlipButton: {
    backgroundColor: 'grey',
    zIndex: 4,
    position: 'absolute',
    right: '10%',
    top: '20%'
  },
  acceptPhoto: {
    backgroundColor: 'grey',
    zIndex: 4,
  },
  cameraCaptureButtonContainer: {
    position: 'absolute',
    bottom: '20%',
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignSelf: 'center',
    zIndex: 4,
  },
});
    
export default Camera
