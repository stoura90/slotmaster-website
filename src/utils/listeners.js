 const Listeners=()=>{
    const onWindowResizeListener = (callback)=>{
        window.addEventListener('resize',callback );
    }
    const onRemoveWindowResizeListener =(callback)=>{
        window.removeEventListener('resize',callback);
    }
     return {
         onWindowResizeListener,
         onRemoveWindowResizeListener
     }
}
 export default Listeners
