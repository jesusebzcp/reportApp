import {ButtonCamera} from '@/components/Buttons';
import {AddReportScreen} from '@/screen/AddReportScreen';
import {HomeScreen} from '@/screen/HomeScreen';

export const screens: any[] = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      title: 'Reportes',
    },
  },
  {
    name: 'AddReport',
    component: AddReportScreen,
    options: {
      title: 'Agregar reporte',
      headerRight: ButtonCamera,
    },
  },
];
