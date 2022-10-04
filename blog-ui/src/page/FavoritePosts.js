import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent, CardHeader,
    CardMedia,
    IconButton, Stack,
    Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertMessage from "../components/utils/AlertMessage";
import {useDispatch, useSelector} from "react-redux";
import {removeFromFavorites} from "../store/slices/favorites/favoritesSlice";
import {useTranslation} from "react-i18next";

export default () => {
    const posts = useSelector(state => state.favorites)

    const dispatcher = useDispatch();
    const removePost = (id) => dispatcher(removeFromFavorites(id));
    const {t} = useTranslation('favorites');

    return (
        <>
            {
                posts.length == 0 ? <AlertMessage severity="error" message={t('alert')}/>
                    :
                        <Stack display="flex" direction="row" flexWrap="wrap">
                            {posts.map((post) => (
                                <Card sx={{maxWidth: 345, minWidth: 345, mr: 3, mb: 3}} key={post.id}>

                                    <CardActionArea component={NavLink} to={`/posts/${post.id}/details`}>

                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: "lightskyblue" }} aria-label="recipe">
                                                    {(post.username).charAt(0)}
                                                </Avatar>
                                            }
                                            title={post.username}
                                            subheader={post.date}
                                        />

                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={post.image}
                                            alt="post image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {post.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {post.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                    <CardActions>
                                        <IconButton sx={{ml: 'auto'}} aria-label="delete post from favorites" color="error"
                                                    onClick={() => removePost(post.id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            ))}
                        </Stack>
            }
        </>
    );
}