import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import AppLoading from 'expo-app-loading'

export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false)

  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
    changeScreenOrientation()
  }, [])

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  let uri;

  if (__DEV__) {
    uri = 'http://10.0.0.44:8000'
  } else {
    uri = 'https://capitol-games.github.io/Frangalia'
  }

  return (
    <React.Fragment>
      {appIsLoaded ? (
        <WebView source={{ uri }} cacheEnabled={false} />
      ) : (
        <AppLoading
          startAsync={() => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 5000)
            });
          }}
          onFinish={() => {
            setAppIsLoaded(true)
            changeScreenOrientation()
          }}
          onError={console.warn}
        />
      )}

    </React.Fragment>
  );
}
