import React, {useContext} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import type {Report as ReportUI} from '@/core/reports/entity';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '@/config/router/entitys';
import {SvgRight} from '@/assets/svg/SvgArrowRight';
import {setForm} from '@/core/reports/actions';
import {Context} from '@/core/StoreContext';
import {StoreContextUI} from '@/core/entity';

import {AppText} from '../AppText';

interface ReportProps {
  item: ReportUI;
  handleDeleteReport: (id: string | number[]) => void;
}

const SIZE = 20;

export const Report = ({item, handleDeleteReport}: ReportProps) => {
  const {reportDispatch}: StoreContextUI = useContext(Context);
  const navigation = useNavigation<NavigationProps>();

  const handleEdit = () => {
    setForm(item, reportDispatch);
    navigation.navigate('AddReport');
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onLongPress={() => item.id && handleDeleteReport(item.id)}
      onPress={handleEdit}>
      <View style={styles.row}>
        {item.imageUrl ? (
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        ) : null}

        <AppText.LABEL text={item.title} numberOfLines={1} />
      </View>
      <View style={styles.col2}>
        <AppText.MIN_DESCRIPTION
          text={item.description}
          style={styles.description}
          numberOfLines={1}
        />
        <SvgRight />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  col2: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  description: {
    marginRight: 10,
    maxWidth: '30%',
  },
});
