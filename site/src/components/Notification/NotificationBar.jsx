import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


// Notification bar to display message using the snackbar component in the bottom of user's screen

const NotificationBar = (props) => {
    const {
        open,
        message,
        severity
    } = props;
    const [isOpen, setIsOpen] = useState(open);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };
    
    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    if(message?.length !== 0) {
        return (
            <Snackbar 
                open={isOpen}
                autoHideDuration={6000} 
                onClose={handleClose}
                anchorOrigin={{ 
                    vertical: 'bottom',
                    horizontal: 'center' 
                }}
                >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
                </Alert>
            </Snackbar>
        );
    }
    return null;
};

NotificationBar.protoΤypes = {
    message: PropTypes.string,
    open: PropTypes.bool,
    severity: PropTypes.oneOf(['error','warning','info','success']).isRequired,
};

NotificationBar.defaultProps = {
    message: '',
    open: false,
    severity: 'success'
}

export default NotificationBar;