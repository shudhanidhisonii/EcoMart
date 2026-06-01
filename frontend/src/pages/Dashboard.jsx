
import Sidebar from '@/components/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
  <div className="flex">
  <Sidebar />  {/* 280px wide */}
  <main className="flex-1 min-h-screen bg-gray-100 p-10">
    <Outlet />  {/* or your page content */}
  </main>
</div>
  )
}

export default Dashboard
