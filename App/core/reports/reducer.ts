import {
  CLEAR_FORM,
  CREATE_REPORT,
  DELETE_REPORT,
  EDIT_REPORT,
  GET_REPORTS,
  LOADING,
  SAVE_IMAGE,
} from './types';

import {Reducer} from '../reducer';

import type {ReportContext} from './entity';

const initialReportForm = {
  description: '',
  title: '',
  createAt: new Date(),
  imageUrl: null,
};

export const INITIAL_STATE_REPORT: ReportContext = {
  loading: false,
  reports: [],
  reportForm: initialReportForm,
};

const setLoading = (state: ReportContext, action: any): ReportContext => {
  return {
    ...state,
    loading: action.payload,
  };
};

const createReport = (state: ReportContext, action: any): ReportContext => {
  return {
    ...state,
    reportForm: action.payload,
  };
};
const clearForm = (state: ReportContext): ReportContext => {
  return {
    ...state,
    reportForm: initialReportForm,
  };
};

const getReports = (state: ReportContext, action: any): ReportContext => {
  return {
    ...state,
    reports: action.payload,
  };
};
const saveImage = (state: ReportContext, action: any): ReportContext => {
  return {
    ...state,
    reportForm: {
      ...state.reportForm,
      imageUrl: action.payload,
    },
  };
};

const editReport = (state: ReportContext, action: any): ReportContext => {
  return {
    ...state,
    reportForm: initialReportForm,
    reports: state.reports.map(report => {
      if (report.id === action.payload.id) {
        return action.payload;
      } else {
        return report;
      }
    }),
  };
};

const deleteReport = (state: ReportContext, action: any): ReportContext => {
  return {
    ...state,
    reports: state.reports.filter(report => report.id !== action.payload),
  };
};

export default Reducer(INITIAL_STATE_REPORT, {
  [LOADING]: setLoading,
  [CREATE_REPORT]: createReport,
  [CLEAR_FORM]: clearForm,
  [GET_REPORTS]: getReports,
  [SAVE_IMAGE]: saveImage,
  [EDIT_REPORT]: editReport,
  [DELETE_REPORT]: deleteReport,
});
