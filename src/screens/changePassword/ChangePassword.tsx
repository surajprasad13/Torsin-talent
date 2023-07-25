import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {CustomButton, CustomInput, Title} from '../../components';
import {colors, fonts} from '../../theme';
import {changePassword} from '../../redux/actions/authAction';
import {resetSuccess} from '../../redux/reducers/authSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';

const passwordStrength = [
  'At least one upper character.',
  'At least one numeric digit.',
  'At least one special character (E.g @%$)',
  'At least 8 characters',
];

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Please enter your current password.'),
  newPassword: Yup.string()
    .min(8, 'Min password length of 8 characters.')
    .matches(/(?=.*[A-Z])/, 'At least one uppercase character.')
    .matches(/(?=.*\d)/, 'At least one numeric digit.')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character (E.g @%$).')
    .required('Please enter your new password.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
    .required('Please confirm your new password.'),
});

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const {loading, success} = useAppSelector(state => state.auth);

  const resetPass = values => {
    dispatch(
      changePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }),
    );
  };

  const handleOnSubmit = values => {
    resetPass(values);
  };

  const handleValidation = value => {
    return ChangePasswordSchema.isValidSync({newPassword: value});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Change Password" />
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleOnSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={{margin: 10}}>
            <CustomInput
              label="Current Password"
              placeholder="********"
              password
              secureTextEntry
              containerStyle={{marginTop: 15}}
              onChangeText={handleChange('oldPassword')}
              onBlur={handleBlur('oldPassword')}
              value={values.oldPassword}
              maxLength={16}
              autoCapitalize="none"
            />
            {touched.oldPassword && errors.oldPassword && (
              <Text style={{color: 'red'}}>{errors.oldPassword}</Text>
            )}

            <CustomInput
              label="New Password"
              placeholder="********"
              password
              secureTextEntry
              containerStyle={{marginTop: 15}}
              onChangeText={text => {
                handleChange('newPassword')(text);
                handleValidation(text);
              }}
              onBlur={handleBlur('newPassword')}
              value={values.newPassword}
              maxLength={16}
              autoCapitalize="none"
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={{color: 'red'}}>{errors.newPassword}</Text>
            )}

            <CustomInput
              label="Confirm New Password"
              placeholder="********"
              password
              secureTextEntry
              containerStyle={{marginTop: 15}}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              maxLength={16}
              autoCapitalize="none"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{color: 'red'}}>{errors.confirmPassword}</Text>
            )}

            <View style={{marginTop: 20}}>
              {passwordStrength.map((_item, index) => {
                const active = handleValidation(values.newPassword);
                return (
                  <View key={index} style={styles.checkContainer}>
                    <IonIcon
                      name={active ? 'checkbox' : 'square-outline'}
                      size={25}
                      color={active ? colors.primary : '#BDBDBD'}
                    />
                    <Text
                      style={{
                        fontFamily: fonts.regular,
                        color: active ? colors.primary : '#BDBDBD',
                        paddingLeft: 10,
                      }}>
                      {_item}
                    </Text>
                  </View>
                );
              })}
            </View>

            <CustomButton
              title="Submit"
              loading={loading}
              onPress={handleSubmit}
              disabled={
                values.oldPassword.length >= 8 &&
                values.newPassword.length >= 8 &&
                values.confirmPassword.length >= 8 &&
                handleValidation(values.newPassword)
              }
              style={{marginTop: 100}}
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fbff',
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChangePassword;
