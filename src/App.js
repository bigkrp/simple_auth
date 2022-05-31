import './App.css';
import AuthProvider from './components/AuthProvider.js';
import GeneralContent from './components/GeneralContent';
import TopBar from 'components/TopBar';
import { useEffect, useRef } from 'react';

const TMP_FULLSCREEN_IMAGE_ID = 'temorary-fullscreen-image'

const onFullscreenHandler = (event) => {
  const isOutFullscreen = document.fullscreenElement === null

  if (!isOutFullscreen) {
    return
  }

  const tmpImg = document.getElementById(TMP_FULLSCREEN_IMAGE_ID)

  if (tmpImg) {
    tmpImg.remove()
  }
}

function App() {
  const ref = useRef()

  const showImageFullScreen = () => {
      const app = ref.current
      const style = app.currentStyle || window.getComputedStyle(app, false)
      const backgroundImage = style.backgroundImage.slice(4, -1).replace(/"/g, "");

      const newImg = new Image()
      newImg.id = TMP_FULLSCREEN_IMAGE_ID
      newImg.src = backgroundImage
      
      document.body.appendChild(newImg)
      newImg.requestFullscreen()
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', onFullscreenHandler)

    return () => {document.removeEventListener('fullscreenchange', onFullscreenHandler)}
  })

  return (
    <div ref={ref} className="App">
      <AuthProvider>
        <TopBar />
        <GeneralContent onFullscreen={showImageFullScreen}/>
      </AuthProvider>
    </div>
  );
}

export default App;
