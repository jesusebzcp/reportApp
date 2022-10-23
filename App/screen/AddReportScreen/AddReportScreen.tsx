import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

import {Form} from '@/components/Form';
import {Metrics} from '@/theme';

export const AddReportScreen = () => {
  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => Keyboard.dismiss()}>
      <Form />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Metrics.addFooter + 20,
  },
});
