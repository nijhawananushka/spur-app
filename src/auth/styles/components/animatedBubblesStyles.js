import { StyleSheet } from 'react-native';

const bubbleStyles = StyleSheet.create({
    ellipse1: {
        position: 'absolute',
        width: 500,
        height: 500,
        left: -180,
        top: -20,
        zIndex: -1,
        fill: 'rgba(225, 91, 33, 0.1)',
    },
    ellipse2: {
        position: 'absolute',
        width: 500,
        height: 500,
        left: 100,
        zIndex: -2,
        top: 450,
        fill: 'rgba(225, 91, 33, 0.3)',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -3,
    },
});

export default bubbleStyles;