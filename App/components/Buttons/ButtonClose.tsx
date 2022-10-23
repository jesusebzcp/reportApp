import {Colors} from '@/theme';
import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {SvgClose} from '@/assets/svg/SvgClose';

const SIZE = 26;

interface ButtonCloseProps {
  onPress: () => void;
}

export const ButtonClose = ({onPress}: ButtonCloseProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <SvgClose />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light,
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
