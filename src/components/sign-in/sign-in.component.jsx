import React from 'react'
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component'
import FormInput from '../form-input/form-input.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.util';
import { setCurrentUser } from "../../redux/user/user.actions";


import './sign-in.styles.scss'

class SignIn extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        const userAuth = await auth.signInWithEmailAndPassword(email, password);
        this.props.setCurrentUser(userAuth);

        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    }

    render(){
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" value={this.state.email} handleChange={this.handleChange} required />
                    <label htmlFor="email">Email</label>
                    <FormInput type="password" name="password" value={this.state.password} handleChange={this.handleChange} required/>
                    <label htmlFor="password">Password</label>

                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton onClick={signInWithGoogle}>Sign In With Google</CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(null, mapDispatchToProps)(SignIn);