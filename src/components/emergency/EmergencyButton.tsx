import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import {
  GestureDetector,
  Gesture,
  TapGesture,
  PanGesture,
  LongPressGesture,
  SimultaneousGesture,
  ExclusiveGesture,
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
  useDerivedValue,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';
import EmergencyButtonStyles from '@nightlight/components/emergency/EmergencyButton.styles';
import EmergencyOverlay from '@nightlight/components/emergency/EmergencyOverlay';
import MoodButtons from '@nightlight/components/moods/MoodButtons';
import { COLORS } from '@nightlight/src/global.styles';
import {
  DEVICE_HEIGHT,
  SAFE_AREA_BOTTOM_MARGIN,
  COUNTDOWN_DURATION,
  EMERGENCY_TIME_THRESHOLD,
  NAVBAR_HEIGHT,
  EMERGENCY_BUTTON_RADIUS,
  EMERGENCY_BUTTON_DIAMETER,
} from '@nightlight/src/constants';

const EmergencyButton = () => {
  /***
   * VARIABLES
   ***/
  /* The maximum offset of the button from its original position.
   * At this offset, the top of the button is aligned with the middle of the window height.
   * -------------------------
   * Value Breakdown:
   * -------------------------
   * slide UP = negative offset
   * TODO: figure out if the stoke widths are correct/necessary
   * navbar stroke width = 2
   * button stroke width = 2 * 2 = 4
   */
  const maxOffset: number = -(
    (
      DEVICE_HEIGHT / 2 -
      SAFE_AREA_BOTTOM_MARGIN -
      NAVBAR_HEIGHT -
      // 2 -
      EMERGENCY_BUTTON_RADIUS
    )
    // 2 -
    // 2
  );

  /***
   * STATE
   ***/
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [displayedCountdown, setDisplayedCountdown] = useState<number>(
    COUNTDOWN_DURATION / 1000
  );
  const [showMoods, setShowMoods] = useState<boolean>(false);

  const showOverlayHandler = () => setShowOverlay(true);
  const hideOverlayHandler = () => setShowOverlay(false);
  const toggleMoodsHandler = () => setShowMoods(prev => !prev);
  const hideMoodsHandler = () => setShowMoods(false);

  /***
   * SHARED VALUES
   ***/
  const offset: SharedValue<number> = useSharedValue<number>(0); // button offset from original position
  const scale: SharedValue<number> = useSharedValue<number>(1); // button scale
  const isPressed: SharedValue<boolean> = useSharedValue<boolean>(false);
  const isCountdownActive: SharedValue<boolean> =
    useSharedValue<boolean>(false);
  const didTriggerEmergency: SharedValue<boolean> =
    useSharedValue<boolean>(false);
  const countdownInterval: SharedValue<NodeJS.Timer | null> =
    useSharedValue<NodeJS.Timer | null>(null); // countdown interval

  /***
   * SIDE EFFECTS
   ***/
  // Update state when shared value changes
  useDerivedValue(() => {
    runOnJS(isPressed.value ? showOverlayHandler : hideOverlayHandler)();
  });

  /***
   * ANIMATIONS
   ***/
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

  // Dark red -> red shadow color animation
  const redShadowAnimation = useAnimatedStyle(() =>
    isPressed.value
      ? {
          shadowColor: interpolateColor(
            redInterpolation.value,
            [0, 1],
            [COLORS.DARK_RED, COLORS.RED]
          ),
        }
      : {}
  );

  // Slider animation
  const sliderAnimation = useAnimatedStyle(() => ({
    height: -offset.value + EMERGENCY_BUTTON_DIAMETER,
    backgroundColor:
      offset.value === maxOffset ? COLORS.RED : COLORS.NIGHTLIGHT_BLUE,
    opacity: withTiming(Number(isPressed.value)),
  }));

  /***
   * HELPERS
   ***/
  // function to run on triggered emergency
  const triggerEmergency = () => {
    // TODO: Notify emergency contacts
    setDisplayedCountdown(0);
    didTriggerEmergency.value = true;
    Alert.alert('ALERT!', 'Notifying your emergency contacts...');
  };

  // JS thread function to clear countdown interval
  const stopCountdown = () => {
    clearInterval(countdownInterval.value as NodeJS.Timer);
    countdownInterval.value = null;
    setDisplayedCountdown(COUNTDOWN_DURATION / 1000);
  };

  // JS thread countdown function
  const countdown = () => {
    if (countdownInterval.value !== null) return; // if countdown is already running, do nothing

    let secondsElapsed = 0; // can't use state because state is updated async

    // run every second
    countdownInterval.value = setInterval(() => {
      if (isCountdownActive.value && countdownInterval.value !== null) {
        // if countdown is still active...
        secondsElapsed += 1;
        setDisplayedCountdown(prev => prev - 1);
        if (secondsElapsed >= COUNTDOWN_DURATION / 1000) {
          // if countdown is finished...
          stopCountdown();
          triggerEmergency();
        }
      } else {
        // if countdown is cancelled...
        stopCountdown();
      }
    }, 1000);
  };

  // Start countdown if not started
  const startCountdown = () => {
    'worklet';
    if (!isCountdownActive.value && !didTriggerEmergency.value) {
      isCountdownActive.value = true;
      runOnJS(countdown)();
    }
  };

  // Cancel countdown if started
  const cancelCountdown = () => {
    'worklet';
    if (isCountdownActive.value && !didTriggerEmergency.value) {
      isCountdownActive.value = false;
      runOnJS(stopCountdown)();
    }
  };

  /***
   * GESTURE HANDLERS
   ***/
  // Gesture handler for emoji moods
  const tapGesture: TapGesture = Gesture.Tap()
    .maxDuration(EMERGENCY_TIME_THRESHOLD)
    .onStart(() => {
      runOnJS(toggleMoodsHandler)();
    });

  // Gesture handler for slide animation
  const panGesture: PanGesture = Gesture.Pan()
    .onUpdate(e => {
      const newOffset = e.translationY;
      // Below start point: fix at original position
      if (newOffset > 0) offset.value = 0;
      // Past max offset: fix at max offset
      else if (newOffset < maxOffset) offset.value = maxOffset;
      // Within bounds: update offset to new offset
      else offset.value = newOffset;

      // Start countdown if button is at max offset
      if (offset.value === maxOffset) startCountdown();
      // Cancel countdown if button is not at max offset
      else cancelCountdown();
    })
    .onEnd(() => {
      // On touch release, reset position of button
      offset.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });

      // Cancel countdown if released
      cancelCountdown();

      // Reset boolean that tracks if emergency was triggered
      didTriggerEmergency.value = false;
    });

  // Gesture handler for detecting if button is pressed
  const longPressGesture: LongPressGesture = Gesture.LongPress()
    .minDuration(EMERGENCY_TIME_THRESHOLD)
    .maxDistance(DEVICE_HEIGHT) // weird behavior-value pairing...?
    .onStart(() => {
      // At start of long press...
      runOnJS(hideMoodsHandler)();
      isPressed.value = true;
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
      isPressed.value = false;
    });

  const simultaneousGesture: SimultaneousGesture = Gesture.Simultaneous(
    panGesture,
    longPressGesture
  );

  const exclusiveGesture: ExclusiveGesture = Gesture.Exclusive(
    tapGesture,
    simultaneousGesture
  );

  /***
   * RENDER
   ***/
  return (
    <View>
      {showMoods && <MoodButtons onMoodPress={hideMoodsHandler} />}
      {showOverlay && (
        <EmergencyOverlay
          countdown={displayedCountdown}
          buttonOffset={offset}
          maxOffset={maxOffset}
        />
      )}
      <Animated.View style={[EmergencyButtonStyles.slider, sliderAnimation]} />
      <GestureDetector gesture={exclusiveGesture}>
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
              redShadowAnimation,
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
