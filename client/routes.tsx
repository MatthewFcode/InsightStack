/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import Skills from './components/Skills'
import Tech from './components/Tech'
import App from './components/App'
import Home from './components/Home'
import Registration from './components/Registration.tsx'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/tech" element={<Tech />} />
    <Route path="/skills" element={<Skills />} />
    <Route path="/registration" element={<Registration />} />
  </Route>,
)

export default routes
