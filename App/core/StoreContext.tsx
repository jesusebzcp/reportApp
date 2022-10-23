import React, {createContext, useReducer} from 'react';
import reportReducer, {INITIAL_STATE_REPORT} from './reports/reducer';

import {StoreContextUI} from './entity';

export const Context: any = createContext<StoreContextUI | {}>({});

export const StoreContext = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [reportState, reportDispatch] = useReducer(
    reportReducer,
    INITIAL_STATE_REPORT,
  );

  return (
    <Context.Provider
      value={{
        state: {
          reportState,
        },
        reportDispatch,
      }}>
      {children}
    </Context.Provider>
  );
};
