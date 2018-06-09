import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RequestService from './requestService'
import { Button, Card, Row, Col, Footer, Icon, Input, Navbar, NavItem } from 'react-materialize';

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      numero: 0,
      resultado: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    let input = event.target.id
    let number = event.target.value;
    this.setState({[input]: number});
  }

  handleSubmit(event){
    let number = this.state.numero
    RequestService.getRequest(number)
    .then((data => {
      if(typeof data !== 'undefined'){
        this.setState({
          resultado: data.resultado
        }) 
      }
    }))
    event.preventDefault();
  }

  validate(event){
    let theEvent = event || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    let regex = /[0-9]/;
    if(!regex.test(key)){
      //theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    } 
  }
  
  render() {

    var numeros = new RegExp('^[0-9]$');

    return (
      <div className="App">
      

      <Navbar  left className="altura-logo">
        <NavItem><img src={logo}  className="App-logo2" alt="logo" /></NavItem>
        <NavItem href="https://reactjs.org/tutorial/tutorial.html">Get Started with React</NavItem>
        <NavItem href='components.html'>Instrucciones</NavItem>
      </Navbar>


        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">CodeBreaker</h1>
        </header>
      <div className="mydiv">
        <form onSubmit={this.handleSubmit}>
        
          <br/>
          <label>
            <Input id="numero" type="number"  onKeyPress={this.validate} onChange={this.handleChange} label="Ingresa la clave" 
            min="1" max="9999" required/>
            <Button waves='light' type="submit">Adivinar<Icon left>lock_open</Icon></Button>
          </label>
        <p class="pista">{this.state.resultado}</p>
        </form>
      </div>
      <Footer class="gray" copyrights="&copy Copyright Sistemas Operativos UdeA 2018" className='example'> 
      </Footer>

      </div>
      
      
    );
  }


}

export default App;
