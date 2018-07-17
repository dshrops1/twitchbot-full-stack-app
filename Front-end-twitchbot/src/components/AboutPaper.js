import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ReactSVG from 'react-svg'

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});


const centerStyle = {

    'textAlign' : 'center'
}

function PaperSheet(props) {
    const { classes } = props;
    return (
        <div>
            <Paper className={classes.root} elevation={4}>

                <Typography variant="headline" component="h3" style={centerStyle} >
                    A little About!
                </Typography>

                <Typography component="p" style={centerStyle}>
                    This is my UI for QuoteBot, a motivating twitch companion always ready
                    to give a quote when in need.
                </Typography>

                <br/>
                <Typography component="p" style={centerStyle}>
                   Built with React and materialUI for the front end.
                   On the back end I have multiple api's using twitch's api, express and a variety of other
                   things. the front end is deployed on a AWS EC2 instance using apache. Two of the api's are
                    also hosted on their own EC2 instances
                    <br/>
                    <a href='https://github.com/dshrops1/twitchbot-full-stack-app'>link to github</a>
                </Typography>


            </Paper>

            <div>

            <br/>
            <div id="parent">
            <ReactSVG id='toDelete' path='/twitch.svg'/>
            </div>
            </div>

            <Paper className={classes.root} elevation={4}>

                <Typography component="p" style={centerStyle}>
                    commands that can be used:
                    !echo *some text* and
                    !quote
                    <br/>
                    Please be aware that  Quotebot is an active fellow and sometimes
                    needs a rest and thus is not always available to take commands
                </Typography>
            </Paper>

            <iframe frameBorder="0"
                    scrolling="no"
                    id="dshrops1"
                    title="twitchframe"
                    src="http://www.twitch.tv/embed/dshrops1/chat"
                    height="500"
                    width="100%">
            </iframe>

        </div>
    );
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);