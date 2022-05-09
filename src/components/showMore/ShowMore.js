import {useTranslation} from "../../core";

const ShowMore=({page,count, length, setPage})=>{
    console.log(page,count,length)
    const {t} = useTranslation()
    return  page*count<length && (
        <div className="show-more">
            <div className="show-info">You’ve viewed {page * count} of {length} games</div>
            <div className="show-more-btn" onClick={()=>setPage(page+1)}>{t("show more")}</div>
        </div>
    )
}
export default ShowMore;
