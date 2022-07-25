import React from "react";

function Footer() {
    return (
        <div className="bg-info pt-5 pb-5 mt-3">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <h4>Our Address</h4>
                        <address>
                            121, Clear Water Bay Road
                            <br></br>
                            Clear Water Bay, Kowloon
                            <br></br>
                            HONG KONG
                            <br></br>
                            <i className="fa fa-phone fa-lg"></i> : +852 1234 5678
                            <br></br>
                            <i className="fa fa-fax fa-lg"></i> : +852 8765 4321
                            <br></br>
                            <i className="fa fa-envelope fa-lg"></i> :{" "}
                            <a href="mailto:confusion@food.net" className="mailto">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="social col-4">
                        <a href="http://google.com" className="go">
                            <i class="fa-brands fa-google-plus-square"></i> 
                        </a>
                        <a href="https://facebook.com/" className="fa">
                            <i class="fa-brands fa-facebook-square"></i>
                        </a>
                        <a href="http://linkedin.com" className="ldin">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="http://twitter.com" className="tw">
                            <i class="fa-brands fa-twitter-square"></i>
                        </a>
                        <a href="http://youtube.com" className="yo">
                            <i class="fa-brands fa-youtube-square"></i>
                        </a>
                        <a href="http://gmail.com/" className="gm">
                            <i class="fa-regular fa-envelope"></i>
                        </a>
                    </div>
                    <div className="col-12 text-center"><i class="fa-regular fa-copyright"></i> Copyright 2018 Ristorante Con Fusion</div>
                </div>   
            </div>
        </div>
    )
}

export default Footer;