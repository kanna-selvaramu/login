import React, { Component } from 'react';
import logo from './logo.svg';
import './SignUp.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { focus: false};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }
  handleInputChange(event) {
    this.props.onInpChange(event);
  }
  handleBlur() {
    if(this.props.inpText == "") {
      this.setState({
        focus: false
      });
    }
  }
  handleFocus() {
    this.setState({
      focus: true
    });
  }
  render() {
    const placeholder = this.props.placeholder;
    const name = this.props.name;
    const type = this.props.type;
    const id = this.props.id;
    const value = this.props.inpText;
    var inpClass = "cls_skInput";
    var inpLabelClass = "cls_skInpLabel";
    if(type != "checkbox") {
      inpClass = inpClass + " cls_skInpText";
      inpLabelClass = inpLabelClass + " cls_skTxtLabel";
    }
    if(this.state.focus == true && type != "checkbox")
      inpClass = inpClass + " cls_skInpActive";
    return (
      <div class = {inpClass}>
        <label for = {id} class = {inpLabelClass} >
          {placeholder}
        </label>
        <input class = "cls_skInputCont" name = {name} type = {type} id = {id} value = {value} onChange = {this.handleInputChange} onFocus = {this.handleFocus} onBlur = {this.handleBlur}/>
      </div>
    );
  }
}

class InputAsOptions extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.props.onInpChange(event);
  }
  render() {
    const name = this.props.name;
    const type = this.props.type;
    const id = this.props.id;
    const selected = this.props.inpText;
    const options = this.props.options;
    const optItems = options.map((opt,index) =>
      <div class = "cls_skRadioWrap" key = {index}>
        <input name = {name} type = {type} id = {id} value = {opt} checked = {selected === opt} onChange = {this.handleInputChange}/>   
        <label class = "cls_skOptInpLabel">
          {opt}
        </label>
      </div>
    );
    return (
      <div class = "cls_skInput">
        {optItems}
      </div>
    );
  }
}


class Select extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    this.props.onInpChange(event);
  }
  render() {
    const options = this.props.options;
    const type = this.props.type ;
    const value = this.props.inpText;
    const title = this.props.title;
    const name = this.props.name;
    const optItems = options.map((opt,index) =>
      <option value = {opt} key = {index} >{opt}</option>
    );
    return (
        (type == "multiple") ? (
          <div class = "cls_skSelectWrapper">
            <label class = "cls_skSelectLabel">{title}</label>
            <select name = {name} class = "cls_skSelect" multiple value = {value} onChange = {this.handleInputChange}>
              {optItems}
            </select>
          </div>
        ) : (
          <div class = "cls_skSelectWrapper">
            <label class = "cls_skSelectLabel">{title}</label>
            <select name = {name} class = "cls_skSelect" value = {value} onChange = {this.handleInputChange}>
              {optItems}
            </select>
          </div>
        )
    );
  }
}

class UserInfoFieldsCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      uname: '',
      pwd: '',
      confpwd: '',
      gender: '',
      country: '',
      email_pref: '',
      lang: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleSubmit(event) {
    console.log(this.state.name + " " + this.state.uname + " " + this.state.pwd + " " + this.state.confpwd + " " + this.state.country + " " + this.state.gender + " " +this.state.email_pref);
    for(var ctr = 0;ctr < this.state.lang.length; ctr++)
    {
      console.log(" " + this.state.lang[ctr]);
    }
    event.preventDefault();
  }
  handleInputChange(event) {
    var value ; 
    const name = event.target.name;
    if(name == "lang") {
      var options = event.target.options;
      value = [];
      for (var ctr = 0, len = options.length; ctr < len; ctr++) {
        if (options[ctr].selected) {
          value.push(options[ctr].value);
        }
      }
    }
    else {
      value =  event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    }
    this.setState({
      [name] : value
    });
  }
  render() {
    return (
        <div class = "cls_skUserInfoCont">
          <form onSubmit = {this.handleSubmit}>
            <Input type = "text" name = "name" placeholder = "Name" id = "id_skname" inpText = {this.state.name} onInpChange = {this.handleInputChange}/>
            <Input type = "text" name = "uname" placeholder = "Username" id = "id_skUname" inpText = {this.state.uname} onInpChange = {this.handleInputChange}/>
            <Input type = "password" name = "pwd" placeholder = "Password" id = "id_skpwd" inpText = {this.state.pwd} onInpChange = {this.handleInputChange}/>
            <Input type = "password" name = "confpwd" placeholder = "Confirm Password" id = "id_skconfpwd" inpText = {this.state.confpwd} onInpChange = {this.handleInputChange}/>
            <InputAsOptions type = "radio" name = "gender" title = "Gender" options = {GENDER} inpText = {this.state.gender} onInpChange = {this.handleInputChange} />
            <Select name = "country" title = "Country" options = {COUNTRY} type = "single" inpText = {this.state.country} onInpChange = {this.handleInputChange}/>
            <Input type = "checkbox" name = "email_pref" id = "id_skEmailPref" placeholder = {EMAIL_PREF} inpText = {this.state.email_pref} onInpChange = {this.handleInputChange} />
            <Select name = "lang" options = {LANG} title = "Languages Known" type = "multiple" inpText = {this.state.lang} onInpChange = {this.handleInputChange}/>
            <input type="submit" value="Submit" class="cls_skSubmit"/>
          </form>
        </div>
    );
  }
}
class SignUp extends Component {
  render() {
    return (
      <div class = "cls_skSignUpPageWrapper">
          <h1 class = "cls_skSignUpTitle">Sign Up</h1>
          <div class = "cls_skSignUpBodyWrap">
            <UserInfoFieldsCont />
          </div>
      </div>
    );
  }
}


const GENDER = [
  "Male", "Female" , "Other"
];

const LANG = [
  "English", "Hindi" , "Tamil"
];


const EMAIL_PREF = [
  "Receive Email Regularly"
];

const COUNTRY = [
  "India", "Australia" , "America", "China", "Japan" , "Nepal"
];

export default SignUp;
