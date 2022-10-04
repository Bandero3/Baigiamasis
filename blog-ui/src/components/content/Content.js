import {Container, Stack} from "@mui/material";
import Post from "../forms/Post";
import User from "../forms/User";
import DisplayedPosts from "../../page/DisplayedPosts";
import {Route, Routes} from "react-router-dom";
import PostDetails from "../../page/PostDetails";
import FavoritePosts from "../../page/FavoritePosts";
import UpdatePost from "../forms/UpdatePost";
import SearchedPosts from "../../page/SearchedPosts";
import Login from "../forms/Login";
import SecuredRoute from "../security/SecuredRoute";

export default () => {
    return(
        <Stack sx={{background: 'linear-gradient(to right, #fff59d, #fff9c4)'/*, direction: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight:'calc(100vh - 184px)', pt: 3, pb: 3*/}}>
            <Container maxWidth="xl" component="main" sx={{minHeight:'calc(100vh - 232px)', mt: 3, mb: 3}}>
            <Routes>
                <Route path="/" element={<DisplayedPosts/>}/>


                <Route path="/posts/create" element={ <SecuredRoute/>}>
                <Route path="/posts/create" element={ <Post/>}/>
                </Route>

                <Route path="/posts/:postId/details" element={ <SecuredRoute/>}>
                <Route path="/posts/:postId/details" element={ <PostDetails/>}/>
                </Route>

                <Route path="/posts/:postId/update" element={ <UpdatePost/>}/>
                <Route path="/posts/favorites" element={<FavoritePosts/>}/>
                <Route path="/posts/search/:query" element={<SearchedPosts/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/users/register" element={<User/>}/>
            </Routes>
            </Container>
        </Stack>
    );
}