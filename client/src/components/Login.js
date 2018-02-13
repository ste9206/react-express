import React,{ Component } from 'react';
import axios from 'axios';
import '../App.css';
import 'sweetalert/dist/sweetalert.css';
import SweetAlert from 'sweetalert-react';
import {Button, Card} from 'reactstrap';

export default class Login extends Component{

    constructor(props){
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            logIn: false,
            show:false,
            title:'',
            message:''
        
        }
      

    }

    componentDidMount(){

        fetch('/user',{credentials:'include'})
            .then((response)=>{
                return response.json();
            })
            .then((body)=>{
                if(body.user){
                    console.log('vv',body.user);
                    this.setState({logIn:true});
                }
                else{
                    console.log('vv',body);
                }

            }).catch((error)=>{
            console.log('My error:',error);

        });
    }

    logout(event){
        event.preventDefault();

        axios.post('/logout', {withCredentials: true}).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        });
    }

    onLogin(event){
        event.preventDefault();

        const user = event.target.user.value;
        const pass = event.target.pass.value;

        if(user === ''){
           this.setState({show:true, title:'Error',message:'Please insert username'});     
        }
        else if(pass === ''){
            this.setState({show:true, title:'Error',message:'Please insert password'});    
        }
        else{
          axios.post('/login', {
            username:user,
            password:pass
          })
          .then((response) => {
            this.setState({logIn:true});
          })
          .catch((error) => {
            console.log(error);
            this.setState({show:true, title:'Error',message:'It is not possible to log in now'});    
          });  
        }

        

    }


    render(){
        
        return this.state.logIn ? (

            <div className="pollo">
                <Card>
                <p>Used logged</p>
                <Button color="danger" onClick={this.logout}>Logout</Button>
                </Card>
            </div>
            
        ) :
        (
            <div className="cieu">

                  <SweetAlert
                        show={this.state.show}
                        title={this.state.title}
                        text={this.state.message}
                        onConfirm={() => this.setState({ show: false })}
                    />

                <div className="pollo">
                <Card>
                   <div className="daje">
                    <form onSubmit={this.onLogin}>
                    <p>Username:<input type="text"  id="user" name="user"/></p>
                    <p>Password:<input type="password" id="pass" name="pass" /></p>
                    <Button color="danger">Login</Button>
                    </form>
                    </div>
                       
                    </Card>
                    </div>
                 
            </div>
        );
    }
}