import {Suspense} from 'react'

import {store as Store} from './core/store/store'
import {Provider} from "./core";
import {Footer, Guest, Header, MainNavigator, Modal} from "./components";


const  App=()=> {
  return (
      <Suspense  fallback={"loading ..."}>
          <Provider store={Store}>
            <Header/>
                <MainNavigator/>
            <Footer/>
            <Modal
                styles={{width: '500px'}}
                onClickBackDrop={()=>console.log("close modal")}
            >
                <Guest/>
            </Modal>
          </Provider>
      </Suspense>
  )
}

export default App;
