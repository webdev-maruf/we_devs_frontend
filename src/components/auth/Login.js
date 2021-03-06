import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogged: false,
      loginParams: {
        email: "",
        password: ""
      },
      registerInfo: {
        name:"",
        email: "",
        password: "",
        password_confirmation:""
      },
      message:'',
      logORreg:'login'
    };
  }
  apiUrl = ()=>{ return process.env.REACT_APP_API_URL;}

  handleLoingInput = event => {
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew
    });
  };
 
  login = event => {
    event.preventDefault();

    axios.post(this.apiUrl()+'/login', {
      email:this.state.loginParams.email,
      password:this.state.loginParams.password      
    })
    .then(response => {
      if(response.data.token !== undefined){
        sessionStorage.setItem("token", response.data.token);
        this.setState({
          islogged: true
        });
        
      }

    })
    .catch(error => {
        let msg = '';
        if(error.response !== undefined){
          msg = Object.values(error.response.data).join(' ')          
        } else {
          msg = "Something went wrong. Please try again.!"
        }
        this.setState({message: msg});

    });   
  };

  handleRegInput = event => {
    let regInfoSet = { ...this.state.registerInfo };
    let val = event.target.value;
    regInfoSet[event.target.name] = val;
    this.setState({
      registerInfo: regInfoSet
    });
  };

  Register = event => {
    event.preventDefault();
    axios.post(this.apiUrl()+'/register', {
      name:this.state.registerInfo.name,
      email:this.state.registerInfo.email,      
      password:this.state.registerInfo.password,
      password_confirmation:this.state.registerInfo.password_confirmation           
    })
    .then(response => {
        if(response.data.done !== undefined && response.data.done){
          this.setState({logORreg: 'login'})
          this.setState({message: "Register Successfully. Now you can login.!"});
        }
    })
    .catch(error => {
        let msg = '';
        if(error.response !== undefined){
          msg = Object.values(error.response.data).join(' ')          
        } else {
          msg = "Something went wrong. Please try again.!"
        }
        this.setState({message: msg});

    });
   
  };



  render() {
    if (sessionStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">       
        <div style={{padding:'10px'}}>
          <button  onClick={() => this.setState({logORreg: 'login'}) }>Login</button> 
          <button onClick={() => this.setState({logORreg: 'register'}) }>Register</button> 
        </div>

        <div style={{color: 'red',padding:'20px'}}>
          {this.state.message}
        </div>

          { this.state.logORreg=='login' ?

        (<form onSubmit={this.login} className="form-signin">
          <h1>Sign in</h1>
            <div className="field">
              <input
                type="text"
                name="email"
                value={this.state.loginParams.email}
                onChange={this.handleLoingInput}
                placeholder="Enter Username"
              />
              </div>
              <div className='field'>
              <input
                type="password"
                name="password"
                value={this.state.loginParams.password}
                onChange={this.handleLoingInput}
                placeholder="Enter Password"
              />
              </div>
              <input type="submit" value="Login" />              
        </form> 
        ):(this.state.logORreg=='register'?(




        <form onSubmit={this.Register} className="form-signin">
          <h1>Registration</h1>
            <div className="field">
              <input type="text" name="name" placeholder='Enter Name' onChange={this.handleRegInput}/>               
            </div>
            <div className="field">
              <input type="email" name="email" placeholder='Enter Email' onChange={this.handleRegInput}/>               
            </div>
            <div className="field">
              <input type="password" name="password" placeholder='Enter Password' onChange={this.handleRegInput}/>               
            </div>
            <div className="field">
              <input type="password" name="password_confirmation" placeholder='Contirm Password' onChange={this.handleRegInput}/>               
            </div>

            <input type="submit" value="Register" />
            
        </form>






        ):'')

}

        



      </div>
    );
  }
}
export default Login;