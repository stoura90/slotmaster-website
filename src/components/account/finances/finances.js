import React from 'react';
import './style.scss';
import { useTranslation} from "../../../core";

const Finances = () => {
    const {t} = useTranslation()

    return (
        <>
            <div className="tab-content" id="verificationTabContent">
                <div
                    className="tab-pane fade show active"
                    id="verification"
                    role="tabpanel"
                    aria-labelledby="personal-tab"
                >
                    <div className="account-tab-inner">
                        <div className="tab-headline">{t("Finances")}</div>

                        ასდასდ


                    </div>
                </div>
            </div>
        </>
    )
}

export default Finances;
