import React from 'react';
import { Container, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from "@material-ui/core";
import STATUS from '../status';

class PlaylistTable extends React.Component {
    handleTableHeadCheckbox() {
        if (this.props.selectedResults.length > 0) {
            this.props.setSelectedResults([])
        } else {
            let selectedResultsStrings = Object.keys(this.props.searchResults)
            let selectedResults = selectedResultsStrings.map(str => Number(str))
            this.props.setSelectedResults(selectedResults)
        }
    }

    handleVideoCheckbox(index) {
        if (!this.props.selectedResults.includes(index)) {
            this.props.setSelectedResults([...this.props.selectedResults, index]);
        } else {
            this.props.setSelectedResults(this.props.selectedResults.filter(indexInList => indexInList !== index));
        }
    }

    render() {
        if ([
            STATUS.READY_TO_CONVERT,
            STATUS.CONVERTING,
            STATUS.READY_TO_DOWNLOAD
        ].includes(this.props.status)) {
        return (
            <Container maxWidth="md">
                <Paper>
                    <Table size="small">

                        <TableHead>
                            <TableRow>
                                <TableCell>Thumbnail</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    onChange={this.handleTableHeadCheckbox.bind(this)}
                                    checked={this.props.searchResults.length === this.props.selectedResults.length}/>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.props.searchResults.length > 0 ? this.props.searchResults.map((video, index) => (
                                <TableRow 
                                hover 
                                key={video.url}
                                selected={this.props.selectedResults.includes(index)}
                                onClick={this.handleVideoCheckbox.bind(this, index)}>
                                    <TableCell><img src={video.thumbnail_url} alt="new"/></TableCell>
                                    <TableCell>{video.title}</TableCell>
                                    <TableCell>{video.duration}</TableCell>
                                    <TableCell padding="checkbox">
                                        <Checkbox 
                                        onChange={this.handleVideoCheckbox.bind(this, index)}
                                        checked={this.props.selectedResults.includes(index)}
                                        />
                                    </TableCell>
                                </TableRow>))
                                :
                                <React.Fragment/>
                            }
                        </TableBody>
                    
                    </Table>
                </Paper>
            </Container>
        );
                        } else return <React.Fragment/>
    }
}

export default PlaylistTable;