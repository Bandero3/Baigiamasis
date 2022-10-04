import {Alert, Box} from "@mui/material";

export default ({severity, message}) => (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Alert severity={severity}>{message}</Alert>
    </Box>
)