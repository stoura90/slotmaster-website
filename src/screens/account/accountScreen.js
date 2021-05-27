import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    ajax,
    bayern,
    betsoft,
    bitcoin,
    evolutionGaming,
    inter,
    kings,
    liver,
    logoM,
    manCity,
    manUn,
    milan,
    narcos,
    neteller,
    netent,
    pirate,
    sl2,
    slider1,
    slotSardCover,
    sun,
    tonys,
    webmoney
} from '../../assets/img/images';

import {
    restriction18,
    account,
    arrowLeft,
    arrowLeftBack,
    borderDashed,
    checked,
    checkedMb,
    clockModal,
    close,
    discord,
    fileUpload,
    filter,
    hArrows,
    home,
    logo,
    logout,
    multiArrow,
    netnet,
    percent,
    percentModal,
    play,
    plus,
    reload,
    remove,
    search,
    searchLight,
    selectArrow,
    skrillSmall,
    sliderArrowNext,
    sliderArrowPrev,
    time,
    viewOff,
    viewOn,
} from '../../assets/img/icons/icons';


import {Balance, Carousel, Footer, FooterCarousel, Header, HeaderCarousel, SlotCard, Swp} from "../../components";
import _ from "lodash";

import "../../assets/styles/_select2.scss"
import {CustomDropdown} from "../../components/dropdown/dropDown";
import {useUser} from "../../core/hooks/useUser";
const AccountScreen = () =>{
    const nav  = useNavigation();
    const {User,signOut} = useUser();
    useEffect(()=>{
        console.log(nav)

    },[nav]);
    return (
        <>
            <Header/>

            <main className="account">
                <div className="container">
                    <div className="row">
                        <Balance/>

                    </div>
                </div>
            </main>

            <Footer/>

        </>
    )
}

export default AccountScreen