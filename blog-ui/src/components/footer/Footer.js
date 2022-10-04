import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Box, Container, Grid} from "@mui/material";
import {useTranslation} from "react-i18next";

export default () =>{
    const {t} = useTranslation('footer');
    return(
        <Typography variant="body1" color="text.secondary" align="center" /*display="block" height="125px" padding="20px" width="100%" position="fixed" left="0" bottom="0"*/
                    sx={{
                        py: [3, 6],
                        background: 'linear-gradient(to right, #64b5f6, #90caf9)'
                    }}>

            {t('copyright')}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}