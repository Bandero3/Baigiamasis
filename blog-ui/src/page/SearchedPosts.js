import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {searchPosts} from "../components/api/postApi";
import {useState} from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import Loading from "../components/utils/Loading";
import AlertMessage from "../components/utils/AlertMessage";
import DisplayedPostTemplate from "./utils/PostCard/DisplayedPostTemplate";
import {Stack} from "@mui/material";

export default () => {
    const {query} = useParams();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(true);
    const favorites = useSelector(state => state.favorites)
    const {t} = useTranslation('searchedPosts');

    useEffect(() => {
        searchPosts(query)
            .then(({data}) => setPosts(data))
            .catch((error) => setLoaded(false))
            .finally(() => setLoading(false));
    }, [])
    return (
        <>
            {
                loading ?
                    <Loading/>
                    :
                    posts.length == 0 ? <AlertMessage severity="error" message={t('alert', {query: query})}/>
                        :
                        !loaded ? <AlertMessage severity="error" message={t('apiAlert')}/>
                            :
                            <Stack display="flex" direction="row" flexWrap="wrap">
                                {posts.map((post) => (
                                    <DisplayedPostTemplate post={post} favorites={favorites} key={post.id}/>
                                ))}
                            </Stack>
            }
        </>
    );
}