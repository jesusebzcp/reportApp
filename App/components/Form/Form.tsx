import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import {Formik} from 'formik';
import {withNextInputAutoFocusForm} from 'react-native-formik';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useNavigation} from '@react-navigation/native';

import {Colors, Metrics} from '@/theme';
import {Context} from '@/core/StoreContext';
import {StoreContextUI} from '@/core/entity';
import {NavigationProps} from '@/config/router/entitys';
import {
  handleCreateReport,
  saveImage,
  updateReport,
} from '@/core/reports/actions';

import {Input} from '../Input';
import {Button, ButtonClose} from '../Buttons';

import {validationSchema} from './validation';

export const Form = () => {
  const navigation = useNavigation<NavigationProps>();

  const {state, reportDispatch}: StoreContextUI = useContext(Context);

  const {reportState} = state;
  const {reportForm, loading} = reportState;

  const FormView = withNextInputAutoFocusForm(View);

  const _handleSubmit = useCallback(
    async values => {
      if (!reportForm.imageUrl) {
        Toast.show({
          type: 'error',
          text1: 'La image es obligatoria',
        });
        return;
      }

      if (reportForm.id) {
        await updateReport(
          {
            ...reportForm,
            ...values,
          },
          reportDispatch,
        );
      } else {
        await handleCreateReport(
          {
            ...reportForm,
            ...values,
          },
          reportDispatch,
        );
      }

      navigation.goBack();
    },
    [navigation, reportDispatch, reportForm],
  );

  const deleteImage = useCallback(() => {
    saveImage(null, reportDispatch);
  }, [reportDispatch]);

  const initialValues = useMemo(() => {
    if (reportForm.id) {
      return {
        title: reportForm.title,
        description: reportForm.description,
      };
    }
    return {
      title: '',
      description: '',
    };
  }, [reportForm.description, reportForm.id, reportForm.title]);

  useEffect(() => {
    if (reportForm.id) {
      navigation.setOptions({title: 'Editar Reporte!'});
    }
  }, [navigation, reportForm.id]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={_handleSubmit}>
      {({
        handleChange,
        values,
        setFieldTouched,
        errors,
        isValid,
        handleSubmit,
      }) => (
        <FormView style={styles.form}>
          {reportForm.imageUrl && (
            <View style={styles.containerImage}>
              <View style={styles.buttonClose}>
                <ButtonClose onPress={deleteImage} />
              </View>
              <Image
                source={{
                  uri: reportForm.imageUrl,
                }}
                style={styles.image}
              />
            </View>
          )}

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Input
              label="Titulo"
              placeholder="Titulo del reporte"
              onChangeText={handleChange('title')}
              onBlur={() => setFieldTouched('title')}
              value={values.title}
              error={errors.title}
            />
            <Input
              label="Descripción"
              placeholder="Ingrese su breve descripción"
              onChangeText={handleChange('description')}
              onBlur={() => setFieldTouched('description')}
              value={values.description}
              error={errors.description}
            />
          </KeyboardAvoidingView>
          <View style={styles.footer}>
            <Button
              text={reportForm.id ? 'Guardar cambios' : 'Guardar reporte'}
              disabled={!isValid}
              loading={loading}
              onPress={handleSubmit}
            />
          </View>
        </FormView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: Colors.light,
    paddingHorizontal: 20,
    borderRadius: 8,
    paddingVertical: 20,
    width: Metrics.screenWidth * 0.9,
  },
  footer: {
    marginTop: 20,
  },
  image: {
    height: 100,
    width: Metrics.screenWidth * 0.8,
    marginVertical: 10,
    borderRadius: 8,
  },
  containerImage: {
    position: 'relative',
  },
  buttonClose: {
    position: 'absolute',
    zIndex: 1,
    right: 10,
    top: 20,
  },
});
