import React, {Component} from 'react';
import Logo from "../logo/Logo";
import FooterUi from "../footer/FooterUi";
import {withRouter} from 'react-router-dom';
import {withStore} from '../../store';

@withStore
@withRouter
class SignIn extends Component {

    history = this.props.history;

    authorizationStore = this.props.store.authorization;

    submitHandler(event) {
        event.preventDefault();
        const form = event.target;

        const formData = {
            email: form.elements['user-email'].value,
            password: form.elements['user-password'].value
        };

        this.authorizationStore.authorization(formData)
            .then(() => {
                form.reset();
                this.history.push('/')
            })
    }

    componentDidMount() {
        this.authorizationStore.checkAuthorization();
    }

    render() {
        return (
            <div className="user-page">
                <header className="page-header user-page__head">

                    <Logo/>

                    <h1 className="page-title user-page__title">Sign in</h1>
                </header>

                <div className="sign-in user-page__content">
                    <form onSubmit={(event => this.submitHandler(event))} action="#" className="sign-in__form">
                        <div className="sign-in__fields">
                            <div className="sign-in__field">
                                <input className="sign-in__input" type="email" placeholder="Email address"
                                       name="user-email"
                                       id="user-email"
                                       required
                                />
                                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email
                                    address</label>
                            </div>
                            <div className="sign-in__field">
                                <input className="sign-in__input" type="password" placeholder="Password"
                                       name="user-password"
                                       id="user-password"
                                       required
                                />
                                <label className="sign-in__label visually-hidden"
                                       htmlFor="user-password">Password</label>
                            </div>
                        </div>
                        <div className="sign-in__submit">
                            <button className="sign-in__btn" type="submit">Sign in</button>
                        </div>
                    </form>
                </div>

                <FooterUi/>
            </div>
        )
    }
}

export default SignIn;
