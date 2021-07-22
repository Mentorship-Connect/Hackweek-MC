//stateful class component
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

class UserSignUp extends Component {
    //setting up state
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: []
        }
    }

    //on change method handling capturing input for value
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        //dynamically captures form field and value
        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        console.log('Props in submit: ', this.props);
        const { context } = this.props;
        console.log('Context in submit: ', context);
        //destructuring to make assigning these easier in user
        const {
            name,
            email,
            password,
            errors
        } = this.state;

        //new user payload
        //will be passed to createUser()
        //don't need to pass confirmedPassword to the API
        const user = {
            name,
            email,
            password
        };
        console.log('user payload', user);

        console.log('This.context submit', this.context);

        //create user
        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    console.log(`${email} is succesfully signed up and authenticated!`);
                    //after signup sign them in
                    //context.actions.signIn(emailAddress, password);
                    //this.props.history.push('/');
                }
            })
            .catch(err => {
                //handle rejected promises
                console.log('Something went wrong: ', err)
                //redirect to error page
                //this.props.history.push('/error');
            });        

    }

    cancel = () => {
        //redirecting back to the main public page /
        this.props.history.push('/');
    }

    render() {
        //setting up state here to use in the form to capture input
        const {
            name,
            email,
            password,
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
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={this.change}
                                        placeholder="Full Name" />
                                    <input 
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={email}
                                        onChange={this.change}
                                        placeholder="Email Address" />
                                    <input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={this.change}
                                        placeholder="Password" />
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