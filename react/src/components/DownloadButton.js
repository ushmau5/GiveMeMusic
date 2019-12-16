import React from 'react';
import { Container, Button, Paper } from '@material-ui/core';

import STATUS from '../status';

class DownloadButton extends React.Component {
    render() {
        if (this.props.status === STATUS.READY_TO_DOWNLOAD) {
            return (
                <Container maxWidth="md">
                    <Paper>
                        <Button fullWidth variant="contained" color="primary" onClick={this.props.onDownloadButtonClick}>Download</Button>
                    </Paper>
                </Container>
            )
        } else return <React.Fragment/>
    }
}

export default DownloadButton;