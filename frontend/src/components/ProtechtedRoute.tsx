import React, { ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'

interface ProtechtedRouteProps {
  children?: ReactNode
}

const ProtechtedRoute: React.FC<ProtechtedRouteProps> = ({ children }) => {

  const { data: user, isLoading, isError } = useAuth()

  if (isLoading) return <p>Loading...</p>
  if (isError || !user) return <Navigate to={'/login'} replace />

  // If children were provided (used as wrapper), render them; otherwise render nested routes via Outlet
  return children ? <>{children}</> : <Outlet />
}

export default ProtechtedRoute
