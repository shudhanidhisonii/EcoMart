import { ShoppingCart, Menu, X, Search } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { setUser } from '../redux/userSlice'

const Navbar = () => {
  const { user } = useSelector(store => store.user)
  const { cart } = useSelector(store => store.product)

  const admin = user?.role === "admin"
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)

  // SIMPLE LOGOUT (NO API)
  const logoutHandler = () => {
    localStorage.removeItem("accessToken")
    dispatch(setUser(null))
    toast.success("Logged out successfully")
    setMobileOpen(false)
    navigate("/login")
  }

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    ...(user ? [{ label: `Hello, ${user.firstName}`, to: `/profile/${user._id}` }] : []),
    ...(admin ? [{ label: 'Dashboard', to: '/dashboard/sales' }] : []),
  ]

  return (
    <>
      {/* Top announcement bar */}
      <div style={{
        backgroundColor: '#16a34a',
        color: '#fff',
        textAlign: 'center',
        fontSize: '12px',
        padding: '6px 16px',
        fontWeight: 500,
        letterSpacing: '0.3px'
      }}>
       Free shipping on orders above ₹999 &nbsp;|&nbsp; Sustainable & Eco-Friendly Products
      </div>

      <header style={{
        width: '100%',
        zIndex: 50,
        backgroundColor: '#111827',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 40px',
          height: '64px'
        }}>

          {/* Logo */}
       {/* Logo */}
<Link
  to='/'
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none'
  }}
>
  <img
    src="/logo.png"
    alt="EcoMart Logo"
    style={{
      width: '38px',
      height: '38px',
      objectFit: 'cover',
      borderRadius: '50%'
    }}
  />

  <span
    style={{
      fontSize: '22px',
      fontWeight: 700,
      color: '#ffffff'
    }}
  >
    EcoMart
  </span>
</Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex" style={{
            display: 'flex',
            gap: '32px',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#d1d5db',
                  textDecoration: 'none'
                }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            {/* Search */}
            <div className="hidden md:flex" style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '6px 14px'
            }}>
              <Search size={14} color="#9ca3af" />
              <input
                placeholder="Search products..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '13px',
                  width: '160px'
                }}
              />
            </div>

            {/* Cart */}
            <Link to='/cart' style={{ position: 'relative' }}>
              <ShoppingCart size={20} color="#d1d5db" />
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: '#16a34a',
                borderRadius: '50%',
                color: '#fff',
                fontSize: '10px',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {cart?.items?.length || 0}
              </span>
            </Link>

            {/* Auth Button */}
            {user ? (
              <button
                onClick={logoutHandler}
                style={{
                  border: '1px solid #16a34a',
                  background: 'transparent',
                  color: '#4ade80',
                  padding: '7px 18px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                style={{
                  background: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  padding: '7px 18px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Login
              </button>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', color: '#fff' }}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ background: '#1f2937', padding: '16px' }}>

            <ul style={{ listStyle: 'none', padding: 0 }}>
              {navLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    style={{ color: '#d1d5db', display: 'block', padding: '10px' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {user ? (
              <button
                onClick={logoutHandler}
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '10px',
                  border: '1px solid #16a34a',
                  background: 'transparent',
                  color: '#4ade80'
                }}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => { navigate('/login'); setMobileOpen(false); }}
                style={{
                  width: '100%',
                  marginTop: '10px',
                  padding: '10px',
                  background: '#16a34a',
                  color: '#fff',
                  border: 'none'
                }}
              >
                Login
              </button>
            )}
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar