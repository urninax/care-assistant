import React, {useState, useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeContext } from "../../utils/theme-context";

var items = [['Hug it out','Recent research has shown that physical touch—that means hugs, handshakes, and massage—can improve well-being and lessen pain, depression, and anxiety.'],
            ['Count your blessings','Being grateful is good for you. Science shows that it can boost happiness and positive emotions.'],
            ['Phone a friend','Connecting with a friend when you\'re feeling lonely or sad can work mood-lifting miracles. '],
            ['Make something with your hands','Working with your hands and making some kind of art, whether it’s drawing, making pottery, crafting something, or creating or painting furniture can help reduce anxiety.'],
            ['Do some yoga stretching','Stretching relaxes and loosens the body, of course, but there’s also evidence that it can ease your mind. '],
            ['Play your fav song','Listening to something you love can help distract your brain from whatever you are anxious about and just make you happy. '],
            ['Don\'t check your phone right when you wake up','esist the urge to look at your device first thing when you wake up. Instead, take time to set your intentions for the day.'],
            ['Take a lunchtime stroll','Research shows that 15 minutes of walking can potentially boost concentration and energy throughout the workday.'],
            ['Take time to zone out','Need permission to just turn your brain off with a movie or series? Here it is.'],
            ['Stash the cookie jar','And set out a giant fruit bowl instead — you’ll be more likely to reach for an apple or a banana.'],
            ['Give your eyes a break','Prevent digital eyestrain (dry eyes, headaches, and blurred vision) by following the rule of 20: Every 20 minutes, take a 20-second break to look at something 20 feet away.'],
            ['Do some heavy petting','Research shows that playing with dogs and cats is good for both improving your mood and for stress relief.'],
            ['Clear some clutter','Getting rid of that stack of mail, the pile of shoes by the door, and the overflow from your closet may improve your sense of well-being.'],
            ['Donate your time','Volunteering gives people purpose, which raises their self-esteem and lowers loneliness.'],
            ['Get outdoors','Being in nature — especially in motion — boosts mood, sharpens thinking, and makes you feel calmer and more generous.']];

export const SelfCareTips= () => {
  const { scheme } = useContext(ThemeContext);
  const styles = getStyles(scheme);

  let random1 = Math.floor(Math.random() * (15));;
  const titleText1 = items[random1][0];
  const bodyText1 = items[random1][1];
  
  let random2 = random1;
  while (random2 == random1){
    random2 = Math.floor(Math.random() * (15));;
  }
  
  const titleText2 = items[random2][0];
  const bodyText2 = items[random2][1];
  
  let random3 = random2;
  while (random3 == random2 || random3 == random1){
    random3 = Math.floor(Math.random() * (15));;
  }

  const titleText3 = items[random3][0];
  const bodyText3 = items[random3][1];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
            {titleText1}
            {'\n'}
          </Text>
          <View style={styles.container1} >
          <Text>{bodyText1}</Text>
          </View>
        </Text>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
            {titleText2}
            {'\n'}
          </Text>
          <View style={styles.container1} >
          <Text>{bodyText2}</Text>
          </View>
        </Text>
        <Text style={styles.baseText}>
          <Text style={styles.titleText}>
            {titleText3}
            {'\n'}
          </Text>
          <View style={styles.container1} >
          <Text>{bodyText3}</Text>
          </View>
          {'\n'}
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const getStyles = (scheme) =>
  StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: 'space-between',
    },
    container1: {
      backgroundColor: scheme === "dark" ? "grey" : "lightgrey",
      color: 'white',
      borderWidth: 5,
      borderColor: scheme === "dark" ? "white" : "black",
      align: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      padding: 10,
      margin: 10,
    },
    baseText: {
      fontFamily: 'Cochin',
      margin: 10,
      textAlign: 'center',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: scheme === "dark" ? "white" : "black",
      textAlign: 'center',
    },
  });

export default SelfCareTips;