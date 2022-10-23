import {ReportContext} from './reports/entity';

export interface StoreContextUI {
  state: {
    reportState: ReportContext;
  };
  reportDispatch: () => void;
}
