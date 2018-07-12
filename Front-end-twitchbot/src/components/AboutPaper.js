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
                   Built with React and material UI for the front end.
                   The back end is build with node and express.
                   And then the bot is build with tmi.js and amazon twitchs api
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