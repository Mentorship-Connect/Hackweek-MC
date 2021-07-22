//stateful class component
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignUp extends Component {
    //setting up state
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            emailAddress: '',
            password: '',
            confirmPassword: '',
            errors: []
        }
    }

    //on change method handling capturing input for value
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log('Name in change: ', name, 'value in change: ', value);

        //dynamically captures form field and value
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        console.log('Context in submit: ', context);
        //destructuring to make assigning these easier in user
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;

        //new user payload
        //will be passed to createUser()
        //don't need to pass confirmedPassword to the API
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        };
        console.log('user payload', user);

        //if passwords match submit the form
        if (confirmPassword === password) {
            //create new user async returns a promise
            context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log(`${emailAddress} is succesfully signed up and authenticated!`);
                    //after signup sign them in
                    context.actions.signIn(emailAddress, password);
                    this.props.history.push('/');
                }
            })
            .catch(err => {
                //handle rejected promises
                console.log('Something went wrong: ', err)
                //redirect to error page
                this.props.history.push('/error');
            });        
        } else {
            //if passwords don't match throw a validation error
            this.setState({ 
                errors: 'Passwords do not match. Please make sure password and confirm password match.' 
            });
        }
    }

    cancel = () => {
        //redirecting back to the main public page /
        this.props.history.push('/');
    }

    render() {
        //setting up state here to use in the form to capture input
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
        } = this.state;

        return (
            <Fragment>
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign Up</h1>
                        <Form 
                            cancel={this.cancel}
                            errors={errors}
                            submit={this.submit}
                            submitButtonText="Sign Up"
                            elements={() => (
                                <Fragment>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={firstName}
                                        onChange={this.change}
                                        placeholder="First Name" />
                                    <input 
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={lastName}
                                        onChange={this.change}
                                        placeholder="Last Name" />
                                    <input 
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        value={emailAddress}
                                        onChange={this.change}
                                        placeholder="Email Address" />
                                    <input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={this.change}
                                        placeholder="Password" />
                                    <input 
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={this.change}
                                        placeholder="Confirm Password" />
                                </Fragment>
                            )} />
                        <p>&nbsp;</p>
                        <p>
                        Already have a user account? <Link to="/signin">Click here</Link> to sign
                        in!
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default UserSignUp;