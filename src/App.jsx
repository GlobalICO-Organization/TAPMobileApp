import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import AppRoutes from './App.routes'

const App = () => {
  let isInitialized = false
  let isInitializing = false
  const history = useHistory()

  useEffect(() => {
    (async () => {
      window.onAcuantSdkLoaded = function(){
        this.initialize();
    }.bind(this);
      const sdk = document.createElement('script')
      sdk.src = 'AcuantJavascriptWebSdk.min.js'
      sdk.async = true
      document.body.appendChild(sdk);
    })()
  }, [])

  useEffect(() => {
    //setTimeout(()=> window.loadAcuantSdk(), 10000)
  },[])

  const initialize = () => {
    console.log('backend connected url is:', process.env.REACT_APP_BACKEND_URL);
    if (!isInitialized && !isInitializing) {
      isInitializing = true
      let base64Token = btoa(process.env.REACT_APP_USER_NAME + ':' + process.env.REACT_APP_PASSWORD)
      window.AcuantJavascriptWebSdk.initialize(base64Token, process.env.REACT_APP_ACAS_ENDPOINT, {
        onSuccess: () => {
          isInitialized = true
          isInitializing = false
          console.log('Initialized')
        },
        onFail: (code, description) => {
          isInitializing = false
          console.log('Not Initialized,\nCode: ' + code + ',\nDescription: ' + description)
          history.push('/error')
        }
      })
    }
  }

  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  )

}

export default App
