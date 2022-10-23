import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

import {Report} from './entity';
import {
  CLEAR_FORM,
  CREATE_REPORT,
  DELETE_REPORT,
  EDIT_REPORT,
  GET_REPORTS,
  LOADING,
  SAVE_IMAGE,
} from './types';

const REPORT_DB = 'REPORTS';

const _saveReport = async (newReport: Report) => {
  let allReports: Report[] | [] = [];
  const reportsResponse = await AsyncStorage.getItem(REPORT_DB);
  if (reportsResponse && reportsResponse.length > 0) {
    const newReports = [
      ...(JSON.parse(reportsResponse) as Report[] | []),
      newReport,
    ];
    allReports = newReports;
  } else {
    allReports = [newReport];
  }

  await AsyncStorage.setItem(REPORT_DB, JSON.stringify(allReports));
};
const _updateReport = async report => {
  let allReports: Report[] | [] = [];
  const reportsResponse = await AsyncStorage.getItem(REPORT_DB);

  if (reportsResponse) {
    allReports = JSON.parse(reportsResponse);

    allReports.map(reportItem => {
      if (reportItem.id === report.id) {
        return report;
      } else {
        return reportItem;
      }
    });

    await AsyncStorage.setItem(REPORT_DB, JSON.stringify(allReports));
  }
};
export const _deleteReport = async (id: string) => {
  const reportsResponse = await AsyncStorage.getItem(REPORT_DB);

  if (reportsResponse) {
    const reports: Report[] = JSON.parse(reportsResponse);

    await AsyncStorage.setItem(
      REPORT_DB,
      JSON.stringify(reports.filter(report => report.id !== id)),
    );
  }
};

export const setLoading = (loading: boolean, dispatch: any) => {
  dispatch({
    type: LOADING,
    payload: loading,
  });
};

export const resetForm = dispatch => {
  dispatch({
    type: CLEAR_FORM,
  });
};

export const handleCreateReport = async (report: Report, dispatch: any) => {
  try {
    setLoading(true, dispatch);

    const newReport = {
      ...report,
      id: uuid.v4(),
    };
    await _saveReport(newReport);
    await getReports(dispatch);
    resetForm(dispatch);
    dispatch({
      type: CREATE_REPORT,
      payload: newReport,
    });

    Toast.show({
      type: 'success',
      text1: 'Genial!',
      text2: 'Se ha creado tu reporte.',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Ups...',
      text2: 'Ocurrió un error al intentar crear un reporte',
    });
  } finally {
    setLoading(false, dispatch);
  }
};

export const getReports = async (dispatch: any) => {
  try {
    setLoading(true, dispatch);
    const response = await AsyncStorage.getItem(REPORT_DB);
    dispatch({
      type: GET_REPORTS,
      payload: response ? JSON.parse(response) : [],
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Ups...',
      text2: 'Ocurrió un error al intentar traer los reportes',
    });
  } finally {
    setLoading(false, dispatch);
  }
};

export const deleteReport = async (id: string, dispatch: any) => {
  try {
    setLoading(true, dispatch);
    await _deleteReport(id);
    dispatch({
      type: DELETE_REPORT,
      payload: id,
    });
    await getReports(dispatch);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Ups...',
      text2: 'Ocurrió un erro al intentar eliminar el reporte',
    });
  } finally {
    setLoading(false, dispatch);
  }
};

export const saveImage = (image: string | null, dispatch: any) => {
  dispatch({
    type: SAVE_IMAGE,
    payload: image,
  });
};

export const updateReport = async (report: Report, dispatch: any) => {
  try {
    setLoading(true, dispatch);
    await _updateReport(report);
    dispatch({
      type: EDIT_REPORT,
      payload: report,
    });
    Toast.show({
      type: 'success',
      text1: 'Ups...',
      text2: 'El usuario se actualizo satisfactoriamente',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Ups...',
      text2: 'Ocurrió un error al intentar actualizar el reportes',
    });
  } finally {
    setLoading(false, dispatch);
  }
};

export const setForm = (report: Report, dispatch: any) => {
  dispatch({
    type: CREATE_REPORT,
    payload: report,
  });
};
