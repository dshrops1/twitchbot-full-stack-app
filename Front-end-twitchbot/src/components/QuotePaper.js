import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const centerStyle = {

    'width': '50%',
    'marginLeft': '25%'




}

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class QuotePaper extends Component {

    state = {
        value: 0,
        quoteChange: this.props.quote
    }

    handleQuoteChange = (event) => {

       this.setState({quoteChange: event.target.value})
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleUpdate = () => {
        //passed the quote back up for each quote object so we know which one to update
        this.props.toUpdate(this.props.quote, this.state.quoteChange)
    }

    handleDelete = () => {
        //pass's the quote back up for each quote object so we know which one to delete
        this.props.toDelete(this.props.quote)
    }

    render () {
        const { classes, theme } = this.props
        return (

            <Paper>
            <div className={classes.root}>

                <AppBar color="secondary" position="static">

                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        fullWidth
                        centered
                    >
                        <Tab label="Quote" />
                        <Tab label="Update" />
                        <Tab label="Delete"/>

                    </Tabs>

                </AppBar>

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >

                    <TabContainer dir={theme.direction}>

                        {this.props.quote}

                    </TabContainer>

                    <TabContainer dir={theme.direction}>

                        <TextField
                            id="multiline-flexible"
                            label="update"
                            fullWidth
                            multiline
                            rowsMax="6"
                            margin="normal"
                            value={this.state.quoteChange}
                            onChange={this.handleQuoteChange}
                        />

                        <Button style={centerStyle}  variant="contained" color="secondary" onClick={this.handleUpdate}>
                            Update
                        </Button>

                    </TabContainer>

                    <TabContainer dir={theme.direction}>

                        <Button style={centerStyle}  variant="contained" color="secondary" onClick={this.handleDelete}>
                            delete
                        </Button>

                    </TabContainer>

                </SwipeableViews>
            </div>

            </Paper>

        )
    }

}

QuotePaper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default  withStyles(styles, {withTheme: true})(QuotePaper)