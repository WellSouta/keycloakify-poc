import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import KcPage from './login/KcPage'

const mountNode = document.getElementById('root')
const root = createRoot(mountNode!)

root.render(
  <StrictMode>
    <KcPage kcContext={window.kcContext!} />
  </StrictMode>
)
