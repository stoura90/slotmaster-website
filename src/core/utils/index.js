
import {Timeout} from "./timeout";
export const query_string=(params)=>Object.keys(params).map(key => key + '=' + params[key]).join('&');

export default {
    query_string,
  TimeOut: Timeout
}
