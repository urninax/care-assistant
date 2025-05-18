import React, {useState, useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemeContext } from "../../utils/theme-context";

var items = [['Push-up','Assume a strong plank position, hands stacked directly below elbows and shoulders, bend your elbows to slowly lower your chest to the floor. Keep your upper arms from flaring as you push back up explosively to a straight arm position.'],
            ['Feet elevated push-up','Kick both feet up onto a box or bench. Place your hands on the floor, shoulder width apart, and create a strong plank position. Bend your elbows to slowly lower your nose to the ground, pause here, keep your upper arms from flaring out as you push back up explosively.'],
            ['Close-grip Push-up','Assume a strong plank position with your hands almost touching on the ground and core tight, bend your elbows to slowly lower your chest to the floor. Keep your upper arms tight to your body as you push back up explosively to a straight arm position.'],
            ['Write in a journal','Keep a paper and pen handy, and try to write something every day, or type it into your phone.'],
            ['Bench/box dip','Sit on the edge of a box or bench, with your legs outstretched. With your hands next to your hips, support your weight with your arms as you shift off the edge of the box. Flex at the elbows to lower your body until you feel a stretch across your chest. Straighten your arms explosively to push back up.'],
            ['Down-up','Hinge, squat and drop your hands to the ground, shoulder width apart. Explosively kick both legs backwards and assume a strong plank position, avoiding any \‘hip sag\’. Quickly jump your feet back in and return to standing.'],
            ['Burpee','Hinge, squat and drop down, placing both hands on the floor between your feet. Jump your feet back into the top of a press-up and lower your chest to the ground. Straighten your arms to press back up and hop your feet back forwards. Jump into the air explosively, touching your hands together above your head.'],
            ['Squat','Standing tall with your chest up, sink your hips back and bend at the knees, squatting down until the crease of your hips passes below your knee. Drive back up explosively and repeat, try to keep your heels on the ground and torso upright.'],
            ['Forward lunge','Stand tall with your chest up, take a step forward with one leg, bending the at the knee until the back knee gently touches the ground. Stand up explosively, pause and repeat with the opposite leg. '],
            ['Pistol squat','Stand tall lifting one foot from the ground, bend at the opposite knee, slowly squatting towards the floor, keeping your lifted leg straight and out in front of your body. Once the crease of your hip passes below your knee, pause and drive back up to a standing position.'],
            ['Pull-up','Grasp a pull-up bar with an overhand grip, hands slightly over shoulder width apart. Lift your feet from the ground and hang freely. Pull yourself up by flexing your elbows and pulling your shoulder blades down and back.'],
            ['Jump squat','Lean slightly forward as you squat down, before using your arms to assist as you explode up, jumping as high as you can. Cushion your landing with bent legs, then sink immediately back into another squat and repeat.'],
            ['Reverse lunge','Stand tall with your chest up, take a long step backward with one leg, bending your front leg until your back knee gently touches the ground. Stand up and forward explosively, pause and repeat with the opposite leg.'],
            ['Straight arm plank','Assume a strong, straight armed plank position, creating a rigid structure from your ankles to your shoulders. Focus on tucking in your pelvis and squeezing your core, hard. Create as much tension as possible throughout your entire body and hold it for as long as you can.'],
            ['Hanging knees raises','Hang from a bar, gymnastics rings or set of suspension straps. Ensure that your legs are straight, in front of your body, and that your feet are together. Engage your abs and pull down on the bar, raising both of your knees towards your chest. Pause for a beat, before lowering your legs to the start position under control.']];

export const Exercises= () => {
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
      fontSize: 4,
      margin: 10,
      textAlign: 'center',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      color:  scheme === "dark" ? "white" : "black",
      textAlign: 'center',
    },
  });

export default Exercises;