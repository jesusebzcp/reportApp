import React from 'react';
import {StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';

import {AppText} from '@/components/AppText';

export const ListEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Lottie
        source={require('../../assets/animations/empty.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <AppText.LABEL text={'No hay reportes'} style={styles.description} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animation: {
    height: 300,
  },
  description: {
    textAlign: 'center',
  },
});
