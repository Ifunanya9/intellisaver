import React from 'react'
import FooterLinks from './FooterLinks';
import './footer.css'

const Footer = () => {
    return (
        <footer className ="bottom">
            {/* <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/> */}
            <div className="footer bg-secondary">
                <div className="container">
                    <div className="row footer_row">
                        <FooterLinks/>
                    </div>
                </div>
            </div>
            <div className="copyright text-center bg-dark">
                <p>© 2020 Intellisaver</p>
            </div>
        </footer>
    )
}

export default Footer
            
            
