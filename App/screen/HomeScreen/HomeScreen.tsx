import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {NavigationProps} from '@/config/router/entitys';
import {Button} from '@/components/Buttons';
import {Loading} from '@/components/Loading';

import {Metrics} from '@/theme';
import {resetForm} from '@/core/reports/actions';

import {Context} from '@/core/StoreContext';
import {StoreContextUI} from '@/core/entity';

import {ListReport} from './ListReport';

export const HomeScreen = () => {
  const {reportDispatch}: StoreContextUI = useContext(Context);
  const navigation = useNavigation<NavigationProps>();

  const translateY = useRef(new Animated.Value(0)).current;

  const addReport = useCallback(() => {
    resetForm(reportDispatch);
    navigation.navigate('AddReport');
  }, [navigation, reportDispatch]);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -Metrics.addFooter,
      useNativeDriver: false,
      duration: 1500,
    }).start();
  }, [translateY]);

  return (
    <View style={styles.container}>
      <Loading />
      <ListReport />
      <Animated.View
        style={[
          styles.button,
          {
            transform: [{translateY}],
          },
        ]}>
        <Button text="Agregar reporte" onPress={addReport} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  button: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
    bottom: Metrics.addFooter + 40,
  },
});
