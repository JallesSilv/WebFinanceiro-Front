import React from 'react';
import { DivFooterCenter } from './styles'

export const AppFooter = (props: any) => {

    return (
        <React.Fragment>
                <DivFooterCenter className='col-6'>
                    <img src={props.layoutColorMode === 'light' ? 'assets/images/logo_Financeiro.png' : 'assets/layout/images/logo-white.svg'} alt="Logo" height="20" className="mr-5" />
                
                <span className="font-medium ml-4"> Web Sistema -  @Jalles.Silva</span>
                </DivFooterCenter>
        </React.Fragment>
    );
}
