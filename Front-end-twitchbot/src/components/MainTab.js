import React, { Component} from 'react'
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AboutPaper from './AboutPaper'
import CreateQuote from './CreateQuote'
import CheckAndDisplay from './CheckAndDisplay'


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

 class MainTabs extends Component {

    state = {

        value: 0
}

     handleChange = (event, value) => {
         this.setState({ value });
     };

     // handleChangeIndex = index => {
     //     this.setState({ value: index });
     // };

render () {
    const { classes, theme } = this.props
    return (

        <div className={classes.root}>
            <AppBar position="static">

                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    fullWidth
                    centered
                >
                    <Tab label="About" />
                    <Tab label="Quote" />
                    <Tab label="Update"/>

                </Tabs>

            </AppBar>

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                // onChangeIndex={this.handleChangeIndex}
            >

                <TabContainer dir={theme.direction}>

                    <AboutPaper/>

                </TabContainer>

                <TabContainer dir={theme.direction}>

                    <CreateQuote/>

                </TabContainer>


                <TabContainer dir={theme.direction}>

                    <CheckAndDisplay/>

                </TabContainer>

            </SwipeableViews>
        </div>

    )
}

}

MainTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default  withStyles(styles, {withTheme: true})(MainTabs)