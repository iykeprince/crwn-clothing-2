import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { auth, createUserProfileDocument } from '../../firebase/firebase.util'

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async event => {
      event.preventDefault();

      const { displayName, email, password, confirmPassword } = this.state;
        if(password !== confirmPassword){
            alert('password do not match');
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        }catch(error){
            console.log('error', error);
        }
  }

  render() {
    return (
      <div className="sign-up">
        <h1 className="title">I do not have an account</h1>
        <span>Sign up with email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="Display Name"
            handleChange={this.handleChange}
            type="text"
            value={this.state.displayName}
            required
          />
          <FormInput
            label="Email"
            handleChange={this.handleChange}
            type="email"
            value={this.state.email}
            required
          />
          <FormInput
            label="Password"
            handleChange={this.handleChange}
            type="password"
            value={this.state.password}
            required
          />
          <FormInput
            label="Confirm Password"
            handleChange={this.handleChange}
            type="password"
            value={this.state.confirmPassword}
            required
          />
          <CustomButton>SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}
export default SignUp;