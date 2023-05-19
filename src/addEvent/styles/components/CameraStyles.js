
import { StyleSheet } from 'react-native';

const CameraStyles = StyleSheet.create({
    cameraPaneContainer: {
      position: 'relative',
    },
    cameraPreview: {
      width: '100%',
      height: '100%',
      zIndex: -1,
   },
    cameraCaptureButton: {
      backgroundColor: 'white',
      position: 'absolute',
      left: '42.5%',
      justifyContent: 'center',
    },
    cameraCaptureButtonInner: {
      backgroundColor: 'black',
      borderColor: 'black',
      borderWidth: 2,
      alignSelf: 'center',
      justifySelf: 'center',
    },
    cameraFlipButton: {
      position: 'absolute',
      right: '10%',
      top: '25%'
    },
    acceptPhoto: {
      backgroundColor: 'grey',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraCaptureButtonContainer: {
      position: 'absolute',
      bottom: '20%',
      width: '100%',
      height: '15%',
      flexDirection: 'row',
      alignSelf: 'center',
    },
  });
      
  export default CameraStyles;
  