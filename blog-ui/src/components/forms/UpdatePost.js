import { Form, Formik} from "formik";
import {CircularProgress, Button, Stack, Typography} from "@mui/material";
import * as Yup from 'yup';
import FormTextInput from "./utils/FormTextInput";
import {getPost, updatePost} from "../api/postApi";
import {useEffect, useState} from "react";
import AlertMessage from "../utils/AlertMessage";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../utils/Loading";
import {useTranslation} from "react-i18next";


export default () => {
    const{postId} = useParams();

    const [notification, setNotification] = useState({isVisible: false});
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {t} = useTranslation('postUpdateForm');

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



    useEffect(() => {
        getPost(postId)
            .then(({data}) => setPost(data))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    const onUpdatePost = (values, helpers) =>{
        helpers.setSubmitting(true);

        updatePost(values, postId)
            .then((response) => navigate('/'))
            .catch((error) => setNotification({isVisible: true, message: t('errorAlert'), severity: 'error'}))
            .finally(() =>helpers.setSubmitting(false))
    }

    return(
        <>
            {
                loading ? <Loading/> :

        <Formik initialValues={{
            title: post.title,
            description: post.description,
            content: post.content,
            image: post.image
        }}
                onSubmit={onUpdatePost}

                validationSchema={postValidationSchema}

        >
            {props => (
                <Form>
                    {
                        notification.isVisible && <AlertMessage severity={notification.severity} message={notification.message}/>
                    }

                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h5" fontFamily="fantasy" color="lightskyblue">{t('updatePost')}</Typography>
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
            }
        </>
    );
}