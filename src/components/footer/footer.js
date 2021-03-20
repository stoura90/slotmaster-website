import React from 'react';
import '../footer/footer.scss';

const Footer =()=>{
    return(
        <footer>
            <nav className="w">
                <ul>
                    <li>
                        <a href='#'>Menu Type</a>
                    </li>
                    <li>
                        <a href='#'>Menu Type</a>
                    </li>
                    <li>
                        <a href='#'>Menu Type</a>
                    </li>
                    <li>
                        <a href='#'>Menu Type</a>
                    </li>

                </ul>
            </nav>

            <div className="w fc">
                <div className="fc_box" style={{'paddingBottom':'0'}}>
                    Footer Content
                </div>

                {/*<div className="fc_box">
                    <div className="fc_title">
                        <h2>Games</h2>
                    </div>
                    <ul className="foot_nav">
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>
                        <li><a href='#'>Game Name</a></li>

                    </ul>
                </div>
                <div className="fc_box">
                    <div className="fc_title">
                        <h2>News</h2>
                    </div>
                    <ul className="news_list">
                        <li>
                            <div className="ft_new_img" style={{background: '#ccc url(./img/sl.png)'}}></div>
                            <ol>2019.11.25</ol>
                            <div className="ft_new_text" onClick="goCurrentPromotion('egtrace-nov')">
                                <p>Here You can write your news text</p></div>
                        </li>
                        <li>
                            <div className="ft_new_img" style={{background: '#ccc url(./img/sl.png)'}}></div>
                            <ol>2019.11.25</ol>
                            <div className="ft_new_text" onClick="goCurrentPromotion('egtrace-nov')">
                                <p>Here You can write your news text</p></div>
                        </li>

                    </ul>
                </div>
                <div className="fc_box">
                    <div className="fc_title">
                        <h2>Contact</h2>
                    </div>
                    <div className="fc_contact">
                        <div className="row" data-ico="phone">
                            <p><a href="tel:0000000000" data-name="Information Center"><span>000</span>0 00 00 00</a></p>
                        </div>
                        <div className="row" data-ico="email">
                            <a href="mailto:supportlider-bet.com" data-name="E-Mile">support@yourDomine.com</a>
                        </div>
                    </div>
                </div>*/}
            </div>

            <div className="w">
                <div className="f_foot">
                    <div data-old="+18">&nbsp;</div>
                    <div data-old="+21" style={{marginLeft:'15px'}}>&nbsp;</div>
                    <p>Copyright © 2021 by your Company Name</p>
                </div>
            </div>

            <div className="f_line"></div>

        </footer>
    );
}
export default Footer;