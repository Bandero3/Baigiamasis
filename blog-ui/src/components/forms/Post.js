import { Form, Formik} from "formik";
import {CircularProgress, Button, Stack, Typography, Alert, Box} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./utils/FormTextInput";
import {savePost} from "../api/postApi";
import {useState} from "react";
import AlertMessage from "../utils/AlertMessage";
import {useTranslation} from "react-i18next";


export default () => {

    const [notification, setNotification] = useState({isVisible: false});
    const {t} = useTranslation('postCreateForm');

    const postValidationSchema = Yup.object().shape(
        {
            title: Yup.string()
                .min(5, t('titleMin'))
                .max(30, t('titleMax'))
                .required(t('titleRequired')),
            description: Yup.string()
                .min(5, t('descriptionMin'))
                .max(30, t('descriptionMax'))
                .required(t('descriptionRequired')),
            content: Yup.string()
                .min(5, t('contentMin'))
                .max(500, t('contentMax'))
                .required(t('contentRequired')),
            image: Yup.string()
                .matches(
                    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                    t('imageFormat'))
                .required( t('imageRequired'))
        });

    const onCreatePost = (values, helpers) =>{
        helpers.setSubmitting(true);

        savePost(values)
            .then((response) => {
                helpers.resetForm();
                setNotification({isVisible: true, message: t('successAlert'), severity: 'success'})
            })
            .catch((error) => setNotification({isVisible: true, message: t('errorAlert'), severity: 'error'}))
            .finally(() =>helpers.setSubmitting(false))
    }

    return(

    <Formik initialValues={{
        title: '',
        description: '',
        content: '',
        image: ''
    }}
            onSubmit={onCreatePost}

            validationSchema={postValidationSchema}

    >
        {props => (
            <Form>
                {
                    notification.isVisible && <AlertMessage severity={notification.severity} message={notification.message}/>
                }

                <Stack spacing={2} alignItems="center">
                    <Typography variant="h5" fontFamily="fantasy" color="lightskyblue">{t('createPost')}</Typography>
                    <FormTextInput name="title"
                                   label={t('title')}
                                   placeholder={t('titlePlaceholder')}
                                   error={props.touched.title && !!props.errors.title}
                    />
                    <FormTextInput name="description"
                                   label={t('description')}
                                   placeholder={t('descriptionPlaceholder')}
                                   error={props.touched.description && !!props.errors.description}
                    />

                    <FormTextInput name="content"
                                   label={t('content')}
                                   placeholder={t('contentPlaceholder')}
                                   error={props.touched.content && !!props.errors.content}
                                   rows={5}
                                   multiline
                    />

                    <FormTextInput name="image"
                                   label={t('image')}
                                   placeholder={t('imagePlaceholder')}
                                   error={props.touched.image && !!props.errors.image}/>

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