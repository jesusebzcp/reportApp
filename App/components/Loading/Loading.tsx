import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '@/theme';

import {AppText} from '../AppText';

interface LoadingProps {
  loading: boolean;
}

export const Loading = ({loading}: LoadingProps) => {
  if (!loading) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Colors.primary} />
      <AppText.LABEL text="Cargando reportes..." style={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
    backgroundColor: Colors.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
  },
});
