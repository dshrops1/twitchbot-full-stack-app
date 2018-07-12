import React, { Component, Fragment } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import config from '../config.js'


const centerStyle = {

   'width': '50%',
    'marginLeft': '25%'

}


export default class extends Component {

    state = {

        quote: ''
    }

    handleClick =  async () =>{

         await fetch(config.addQuote,
            { method: 'POST', body: this.state.quote })

        this.setState({quote: document.getElementById('createQuote').value = ''})
    }



render () {
    return (

        <Fragment>

        <Paper>

            <TextField fullWidth placeholder="type quote here"
                       value={this.state.quote}
                       id='createQuote'
                       onChange={event => this.setState({quote: event.target.value})}/>

            <Button id='tester' variant="contained" color="primary" style={centerStyle} onClick={this.handleClick}>
                submit
            </Button>

        </Paper>

        </Fragment>
    )
}

}