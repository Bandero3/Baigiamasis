import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import {Avatar, Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../language/LanguageSwitcher";
import SearchBar from "../utils/SearchBar";
import {useState} from "react";
import {removeUser} from "../../store/slices/user/userSlice";
import {Logout} from "@mui/icons-material";
import {dropFavorites} from "../../store/slices/favorites/favoritesSlice";

export default () => {
    const {t} = useTranslation('header');
    const favorites = useSelector(state => state.favorites);
    const totalFavorites = favorites.length;

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        dispatch(removeUser());
        dispatch(dropFavorites());
        navigate("/");
    }
    return (
        <>
            <GlobalStyles styles={{ul: {margin: 0, padding: 0, listStyle: 'none'}}}/>
            <CssBaseline/>
            <AppBar
                position="sticky"
                color="default"
                elevation={0}
                sx={{background: 'linear-gradient(to right, #64b5f6, #90caf9)'}}
            >
                <Toolbar>
                    <Typography variant="h6"
                                color="inherit"
                                noWrap
                                sx={{width: '50px', textDecoration: 'unset', minWidth: '50px'}}
                                to="/"
                                component={NavLink}>
                        <img src="/mylogo.PNG" alt="Company logo image" width="50" height="50" align="center"/>
                    </Typography>
                    <Stack direction="row"
                           justifyContent="flex-end"
                           alignItems="center"
                           spacing={2}
                           sx={{width: '100%'}}>
                        <SearchBar/>
                        <nav>
                            <Link
                                variant="button"
                                color="#fff9c4"
                                to="/posts/create"
                                component={NavLink}
                                sx={{my: 1, mx: 1.5, textDecoration: 'unset'}}>
                                {t('createPost')}
                            </Link>
                            {
                            user &&
                            <Link
                                variant="button"
                                color="error"
                                to="/posts/favorites"
                                component={NavLink}
                                sx={{my: 1, mx: 1.5}}>
                                <Badge badgeContent={totalFavorites} color="primary">
                                    {
                                        favorites.length == 0 ? <FavoriteBorderIcon/>
                                            :
                                            <FavoriteIcon/>
                                    }
                                </Badge>
                            </Link>
                            }
                        </nav>
                        {
                            user ?
                                <>
                                    <Tooltip title="User account">
                                        <IconButton
                                            size="small"
                                            onClick={handleClick}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}>
                                            <Avatar sx={{width: 32, height: 32, bgcolor: "lightBlue" }}>
                                                {(user.username).charAt(0)}
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    >
                                        <MenuItem>
                                            <Avatar sx={{width: 32, height: 32, bgcolor: "lightBlue" }}>
                                                {(user.username).charAt(0)}
                                            </Avatar>
                                            {user.fullName}
                                        </MenuItem>
                                        <Divider/>
                                        <MenuItem onClick={onLogout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small"/>
                                            </ListItemIcon>
                                            {t('logout')}
                                        </MenuItem>
                                    </Menu>
                                </>
                                :
                            <Button to="/login"
                                    component={NavLink}
                                    variant="outlined"
                                    sx={{my: 1, mx: 1.5}}>
                                {t('login')}
                            </Button>
                        }
                        <LanguageSwitcher/>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}