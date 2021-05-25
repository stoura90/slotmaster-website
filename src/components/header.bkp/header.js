import React from 'react';
import './/header.scss';
import {useUser} from "../../core/hooks/useUser";
import {useTranslation} from "../../core";

const Header =()=>{
    let auth = 0;

    const {User,signIn,signOut} = useUser();
    const { t, i18n } = useTranslation('main');

    return (
        <div id="header">
            <div className="header_wrapper">
                <div className='header'>
                    <div className='max-w'>
                        <table cellPadding='0' cellSpacing='0' style={{width: '100%', height: '64px'}}>
                            <tbody>
                            <tr>
                                <td className="logo">
                                    <span>YOUR LOGO</span>
                                    {/*<a href='/'>
                                        <span>Company Logo</span>
                                        <img src="" height="100%" alt=""/>
                                    </a>*/}
                                </td>
                              {/*  <td className="h_prom" width="120px">
                                    <a href="/">
                                        <div className="promotion_button">აქციები</div>
                                    </a>
                                </td>*/}
                                <td align='right' className='login-form'>
                                    <form action="">
                                        {!User.isLogged?
                                            <div className="auth_form_panel">

                                                <div className="zl2-auth">
                                                    <input type='text' autoComplete="off"
                                                        //onFocus="this.placeholder = ''"
                                                           name='username'
                                                           //value={this.state.userParam.user}
                                                           //onChange={(e) => this.setState(State("userParam.user", e.target.value, this.state))}
                                                           placeholder={t('სახელი')} className='zl2-input icon-user'/>
                                                    {/*<div className="rep_button">Reset</div>*/}
                                                </div>
                                                <div className="zl2-auth">
                                                    <input type='password' autoComplete="off"
                                                        //onFocus="this.placeholder = ''"
                                                           name='password'
                                                           //value={this.state.userParam.pass}
                                                           //onChange={(e) => this.setState(State("userParam.pass", e.target.value, this.state))}
                                                           placeholder={t('პაროლი')} className='zl2-input icon-password'/>
                                                    {/*<div className="rep_button">Reset</div>*/}
                                                </div>
                                                <div className="zl2-auth"><input type='button' onClick={()=>signIn()} value={t('შესვლა')} className='zl2-login_btn'/></div>
                                                <div className="zl2-auth"><a className="go_register">{t('რეგისტრაცია')}</a> </div>

                                                {/*<div className="zl2-auth qr_auth" style={{display: 'none'}}>
                                                    <div className="qr_auth_button">&nbsp;</div>
                                                </div>
                                                <div className="zl2-auth">
                                                    <div className="lang" data-lang="ka">
                                                        <div className="current_lang">&nbsp;</div>
                                                        <div className="lang_box">
                                                            <div className="lang_list">
                                                                <div className="flag_item" data-lang="ka" onClick={()=>this.change_lang('ka')}>&nbsp;</div>
                                                                <div className="flag_item" data-lang="ru" onClick={()=>this.change_lang('ru')}>&nbsp;</div>
                                                                <div className="flag_item" data-lang="en" onClick={()=>this.change_lang('en')}>&nbsp;</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>*/}
                                            </div>
                                            :
                                            <div className="zl2-user_panel">
                                                {/*<div className="zl2-up">
                                                    <div className="zl2-ubox">
                                                        <div>&nbsp;</div>
                                                    </div>
                                                    <div className="zl2-ubox user_progr_status">
                                                        <div className="status" data-status="5">
                                                            <span>zura.ph</span>
                                                        </div>
                                                        <div className="user_progr">
                                                            <div className="user_empty">&nbsp;</div>
                                                            <div className="user_prgr_line" data-level_left="5"
                                                                 data-level="6">
                                                                <div className="user_prgr_color_line" data-prgr="100"
                                                                     style={{width: '80%'}}>
                                                                    <div className="user_prgr_ball"
                                                                         data-points="700 ქულა">100%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <a href="/" className="user_prgr_a">გაეცანით აქციის წესებს</a>
                                                        </div>
                                                    </div>
                                                    <div className="zl2-ubox">
                                                        <div className="pin">
                                                            <span>121662</span>
                                                        </div>
                                                    </div>
                                                    <div className="zl2-ubox">
                                                        <div className="money" data-onof="" onClick={()=>this.change_display_amount()}>
                                                            <span>138.64</span>
                                                            <div className="switch_money">&nbsp;</div>
                                                        </div>
                                                    </div>
                                                </div>*/}
                                                {/*<div className="zl2-ubox"><a className="u_btn balance" href="/">ბალანსის შევსება</a></div>*/}
                                                <div className="zl2-ubox"><span className="u_btn myroom" onClick={()=>signOut()} style={{background:"#e53935",color:"#fff"}}>Log Out</span></div>

                                                {/*<div className="zl2-ubox">
                                                    <div className="u_btn u_drop">&nbsp;
                                                        <div className="u_drop_box">
                                                            <div className="user">
                                                                <div className="avatar" data-verif="1">&nbsp;</div>
                                                                <div className="user_info">
                                                                    <div className="username">gio</div>
                                                                    <div className="status">ვერიფიცირებული</div>
                                                                </div>
                                                            </div>
                                                            <div className="u_drop_nav">
                                                                <a href="/" className="nav_item"><i className="all-icon" data-ico="1">&nbsp;</i>ბალანსის მართვა</a>
                                                                <a href="/" className="nav_item"><i className="all-icon" data-ico="11">&nbsp;</i>პაროლის შეცვლა</a>
                                                                <a href="/" className="nav_item"><i className="all-icon" data-ico="10">&nbsp;</i>უსაფრთხოება</a>
                                                                <a href="/" className="nav_item"><i className="all-icon" data-ico="7">&nbsp;</i>ბილეთების ისტორია</a>
                                                            </div>
                                                            <div className="logout_btn">
                                                                <button onClick={()=>this.user_logout()}>გამოსვლა</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>*/}
                                                {/*<div className="zl2-ubox">
                                                    <div className="lang" data-lang="ka">
                                                        <div className="current_lang">&nbsp;</div>
                                                        <div className="lang_box">
                                                            <div className="lang_list">
                                                                <div className="flag_item" data-lang="ka" onClick={()=>this.change_lang('ka')}>&nbsp;</div>
                                                                <div className="flag_item" data-lang="ru" onClick={()=>this.change_lang('ru')}>&nbsp;</div>
                                                                <div className="flag_item" data-lang="en" onClick={()=>this.change_lang('en')}>&nbsp;</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>*/}
                                            </div>
                                        }
                                    </form>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;