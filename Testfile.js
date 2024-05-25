import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

const CircleAnimation = () => {
  const animations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    const createAnimation = (animation) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animatedSequences = animations.map((animation) =>
      createAnimation(animation)
    );

    animatedSequences.forEach((seq) => seq.start());

    return () => {
      animatedSequences.forEach((seq) => seq.stop());
    };
  }, [animations]);

  const interpolatedAnimations = animations.map((animation, index) => {
    const inputRange = [0, 1];
    const outputRange = [index % 2 === 0 ? -100 : 50, index % 2 === 0 ? 50 : -100];
    return animation.interpolate({ inputRange, outputRange });
  });

  return (
    <View style={styles.container}>
      {interpolatedAnimations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.circle,
            {
              transform: [
                { translateX: anim },
                { translateY: anim },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8A2BE2',
  },
});

export default CircleAnimation;