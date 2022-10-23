import React, {useCallback, useContext, useEffect} from 'react';
import {Alert, FlatList, StyleSheet, View} from 'react-native';

import {Report} from '@/components/Report';
import {Colors, Metrics} from '@/theme';
import {Separator} from '@/components/Separator';
import {deleteReport, getReports} from '@/core/reports/actions';
import {Context} from '@/core/StoreContext';
import {StoreContextUI} from '@/core/entity';
import {ListEmptyComponent} from './ListEmptyComponent';

export const ListReport = () => {
  const {state, reportDispatch}: StoreContextUI = useContext(Context);

  const {reportState} = state;
  const {reports} = reportState;

  const keyExtractor = useCallback((_, index) => `index-${index}`, []);

  const handleDeleteReport = useCallback(
    id => {
      Alert.alert(
        'Confirmación',
        'Estas seguro que deseas eliminar este reporte?',
        [
          {
            text: 'Si, estoy seguro',
            style: 'destructive',
            onPress: () => id && deleteReport(id, reportDispatch),
          },
          {
            text: 'Cancelar',
          },
        ],
      );
    },
    [reportDispatch],
  );

  useEffect(() => {
    getReports(reportDispatch);
  }, [reportDispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={reports}
        renderItem={({item}) => (
          <Report item={item} handleDeleteReport={handleDeleteReport} />
        )}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 20,
    minHeight: Metrics.screenHeight * 0.5,
    maxHeight: Metrics.screenHeight * 0.8,
    backgroundColor: Colors.light,
    borderRadius: 8,
  },
});
