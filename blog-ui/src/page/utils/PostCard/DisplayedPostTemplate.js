import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography
} from "@mui/material";
import {NavLink} from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, removeFromFavorites} from "../../../store/slices/favorites/favoritesSlice";


export default ({post, favorites}) => {
    const dispatcher = useDispatch();
    const user = useSelector(state => state.user.user);
    const addPost = (post) => dispatcher(addToFavorites(post));
    const removePost = (id) => dispatcher(removeFromFavorites(id));



    return(
        <>
        <Card sx={{ maxWidth: 345, minWidth: 345 ,mr:3, mb:3}}>
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
                    (user?.roles.includes('ADMIN')  || user?.username == post.username) &&
                <IconButton aria-label="edit post" color="primary" component={NavLink} to={`/posts/${post.id}/update`}>
                    <EditIcon />
                </IconButton>
                }
            </CardActions>
        </Card>
        </>
    );
}