import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    doneButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        marginLeft: 30,
        marginRight: 30,
    },
    doneButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        flex: 1,
    },
});

export default styles;