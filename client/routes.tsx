/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import Skills from './components/Skills'
import Tech from './components/Tech'
import App from './components/App'
import Home from './components/Home'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/posts" element={<Tech />} />
    <Route path="/skills" element={<Skills />} />
  </Route>,
)

export default routes
