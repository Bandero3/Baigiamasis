import {useEffect, useState} from "react";
import {deletePost, getPosts} from "../components/api/postApi";
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent, CardHeader,
    CardMedia,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {NavLink} from "react-router-dom";
import Loading from "../components/utils/Loading";
import AlertMessage from "../components/utils/AlertMessage";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, removeFromFavorites} from "../store/slices/favorites/favoritesSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useTranslation} from "react-i18next";

export default  () => {

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const favorites = useSelector(state => state.favorites)
    const dispatcher = useDispatch();
    const addPost = (post) => dispatcher(addToFavorites(post));
    const removePost = (id) => dispatcher(removeFromFavorites(id));
    const user = useSelector(state => state.user.user);
    const {t} = useTranslation('posts');



    const onDelete = (postId) =>{
        deletePost(postId)
            .then(() => {
                removePost(postId);
                setPosts(posts.filter(p=> p.id !== postId))
            })
            .catch((error) => console.log(error))
            .finally()
    }

    useEffect(() => {
        getPosts()
            .then(({data}) => setPosts(data))
            .catch((error) => setLoaded(false))
            .finally(() => setLoading(false))
    },[]);

    return(
        <>
        {
            loading ?
                <Loading/>
                :
                posts.length == 0 ? <AlertMessage severity="error" message={t('alert')}/>
                    :
                !loaded ? <AlertMessage severity="error" message={t('apiAlert')}/>
                    :
                <Stack display="flex" direction="row" flexWrap="wrap">
                {posts.map((post) => (
                <Card sx={{ maxWidth: 345, minWidth: 345 ,mr:3, mb:3}} key={post.id}>

                    <CardActionArea component={NavLink} to={`/posts/${post.id}/details`}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "lightskyblue" }}>
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
                        {
                            user &&
                            <>
                            {
                                favorites.find(p => p.id === post.id) ?
                                    <IconButton sx={{ml: 'auto'}} aria-label="add post to favorites (added)"
                                                onClick={() => removePost(post.id)}>
                                        <FavoriteIcon/>
                                    </IconButton>
                                    :
                                    <IconButton sx={{ml: 'auto'}} aria-label="add post to favorites"
                                                onClick={() => addPost(post)}>
                                        <FavoriteBorderIcon/>
                                    </IconButton>
                            }
                            </>
                        }
                        {
                            (user?.roles.includes('ADMIN') || user?.username == post.username) &&
                        <IconButton aria-label="edit post" color="primary" component={NavLink} to={`/posts/${post.id}/update`}>
                            <EditIcon />
                        </IconButton>
                        }
                        {
                            (user?.roles.includes('ADMIN') || user?.username == post.username) &&
                        <IconButton aria-label="delete post" color="error" onClick={() => onDelete(post.id)}>
                            <DeleteIcon />
                        </IconButton>
                        }
                    </CardActions>
                </Card>
                        ))}
                </Stack>
        }
        </>
    );
}