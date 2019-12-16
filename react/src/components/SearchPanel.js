import React from 'react';
import { Paper, Button, TextField, Container, CircularProgress } from '@material-ui/core';

import STATUS from '../status'

class SearchPanel extends React.Component {
    renderButton() {
        if (this.props.status === STATUS.SEARCHING) {
            return <Button fullWidth disabled variant="contained" color="primary"><CircularProgress size={24}/></Button>
        } else return <Button fullWidth variant="contained" color="primary" onClick={this.props.onSearchButtonClick}>Retrieve</Button>
    }

    render() {
        return (
        <Container maxWidth="sm" style={{ padding: 20}}>
            <Paper elevation={20} style={{ padding: 20 }}>
                <TextField fullWidth id="outlined-basic" label={"Playlist URL"} margin="normal" variant="outlined" value={this.props.searchField} onChange={(e) => {this.props.onUpdateSearchField(e.target.value)}}/>
                {this.renderButton()}
            </Paper>
        </Container>
        )
    }
}

export default SearchPanel;

