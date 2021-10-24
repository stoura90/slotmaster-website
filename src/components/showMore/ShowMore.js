 const ShowMore=({page,count, length, setPage})=>{
    return  page*count<length && (
        <div className="show-more">
            <div className="show-info">You’ve viewed {page * count} of {length} games</div>
            <div className="show-more-btn" onClick={()=>setPage(page+1)}>show more</div>
        </div>
    )
}
export default ShowMore;
