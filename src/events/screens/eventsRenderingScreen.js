
const EventsRenderingScreen = () => {
    return (
        <View style={mainScreenStyles.container}>
          <Text style={mainScreenStyles.header}> {`${greetingMessage}, ${user?.displayName.toLowerCase().split(' ')[0]}`} </Text>
          <View style={mainScreenStyles.logoContainer}>
            <Text style={mainScreenStyles.logo}>spur</Text>
          </View>
          <View style={mainScreenStyles.scrollContainer}>
            <Text style={mainScreenStyles.subheadings}>your spurs</Text>
          </View>
          <View style={mainScreenStyles.scrollContainer}>
            <Text style={mainScreenStyles.subheadings}>today, {today.toLowerCase()}</Text>
            <Text style={mainScreenStyles.subheadings}>tomorrow, {tomorrow.toLowerCase()}</Text>
          </View>
          <View style={mainScreenStyles.buttonContainer}>
            <LogOutButton navigation={navigation} />   
          </View>
          <AddSpurButton></AddSpurButton>
        </View>
      );
}

export default EventsRenderingScreen;