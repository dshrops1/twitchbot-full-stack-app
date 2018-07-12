import React, { Component, Fragment } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import QuotePaper from './QuotePaper'
import config from '../config'


export default class extends Component {

    state = {
        user: '',
        pass: '',
        authen: false,
        quotes: [],
        quoteDeleted: false
}

loginHandler = async () =>{

        //http://localhost:3007/
       let loginAuthen =  await fetch(config.loginAUTH,
           {method : 'POST',
            body: JSON.stringify({"user": this.state.user, "password": this.state.pass}),
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
             },})
           .then(function(response) {
           return response.text();
       })

        //sets authen based on responce from authen api
        let toSet = (loginAuthen === 'true');
        this.setState({authen: toSet})

        if(this.state.authen){

            this.createMyQuotes()
        }

}

deleteHandler = async (quoteToDelete) => {
        //http://localhost:3006/delete
    await fetch(config.quotesApiDelete ,
        {method: 'DELETE',
         body: JSON.stringify({'quote': quoteToDelete }),
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    //deleting quote from state.
    let indexOfQuote;
    let found = this.state.quotes.some(function(item, index) { indexOfQuote = index; return item.props.quote === quoteToDelete; });

    if(found){
        this.setState({quotes: this.state.quotes.splice(indexOfQuote,0)})
        this.createMyQuotes()
    }else{
        console.log('unable to locate.')
    }
 }




updateHandler = async (quoteToUpdate, quoteUpdatedWith)=> {

    if(this.state.authen) {
        await fetch(config.updateQuotes,
            {
                method: 'PATCH',
                body: JSON.stringify({"quote": quoteToUpdate, "update": quoteUpdatedWith}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

        let indexToChangeQuote;
        let foundItem = this.state.quotes.some(function (item, index) {
            indexToChangeQuote = index;
            return item.props.quote === quoteToUpdate;
        });

        if (foundItem) {
            let quotesUpdated = this.state.quotes
            quotesUpdated[indexToChangeQuote] = quoteUpdatedWith
            this.setState({quotes: quotesUpdated})
            this.createMyQuotes()

        } else {
            console.log('not found')
        }


    }
}

createMyQuotes = async () => {

            let returnQuotes = await fetch(config.createQuotes)
            let quotesJson = await returnQuotes.json()

            //pass two functions down as props one for update one for delete.
            let quotesAsQuotePaper = quotesJson.map((x,index)=> <QuotePaper key={index} toUpdate={this.updateHandler} toDelete={this.deleteHandler}  quote={x.quote}/>)
            this.setState({quotes: quotesAsQuotePaper})

}


render () {
    return (

        <Fragment>
            <div style={{marginLeft: '30%'}}>
            <TextField
            id="name"
            label="user"
            value ={this.state.user}
             onChange={event => this.setState({user: event.target.value})}
            margin="normal"
        />
            <TextField
                id="name"
                label="password"
                type="password"
                value={this.state.pass}
                 onChange={event => this.setState({pass: event.target.value})}
                margin="normal"
            />

            <Button variant="contained" color="primary" onClick={this.loginHandler}>
                submit
            </Button>
            </div>
            <hr/>

            {this.state.authen && this.state.quotes}
            {!this.state.authen &&  <QuotePaper toUpdate={this.updateHandler} toDelete={this.deleteHandler} quote={"this is a static example of what is displayed when loged in"}/>}

        </Fragment>
    )
}

}