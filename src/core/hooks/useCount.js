export function useCount(){
    let width = window.innerWidth;

    const count = () =>{
         if(width<=160){
              return 20;
         }else if(width>160 && width<=576){
             return 30;
        }else if(width>576 && width<=768){
             return 20;
         }else if(width>768 && width<=992){
             return 20;
         }else {
             return 30
         }

    }
    return  {count}
}
