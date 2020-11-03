import React, {useEffect} from 'react';
import Logo from "@/components/logo/Logo";
import FooterUi from "@/components/footer/FooterUi";
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {useStore} from '@/store';

const SignIn = withRouter((props: RouteComponentProps) => {

    const {history} = props;
    const {authorizationStore} = useStore();

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        const formData = {
            email: form.elements['user-email'].value,
            password: form.elements['user-password'].value
        };

        await authorizationStore.authorization(formData)
        await form.reset();
        await history.goBack()
    }

    useEffect(() => {
        authorizationStore.checkAuthorization().then(() => {
            history.goBack()
        })
    }, [])

    return (
        <div className="user-page">
            <header className="page-header user-page__head">

                <Logo/>

                <h1 className="page-title user-page__title">Sign in</h1>
            </header>

            <div className="sign-in user-page__content">
                <form onSubmit={submitHandler} action="#" className="sign-in__form">
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
})

export default SignIn;
