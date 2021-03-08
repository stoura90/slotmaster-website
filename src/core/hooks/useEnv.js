
export function useEnv(){
    const env = process.env;
    const get = (key) =>{
        return env["REACT_APP_"+key] || null
    }
   return {get}
}
