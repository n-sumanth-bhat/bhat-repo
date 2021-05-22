import React, { Component } from 'react'
import { Typography, withStyles } from '@material-ui/core';

const useStyles = theme => ({
    image: {
        align: 'center',
        margin: theme.spacing(1),
        maxWidth: '100px',
    },


});



export class StaffHomepage extends Component {

    render() {
        return (
            <div>
                <Typography variant="h1" components="h1">
                    Hello
                </Typography>

            </div>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(StaffHomepage);
