import { LayoutDashboard, PackagePlus, PackageSearch, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div style={{
      position: 'sticky',
      left: 0,
      top: 0,                  // ✅ FIXED: was 95, causing the gap
      width: '280px',
      minHeight: '100vh',      // ✅ FIXED: full height from top
      background: '#f0fdf4',
      borderRight: '1px solid #bbf7d0',
      padding: '32px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      zIndex: 40,
      boxSizing: 'border-box',
    }}
      className="hidden md:flex"
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', paddingLeft: '8px' }}>
        <span style={{ fontSize: '20px', fontWeight: 700, color: '#15803d' }}>EcoMart</span>
        <span style={{ fontSize: '11px', fontWeight: 500, color: '#6b7280', marginLeft: '4px', background: '#dcfce7', padding: '2px 8px', borderRadius: '12px' }}>Admin</span>
      </div>

      {[
        { to: '/dashboard/sales', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        { to: '/dashboard/add-product', icon: <PackagePlus size={18} />, label: 'Add Product' },
        { to: '/dashboard/products', icon: <PackageSearch size={18} />, label: 'Products' },
        { to: '/dashboard/users', icon: <Users size={18} />, label: 'Users' },
        { to: '/dashboard/orders', icon: <FaRegEdit size={18} />, label: 'Orders' },
      ].map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            background: isActive ? '#16a34a' : 'transparent',
            color: isActive ? '#ffffff' : '#374151',
            transition: 'all 0.2s',
          })}
          onMouseEnter={e => {
            if (!e.currentTarget.style.background.includes('rgb(22')) {
              e.currentTarget.style.background = '#dcfce7';
              e.currentTarget.style.color = '#15803d';
            }
          }}
          onMouseLeave={e => {
            if (!e.currentTarget.classList.contains('active')) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#374151';
            }
          }}
        >
          {icon}
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;