import React from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import Animated, {
  AnimatedTransform,
  AnimateStyle,
  EntryExitAnimationFunction,
  LayoutAnimation,
  StyleProps,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  NUM_MOODS,
  MOODS_ARC_RADIUS,
  MOOD_ANGLE,
  MOOD_ANGLE_RANGE_MARGIN,
  MOOD_SPRING_CONFIG,
} from '@nightlight/src/constants';
import MoodButtonsStyles from '@nightlight/components/moods/MoodButtons.styles';
import {
  MoodEmoji,
  MoodButtonProps,
  MoodButtonAnimation,
} from '@nightlight/src/types';

const MoodButtons = ({ onClose }: MoodButtonProps) => {
  const moodButtonAnimations: MoodButtonAnimation[] = [
    ...Array(NUM_MOODS).keys(),
  ].map(index => {
    // compute the xy offsets of the mood buttons along the mood arc
    const xOffset: number =
      -MOODS_ARC_RADIUS *
      Math.cos(index * MOOD_ANGLE + MOOD_ANGLE_RANGE_MARGIN / 2);
    const yOffset: number =
      MOODS_ARC_RADIUS *
      Math.sin(index * MOOD_ANGLE + MOOD_ANGLE_RANGE_MARGIN / 2);

    // compute entering animation
    const FanOut: EntryExitAnimationFunction = (): LayoutAnimation => {
      'worklet';
      const animations: AnimateStyle<{ transform: AnimatedTransform }> = {
        transform: [
          {
            translateX: withDelay(
              index * 50,
              withSpring(xOffset, MOOD_SPRING_CONFIG)
            ),
          },
          {
            translateY: withDelay(
              index * 50,
              withSpring(-yOffset, MOOD_SPRING_CONFIG)
            ),
          },
        ],
      };
      const initialValues: StyleProps = {
        // initial values for animations
        transform: [{ translateX: 0 }, { translateY: 0 }],
      };
      return { initialValues, animations };
    };

    // compute exiting animation
    const Retract: EntryExitAnimationFunction = (): LayoutAnimation => {
      'worklet';
      const animations: AnimateStyle<{ transform: AnimatedTransform }> = {
        transform: [
          {
            translateX: withDelay((NUM_MOODS - index) * 75, withTiming(0)),
          },
          {
            translateY: withDelay((NUM_MOODS - index) * 75, withTiming(0)),
          },
        ],
      };
      const initialValues: StyleProps = {
        // initial values for animations
        transform: [{ translateX: xOffset }, { translateY: -yOffset }],
      };
      return { initialValues, animations };
    };

    return {
      entry: FanOut,
      exit: Retract,
    };
  });

  const handleMoodPress = (emoji: MoodEmoji): void => {
    // TODO: set mood
    if (emoji === MoodEmoji.CLEAR) Alert.alert('clearing mood');
    else Alert.alert(`i'm feeling ${emoji}`);
    onClose();
  };

  const renderMoodButton = (emoji: MoodEmoji, index: number) => (
    <Animated.View
      entering={moodButtonAnimations[index].entry}
      exiting={moodButtonAnimations[index].exit}
      style={MoodButtonsStyles.mood}
      key={index}>
      <Pressable
        style={MoodButtonsStyles.moodPressable}
        onPress={() => handleMoodPress(emoji)}>
        <Text style={MoodButtonsStyles.moodEmoji}>{emoji}</Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <SafeAreaView style={MoodButtonsStyles.underlayCloseHandler} />
      </TouchableWithoutFeedback>
      <View style={MoodButtonsStyles.moodsContainer}>
        {Object.values(MoodEmoji).map((emoji: string, index: number) =>
          renderMoodButton(emoji as MoodEmoji, index)
        )}
      </View>
    </>
  );
};

export default MoodButtons;
