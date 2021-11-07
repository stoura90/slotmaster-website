import React, {useEffect} from 'react';
import {useNavigation} from "../../core/hooks/useNavigation";
import {
    promo1,
    promo2,
    promo3,
    promo4,
    promo5,
    promoCardCover,
    sl2, w2
} from '../../assets/img/images';
import { Footer,  Header, Swp} from "../../components";
import PromoCard from "../../components/promo/promoCard";


const PromoScreen = () =>{
    const nav  = useNavigation();
    useEffect(()=>{
        console.log(nav)

    },[nav]);
    return (
        <>
            <Header page={"promo"}/>

            <div className="slider">
                <Swp count={3}  data={[
                    {id:2, icon:w2 },
                    {id:4, icon:sl2 },
                    {id:5, icon:sl2 },
                    {id:6, icon:sl2 },
                    {id:7, icon:sl2 }
                ]}/>
            </div>

            <main className="main">
                <div className="container wrapper">

                    <ul className="d-flex align-items-center flex-wrap promo-tabs list-unstyled">
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link active"> All </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> Casino </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> Sports </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link"> Shop </a>
                        </li>
                    </ul>
                    <div className="col-12 d-flex align-items-center section-head">
                        <a href="#">
                            <div className="section-heading">all Provider</div>
                        </a>
                    </div>

                    <div className="tab-content promo-list" id="myTabContent">
                        <div>
                            <div className="row">
                                <PromoCard count={20} data={[
                                    {id:1,icon:promo1},
                                    {id:1,icon:promo2},
                                    {id:1,icon:promo3},
                                    {id:1,icon:promo4},
                                    {id:1,icon:promo5},
                                    {id:1,icon:promoCardCover}
                                ]} />

                            </div>
                        </div>
                    </div>


                </div>
            </main>

            <Footer/>

        </>
    )
}

export default PromoScreen
