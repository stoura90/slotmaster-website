import {Suspense} from 'react'

import {store as Store} from './core/store/store'
import {Provider} from "./core";
import {Footer, Header, MainNavigator} from "./components";


const  App=()=> {
  return (
      <Suspense  fallback={"loading ..."}>
          <Provider store={Store}>
            <Header/>
                <MainNavigator/>
            <Footer/>
          </Provider>
      </Suspense>
  )
}

export default App;
