import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import CameraStyles from '../styles/components/CameraStyles';
import HapticFeedback from 'react-native-haptic-feedback';

const Camera = ({ setColor, onPhotoTaken, cameraVisbility }) => {
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
          <View style={CameraStyles.cameraPaneContainer}>
            <RNCamera
              style={CameraStyles.cameraPreview}
              ref={cameraRef}
              type={cameraType}
              captureAudio={false}
            />
            <View style={CameraStyles.cameraCaptureButtonContainer}>
              <TouchableOpacity
                style={[CameraStyles.cameraCaptureButton, {backgroundColor: setColor, width: Dimensions.get('window').width * 0.15, height: Dimensions.get('window').width * 0.15, borderRadius: Dimensions.get('window').width * 0.075 }]}
                onPress={ () => {takePicture(); HapticFeedback.trigger('impactMedium');}}
              />
              <TouchableOpacity
                style={[CameraStyles.cameraFlipButton, { width: Dimensions.get('window').width * 0.10, height: Dimensions.get('window').width * 0.10, borderRadius: Dimensions.get('window').width * 0.05 }]}
                onPress={toggleCameraType}
              />
            </View>
          </View>
        }
        {isPhotoTaken &&
          <View style={CameraStyles.cameraPaneContainer}>
            <Image source={{ uri: imageURI }} style={CameraStyles.cameraPreview} />
            <View style={[CameraStyles.cameraCaptureButtonContainer, {width: '40%', justifyContent: 'space-between'}]}>
              <TouchableOpacity
                style={[CameraStyles.acceptPhoto, { width: Dimensions.get('window').width * 0.10, height: Dimensions.get('window').width * 0.10, borderRadius: Dimensions.get('window').width * 0.05 }]}
                onPress={() => { onPhotoTaken(imageURI); cameraVisbility(false); }}
              />
              <TouchableOpacity
                style={[CameraStyles.acceptPhoto, { width: Dimensions.get('window').width * 0.10, height: Dimensions.get('window').width * 0.10, borderRadius: Dimensions.get('window').width * 0.05 }]}
                onPress={() => {setIsPhotoTaken(false); setImageURI(null);}}
              />
            </View>                    
          </View>
        }
    </View>
  );
};

export default Camera;