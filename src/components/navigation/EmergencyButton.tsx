import React, { useState } from 'react';
import { View, Dimensions, ScaledSize, Alert, Text } from 'react-native';
import {
  GestureDetector,
  Gesture,
  PanGesture,
  LongPressGesture,
  SimultaneousGesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  SharedValue,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import EmergencyButtonStyles from '@nightlight/components/navigation/EmergencyButton.styles';
import { COLORS } from '@nightlight/src/global.styles';

const { height }: ScaledSize = Dimensions.get('window');

const COUNTDOWN_DURATION: number = 3000; // 3 seconds

const EmergencyButton = () => {
  const [displayedCountdown, setDisplayedCountdown] = useState<number>(
    COUNTDOWN_DURATION / 1000
  );

  /* The maximum offset of the button from its original position.
   * At this offset, the top of the button is aligned with the middle of the window height.
   * -------------------------
   * Value Breakdown:
   * -------------------------
   * slide UP = negative offset
   * danger zone height = 34
   * navbar height = 80
   * navbar stroke width = 2
   * button radius = 40
   * button stroke width = 2 * 2 = 4
   */
  const maxOffset: number = -(height * 0.5 - 34 - 80 - 2 - 40 - 2 - 2);

  const offset: SharedValue<number> = useSharedValue<number>(0); // offset from original position
  const scale: SharedValue<number> = useSharedValue<number>(1); // scale of button

  const isPressed: SharedValue<boolean> = useSharedValue<boolean>(false); // is button pressed?

  const whiteToRedInterpolation: SharedValue<number> =
    useSharedValue<number>(0); // fraction of white -> red
  const blueToRedInterpolation: SharedValue<number> = useSharedValue<number>(0); // fraction of blue -> red
  const redInterpolation: SharedValue<number> = useSharedValue<number>(0.25); // fraction of dark red -> red

  // Slide and scale animation
  const slideScaleAnimation = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }, { scale: scale.value }],
  }));

  // White -> red background color animation
  const whiteRedBGAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      whiteToRedInterpolation.value,
      [0, 1],
      [COLORS.WHITE, COLORS.RED]
    ),
  }));

  /// White -> red border color animation
  const whiteRedBorderAnimation = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      whiteToRedInterpolation.value,
      [0, 1],
      [COLORS.WHITE, COLORS.RED]
    ),
  }));

  // Blue -> red background color animation
  const blueRedBGAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      blueToRedInterpolation.value,
      [0, 1],
      [COLORS.NIGHTLIGHT_BLUE, COLORS.RED]
    ),
  }));

  // Blue -> red shadow color animation
  const blueRedShadowAnimation = useAnimatedStyle(() => ({
    shadowColor: interpolateColor(
      blueToRedInterpolation.value,
      [0, 1],
      [COLORS.NIGHTLIGHT_BLUE, COLORS.RED]
    ),
  }));

  // Dark red -> red background color animation
  const redBGAnimation = useAnimatedStyle(() =>
    isPressed.value
      ? {
          backgroundColor: interpolateColor(
            redInterpolation.value,
            [0, 1],
            [COLORS.DARK_RED, COLORS.RED]
          ),
        }
      : {}
  );

  // Dark red -> red border color animation
  const redBorderAnimation = useAnimatedStyle(() =>
    isPressed.value
      ? {
          borderColor: interpolateColor(
            redInterpolation.value,
            [0, 1],
            [COLORS.DARK_RED, COLORS.RED]
          ),
        }
      : {}
  );

  const triggerEmergency = () => {
    // TODO: Notify emergency contacts
    didTriggerEmergency.value = true;
    Alert.alert('ALERT!', 'Notifying your emergency contacts...');
  };

  // Identifies if countdown is active
  const isCountdownActive: SharedValue<boolean> =
    useSharedValue<boolean>(false);

  // Identifies if emergency has been triggered
  const didTriggerEmergency: SharedValue<boolean> =
    useSharedValue<boolean>(false);

  // JS thread countdown function
  const countdown = () => {
    let secondsElapsed = 0; // can't use state because state is updated async

    // run every second
    const interval = setInterval(() => {
      if (isCountdownActive.value) {
        // if countdown is still active...
        secondsElapsed += 1;
        setDisplayedCountdown(prev => prev - 1);
        if (secondsElapsed >= COUNTDOWN_DURATION / 1000) {
          // if countdown is finished...
          clearInterval(interval);
          triggerEmergency();
          setDisplayedCountdown(COUNTDOWN_DURATION / 1000);
        }
      } else {
        // if countdown is cancelled...
        clearInterval(interval);
        setDisplayedCountdown(COUNTDOWN_DURATION / 1000);
      }
    }, 1000);
  };

  // Start countdown if not started
  const startCountdown = () => {
    'worklet';
    if (!isCountdownActive.value && !didTriggerEmergency.value) {
      console.log('starting countdown...');
      isCountdownActive.value = true;
      // running on JS thread allows for setInterval and setState to work as exected
      runOnJS(countdown)();
    }
  };

  // Cancel countdown if started
  const cancelCountdown = () => {
    'worklet';
    if (isCountdownActive.value) {
      console.log('cancelling countdown...');
      isCountdownActive.value = false;
    }
  };

  // Gesture handler for slide animation
  const panGesture: PanGesture = Gesture.Pan()
    .onUpdate(e => {
      const newOffset = e.translationY;
      if (newOffset > 0) {
        // Below start point: fix at original position
        offset.value = 0;
      } else if (newOffset < maxOffset) {
        // Past max offset: fix at max offset
        offset.value = maxOffset;
      } else {
        // Within bounds: update offset to new offset
        offset.value = newOffset;
      }

      if (offset.value === maxOffset) {
        // Start countdown if button is at max offset
        startCountdown();
      } else {
        // Cancel countdown if button is not at max offset
        cancelCountdown();
      }
    })
    .onEnd(() => {
      // On touch release, reset position of button
      offset.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      // Cancel countdown if released
      cancelCountdown();

      didTriggerEmergency.value = false;
    });

  // Gesture handler for detecting if button is pressed
  const longPressGesture: LongPressGesture = Gesture.LongPress()
    .minDuration(0)
    .maxDistance(height) // weird behavior-value pairing...?
    .onStart(() => {
      // At start of long press...
      isPressed.value = true; // doesn't work in onBegin() for some reason
      scale.value = withTiming(1.1, { duration: 100 }); // scale up
      whiteToRedInterpolation.value = withTiming(1); // white -> red
      blueToRedInterpolation.value = withTiming(1); // blue -> red

      // Blink red
      redInterpolation.value = withRepeat(
        withTiming(1, { duration: 500 }), // duration is time for half of a cycle
        -1,
        true
      );
    })
    .onEnd(() => {
      // At end of long press...
      scale.value = withTiming(1, { duration: 100 }); // scale back down
      whiteToRedInterpolation.value = withTiming(0); // reset white colors
      blueToRedInterpolation.value = withTiming(0); // reset blue colors
      redInterpolation.value = withTiming(0.25); // reset red colors
      isPressed.value = false; // could be in onFinalize()?
    });

  const simultaneousGesture: SimultaneousGesture = Gesture.Simultaneous(
    panGesture,
    longPressGesture
  );

  return (
    <View>
      <Text style={{ position: 'absolute' }}>{displayedCountdown}</Text>
      <GestureDetector gesture={simultaneousGesture}>
        <Animated.View
          style={[EmergencyButtonStyles.base, slideScaleAnimation]}>
          <Animated.View
            style={[
              EmergencyButtonStyles.whiteRing,
              whiteRedBorderAnimation,
              redBorderAnimation,
            ]}
          />
          <Animated.View
            style={[
              EmergencyButtonStyles.blueDot,
              blueRedBGAnimation,
              blueRedShadowAnimation,
              redBGAnimation,
            ]}
          />
          <MaskedView
            style={EmergencyButtonStyles.maskedView}
            maskElement={<View style={EmergencyButtonStyles.maskElement} />}>
            <Animated.View
              style={[
                EmergencyButtonStyles.whiteNotch,
                whiteRedBGAnimation,
                redBGAnimation,
              ]}
            />
          </MaskedView>
          <View style={EmergencyButtonStyles.outline} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default EmergencyButton;
