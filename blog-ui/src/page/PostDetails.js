import {useParams} from "react-router-dom";
import {Box, Button, Grid, IconButton, Paper, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Loading from "../components/utils/Loading";
import {getPost} from "../components/api/postApi";
import AlertMessage from "../components/utils/AlertMessage";
import {useTranslation} from "react-i18next";
import {deleteComment, getComments, saveComment} from "../components/api/commentApi";
import {useSelector} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import FormTextInput from "../components/forms/utils/FormTextInput";


export default () => {

    const {postId} = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(true);
    const user = useSelector(state => state.user.user);
    const [notification, setNotification] = useState({isVisible: false});
    const {t} = useTranslation('detailedPost');

    const commentValidationSchema = Yup.object().shape(
        {
            comment: Yup.string()
                .min(5, t('commentMin'))
                .max(65, t('commentMax'))
                .required(t('commentRequired'))
        });

    const onComment = (values, helpers) =>{
        helpers.setSubmitting(true);

        saveComment(values, postId)
            .then((response) => {
                setNotification({isVisible: true, message: t('successAlert'), severity: 'success'})
                refreshComments(postId);
            })
            .catch((error) => setNotification({isVisible: true, message: t('errorAlert'), severity: 'error'}))
            .finally(() => {
                setTimeout(() => {
                    helpers.setSubmitting(false)
                    setNotification({isVisible: false})
                    helpers.resetForm();
                }, 1000)
            })
    }

    const refreshComments = (postId) => {
        getComments(postId)
            .then(({data}) => setComments(data))
            .catch((error) => setLoaded(false))
            .finally(() => setLoading(false));
    }

    const onDelete = (commentId) =>{
        deleteComment(commentId)
            .then(() => {
                setComments(comments.filter(c=> c.id !== commentId))
            })
            .catch((error) => console.log(error))
            .finally()
    }


    useEffect(() => {
        getPost(postId)
            .then(({data}) => setPost(data))
            .catch((error) => setLoaded(false))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getComments(postId)
            .then(({data}) => setComments(data))
            .catch((error) => setLoaded(false))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {
                loading ? <Loading/> :
                    !loaded ? <AlertMessage severity="error" message={t('alert')}/>
                        :
                        <>
                        <Box sx={{display: 'flex', justifyContent: 'center', textAlign: 'center', mb: 3}}>
                            <Paper elevation={3} sx={{minWidth: '500px', p: 1}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                    <Typography variant="h5" fontFamily="fantasy"
                                                color="lightskyblue">{post.username}</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="h5" fontFamily="fantasy"
                                                    color="lightskyblue">{post.title}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Typography variant="h5" fontFamily="fantasy"
                                                color="lightskyblue">{post.date}</Typography>
                                    </Grid>
                                </Grid>
                                <img style={{width: '80vh', height: '60vh'}} src={post.image}/>
                                <p>{post.content}</p>
                                <Formik
                                    initialValues={{
                                        comment: ''
                                    }}
                                    validationSchema={commentValidationSchema}
                                    onSubmit={onComment}
                                >
                                    {
                                        props => (
                                            <Form>
                                                <Stack spacing={2}>
                                                    <FormTextInput
                                                        name="comment"
                                                        placeholder={t('commentPlaceholder')}
                                                        error={props.touched.comment && !!props.errors.comment}
                                                        style={{width: "780px"}}/>
                                                    {
                                                        props.isSubmitting ? <Loading/> :
                                                            <Button variant="outlined" type="submit" color="primary" >{t('button')}</Button>
                                                    }
                                                    {
                                                        notification.isVisible && <AlertMessage severity={notification.severity} message={notification.message}/>
                                                    }
                                                </Stack>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </Paper>
                        </Box>
                        </>
            }
            {
            comments.length == 0 ? <AlertMessage severity="info" message={t('noComments')}/>
            :
            <>
                {comments.map((comment) => (
                    <Box sx={{display: 'flex', justifyContent: 'center', textAlign: 'center'}} key={comment.id}>
                        <Paper elevation={3} sx={{width: '800px', p: 1}} key={comment.id}>
                            <Grid container>
                                <Grid item xs={1}>
                                    <Typography variant="overline" >{comment.username}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="overline" >{comment.date}</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="subtitle2" >{comment.comment}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    {
                                        (user?.roles.includes('ADMIN') || user?.username == comment.username) &&
                                        <IconButton aria-label="delete post" color="error" onClick={() => onDelete(comment.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                ))}
            </>
            }
        </>
    );
}