import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer" id="Aboutus">
          <div className="footer-content">
            {/* Left Section */}
            <div className="footer-content-left">
              <img style={{ width: '60px', height: '60px' }} src={assets.favicon} alt="Logo" />
              <p style={{ textAlign: 'justify', color: 'purple' ,marginLeft:"0px",marginRight:"20px"}}>
                Stay updated with us for the latest releases, find the perfect spot, and let the movie magic begin—all in just a few clicks.
              </p>
              <div className="footer-social-icons">
                <img src={assets.whatsapp} alt="WhatsApp logo" />
                <img src={assets.facebook} alt="Facebook logo" />
                <img src={assets.twitter} alt="Twitter logo" />
                <img src={assets.linkedin} alt="LinkedIn logo" />
              </div>
            </div>

            {/* Center Section - Company Links */}
            <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>

            {/* Right Section - Contact Details */}
            <div className="footer-content-right">
              <h2>GET IN TOUCH</h2>
              <ul>
                <li>+91 9142356612</li>
                <li>Contact@Shoztop.com</li>
                <li>1234 Street Name, City, Country</li>
              </ul>
            </div>

            {/* Additional Footer Sections */}
            <div className="footer-extra-info">
              <h2>SUPPORT</h2>
              <ul>
                <li>Help Center</li>
                <li>FAQ</li>
                <li>Track Orders</li>
                <li>Returns & Exchanges</li>
              </ul>
            </div>

        

            <hr />

            {/* Footer Copyright */}
            <p className="footer-copyright" style={{color:"white",textAlign: "center"}}>
              Copyright 2024 @ Shoztop.com - All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
