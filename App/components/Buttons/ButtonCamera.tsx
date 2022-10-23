import React, {useContext} from 'react';
import {Alert, TouchableOpacity} from 'react-native';

import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {SvgCamera} from '@/assets/svg/SvgCamera';
import {saveImage} from '@/core/reports/actions';
import {Context} from '@/core/StoreContext';
import {StoreContextUI} from '@/core/entity';

const options: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 1,
};

export const ButtonCamera = () => {
  const {reportDispatch}: StoreContextUI = useContext(Context);
  const handleOpenCamera = async () => {
    const result = await launchCamera(options);
    const uri = result.assets?.[0].uri ?? '';

    saveImage(uri, reportDispatch);
  };

  const handleOpenGallery = async () => {
    const result = await launchImageLibrary(options);
    const uri = result.assets?.[0].uri ?? '';
    saveImage(uri, reportDispatch);
  };

  const handlePickerCamera = () => {
    Alert.alert('Hey', 'Sube una imagen para compartir en el reporte', [
      {
        text: 'Abrir galería',
        onPress: handleOpenGallery,
      },
      {
        text: 'Tomar foto',
        onPress: handleOpenCamera,
      },
      {
        text: 'Cancelar',
        style: 'destructive',
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={handlePickerCamera}>
      <SvgCamera />
    </TouchableOpacity>
  );
};
