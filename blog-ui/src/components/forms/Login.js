import {Form, Formik} from "formik";
import {Alert, Box, Button, Grid, Stack} from "@mui/material";
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import Loading from "../utils/Loading";
import FormTextInput from "./utils/FormTextInput";
import Link from "@mui/material/Link";
import {NavLink, useNavigate} from "react-router-dom";
import {login} from "../api/userApi";
import {useState} from "react";
import {addUserToState} from "../../store/slices/user/userSlice";
import {useTranslation} from "react-i18next";


export default () => {

    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation('loginForm');

    const loginValidationSchema = Yup.object().shape(
        {
            username: Yup.string().required(t('usernameRequired')),
            password: Yup.string().required(t('passwordRequired'))
        });

    const onLogin = (data, helpers) => {
        login(data)
            .then(({data, headers}) => {
                dispatch(addUserToState({
                    user: data,
                    jwtToken: headers.authorization
                }));
                navigate('/');
            })
            .catch((error) => setError(true))
            .finally(() => helpers.setSubmitting(false))
    }

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={onLogin}
        >
            {
                props => (
                    <Form>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh'}}>
                            <Stack spacing={2}>
                                {error && <Alert severity="error">{t('errorAlert')}</Alert>}
                                <FormTextInput
                                    name="username"
                                    label={t('username')}
                                    placeholder={t('usernamePlaceholder')}
                                    error={props.touched.username && !!props.errors.username}/>
                                <FormTextInput
                                    name="password"
                                    label={t('password')}
                                    placeholder={t('passwordPlaceholder')}
                                    error={props.touched.password && !!props.errors.password}
                                    type="password"/>
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                <Link
                                    variant="subtitle2"
                                    color="primary"
                                    to="/users/register"
                                    component={NavLink}
                                    sx={{my: 1, mx: 1.5, textDecoration: 'unset'}}>
                                    {t('registration')}
                                </Link>
                                    </Grid>
                                    <Grid item xs={4}>
                                    {
                                        props.isSubmitting ? <Loading/> :
                                            <Button variant="outlined" type="submit" color="primary" >{t('button')}</Button>
                                    }
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Box>
                    </Form>
                )
            }
        </Formik>
    );
}