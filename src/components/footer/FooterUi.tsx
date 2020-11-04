import React from 'react';
import Logo from '@/components/logo/Logo';

const FooterUi = () => (
    <footer className="page-footer">

        <Logo modifier="logo__link--light" />

        <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
        </div>
    </footer>
)

export default FooterUi;
