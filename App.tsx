import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AppLoading } from 'expo';

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
    uri = 'http://10.0.0.45:8000'
  } else {
    uri = 'https://capitol-games.github.io/Frangalia'
  }

  return (
    <React.Fragment>
      {appIsLoaded ? (
        <WebView source={{ uri }} />
      ) : (
        <AppLoading
          startAsync={() => {
            console.log('Wait until game is loaded.')
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
