import * as Yup from 'yup'
import {Form, Formik} from "formik";
import {Button, CircularProgress, Stack, Typography} from "@mui/material";
import FormTextInput from "./utils/FormTextInput";
import {saveUser} from "../api/userApi";
import {useState} from "react";
import AlertMessage from "../utils/AlertMessage";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";


export default () => {


    const [notification, setNotification] = useState({isVisible: false});
    const {t} = useTranslation('userCreateForm');
    const navigate = useNavigate();
    const userValidationSchema = Yup.object().shape(
        {
            name: Yup.string()
                .min(4,  t('nameMin'))
                .max(20,  t('nameMax'))
                .required( t('nameRequired')),
            surname: Yup.string()
                .min(4,  t('surnameMin'))
                .max(20,  t('surnameMax'))
                .required( t('surnameRequired')),
            username: Yup.string()
                .min(4,  t('usernameMin'))
                .max(20,  t('usernameMax'))
                .required( t('usernameRequired')),
            email: Yup.string()
                .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    t('emailFormat'))
                .required( t('emailRequired')),
            password: Yup.string()
                .min(8,  t('passwordMin'))
                .max(20, t('passwordMax'))
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    t('passwordFormat'))
                .required( t('passwordRequired')),
                    repeatPassword: Yup.string()
                        .required('Please repeat your password')
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')

        });

    const onCreateUser = (values, helpers) => {
        helpers.setSubmitting(true);

        saveUser(values)
            .then((response) => navigate('/login'))
            .catch((error) => setNotification({isVisible: true, message: t('errorAlert'), severity: 'error'}))
            .finally(() => helpers.setSubmitting(false));
    }

    return(

    <Formik initialValues={{
        name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    }}
            onSubmit={onCreateUser}
            validationSchema={userValidationSchema}
    >
        {props => (
            <Form>
                {
                    notification.isVisible && <AlertMessage severity={notification.severity} message={notification.message}/>
                }
                <Stack spacing={2} alignItems="center">
                    <Typography variant="h5" fontFamily="fantasy" color="lightskyblue">{t('register')}</Typography>
                    <FormTextInput name="name"
                                   label={t('name')}
                                   placeholder={t('namePlaceholder')}
                                   error={props.touched.name && !!props.errors.name}
                    />

                    <FormTextInput name="surname"
                                   label={t('surname')}
                                   placeholder={t('surnamePlaceholder')}
                                   error={props.touched.surname && !!props.errors.surname}
                    />

                    <FormTextInput name="username"
                                   label={t('username')}
                                   placeholder={t('usernamePlaceholder')}
                                   error={props.touched.username && !!props.errors.username}/>

                    <FormTextInput name="email"
                                   label={t('email')}
                                   placeholder={t('emailPlaceholder')}
                                   error={props.touched.email && !!props.errors.email}/>

                    <FormTextInput name="password"
                                   label={t('password')}
                                   placeholder={t('passwordPlaceholder')}
                                   error={props.touched.password && !!props.errors.password}
                                   type="password"/>

                                        <FormTextInput name="repeatPassword"
                                   label="Repeat password"
                                   placeholder="Repeat password"
                                   error={props.touched.repeatPassword && !!props.errors.repeatPassword}
                                   type="password"/>

                    {
                        props.isSubmitting ? <CircularProgress/> :
                            <Button variant="outlined"
                                    color="primary"
                                    type="submit">{t('submit')}</Button>
                    }
                </Stack>
            </Form>
        )}

    </Formik>
    );
}