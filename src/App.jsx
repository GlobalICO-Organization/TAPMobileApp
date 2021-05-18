import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import AppRoutes from './App.routes'
import Header from './components/Header/index'
import Footer from './components/Footer/index'

const App = () => {
  let isInitialized = false
  let isInitializing = false

  useEffect(() => {
    (async () => {
      if (process.env.REACT_APP_MOBILE_ONLY === 'true') {
        if (!isMobile) {
          loadScript()
        } else {
          loadScript()
        }
      } else {
        loadScript()
      }
    })()
  }, [])

  const loadScript = () => {
    window.onAcuantSdkLoaded = () => initialize()
    const sdk = document.createElement("script")
    sdk.src = "AcuantJavascriptWebSdk.min.js"
    sdk.async = true
    document.body.appendChild(sdk)
  }

  const initialize = () => {
    if(!isInitialized && !isInitializing){
      isInitializing = true
      let base64Token = btoa(process.env.REACT_APP_USER_NAME + ':' + process.env.REACT_APP_PASSWORD)
      window.AcuantJavascriptWebSdk.initialize(base64Token, process.env.REACT_APP_ACAS_ENDPOINT,{
        onSuccess: () => {
          isInitialized = true
          isInitializing = false
          console.log('Initialized');
        },
        onFail: (code, description) => {
          isInitializing = false
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