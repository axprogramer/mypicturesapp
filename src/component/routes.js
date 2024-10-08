import React from 'react'

const Home = React.lazy(() => import('../HomePage'))
const Upload = React.lazy(() => import('../UploadPage'))
const Gallary = React.lazy(() => import('../GallaryPage'))

const routes = [
  { path: '/', exact: true, name: 'Home Page',Home },
  { path: '/upload', name: 'Upload Page', element: Upload },
  { path: '/home', name: 'Upload Page', element: Home },
  { path: '/gallary', name: 'Upload Page', element: Gallary },
]

export default routes
