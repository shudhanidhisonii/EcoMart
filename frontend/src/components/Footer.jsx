import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer style={{ fontFamily: 'sans-serif' }}>

      {/* NEWSLETTER SECTION */}
      <div style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
        padding: '40px 20px',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
          flexWrap: 'wrap',
        }}>

          {/* LEFT TEXT */}
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#111827' }}>
              Join Our Community
            </h3>
            <p style={{ fontSize: '13.5px', color: '#6b7280', maxWidth: '340px' }}>
              Get latest deals & updates from EcoMart.
            </p>
          </div>

          {/* INPUT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              overflow: 'hidden',
            }}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  padding: '11px 16px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  width: '220px',
                }}
              />
              <button style={{
                padding: '11px 20px',
                background: '#16a34a',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
              }}>
                Join now
              </button>
            </div>

            {/* SOCIAL */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
                <div key={i} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon color="#fff" size={14} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MAIN FOOTER */}
      <div style={{ backgroundColor: '#0f172a', color: '#cbd5e1' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 20px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: '30px'
        }}>

          {/* BRAND */}
          <div>
            <h2 style={{ color: '#fff', fontSize: '22px', marginBottom: '12px' }}>
             EcoMart
            </h2>
            <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#94a3b8' }}>
              Sustainable marketplace for eco-friendly products.
            </p>
            <p style={{ marginTop: '10px', color: '#16a34a' }}>
              +1 (555) 123-4567
            </p>
            <p>ecomart@gmail.com</p>
          </div>

          {/* MY ACCOUNT */}
          <div>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>My Account</h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2' }}>
              <li>Profile</li>
              <li>Order History</li>
              <li>Shopping Cart</li>
              <li>Wishlist</li>
            </ul>
          </div>

          {/* HELPS */}
          <div>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>Helps</h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2' }}>
              <li>Contact</li>
              <li>FAQs</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2' }}>
              <li>About Us</li>
              <li>Shop</li>
              <li>Products</li>
              <li>Track Order</li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 style={{ color: '#fff', marginBottom: '10px' }}>Categories</h3>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', lineHeight: '2' }}>
              <li>Handicrafts</li>
              <li>Candles & Decor</li>
              <li>Fashion</li>
              <li>Organic</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div style={{
          borderTop: '1px solid #1f2937',
          padding: '15px 20px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <p style={{ fontSize: '12px', color: '#64748b' }}>
              © 2024 EcoMart. All rights reserved.
            </p>

            {/* PAYMENT BADGES */}
            <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
              <span>Apple Pay</span>
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Secure Payment</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;