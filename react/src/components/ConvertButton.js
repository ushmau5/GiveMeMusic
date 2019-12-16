import React from 'react';
import { Container, Button, Paper, CircularProgress } from '@material-ui/core';

import STATUS from '../status';

class ConvertButton extends React.Component {
    render() {
        if (this.props.status === STATUS.READY_TO_CONVERT && this.props.selectedResults.length === 0) {
            return (
            <Container maxWidth="md">
                <Paper>
                    <Button fullWidth variant="contained" color="primary" disabled>Convert</Button>
                </Paper>
            </Container>
            )
        } 
        else if (this.props.status === STATUS.READY_TO_CONVERT) {
            return (
            <Container maxWidth="md">
                <Paper>
                    <Button fullWidth variant="contained" color="primary" onClick={this.props.onConvertButtonClick}>Convert</Button>
                </Paper>
            </Container>
            )
        } else if (this.props.status === STATUS.CONVERTING) {
            return (
            <Container maxWidth="md">
                <Paper>
                    <Button fullWidth disabled variant="contained" color="primary"><CircularProgress size={24}/></Button>
                </Paper>
            </Container>
            )
        } else return <React.Fragment/>
    }
}

export default ConvertButton;