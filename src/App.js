import { Component } from 'react';
import './App.css';

class App extends Component {

  state = {name : "", email : "", companyName : "", message : "",isNameEmpty : false, isEmailEmpty : false}

  onSend = async (event)=>{
    const {name, email,companyName,message} = this.state
    event.preventDefault()
    try{
      if(name === ""){
          this.setState({isNameEmpty : true})
        }
      if(email === ""){
        this.setState({isEmailEmpty : true})
      }

      if(name !== "" && email !== ""){
        const data = {
          name,
          email,
          companyName,
          message
        }
        const url = "https://saibabu7272.app.n8n.cloud/webhook/new-lead"
        const options = {
            method : "POST",
            "Content-type" : "application/json",
            Accept : "application/json",
            body : JSON.stringify(data)
        }
        const response = await fetch(url ,options)
        if(response.ok){
          alert("Successfully Sended")
        }
        
        
        }
    }
  catch(e){
    console.log({"error" : e})
  }
}

  checkIsNameEmpty =(event) =>{
    if(event.target.value === ""){
     return this.setState({isNameEmpty : true})
    }else{
     return this.setState({isNameEmpty : false})
    }
  }

  checkIsEmailEmpty =(event) =>{
    if(event.target.value === ""){
      this.setState({isEmailEmpty : true})
    }else{
      this.setState({isEmailEmpty : false})
    }
  }

  onUpdateName = event => this.setState({name : event.target.value})

  onUpdateEmail = event => this.setState({email : event.target.value})

  onUpdateCompanyName = event => this.setState({companyName : event.target.value})

  onUpdateMessage = event => this.setState({message : event.target.value})

  render(){
    const {name,isNameEmpty, isEmailEmpty} = this.state
      return (
    <div className="App ">
        <form className='form' onSubmit={this.onSend}>
          <label className='label-text' htmlFor='name' >NAME <span className='required'>*</span></label>
          <input onBlur={this.checkIsNameEmpty} onChange={this.onUpdateName} placeholder='Your Name...' className={ isNameEmpty ? "error-box input-box": `input-box`} type="text" id="name" />
          <label className='label-text' htmlFor='name' >EMAIL <span className='required'>*</span></label>
          <input onBlur={this.checkIsEmailEmpty} onChange={this.onUpdateEmail} placeholder='Ex: david@gmail.com' className={ isEmailEmpty ? "error-box input-box": `input-box`} type="text" id="email" />
          <label className='label-text' htmlFor='name' >COMPANY NAME</label>
          <input onChange={this.onUpdateCompanyName} placeholder='Your Company Name...' className='input-box' type="text" id="company" />
          <label className='label-text' htmlFor='name' >MESSAGE</label>
          <input onChange={this.onUpdateMessage} placeholder='Write Your Message...' className='input-box' type="text" id="message" />
          <button className='submit-btn'>Send</button>
          {(isNameEmpty || isEmailEmpty) && <p className='error-msg'>Fill Required Fields</p>}
        </form>
    </div>
  );
}

  }


export default App
