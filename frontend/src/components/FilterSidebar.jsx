import React from "react";
import { Input } from "./ui/input";

const FilterSidebar = ({ search, setSearch, category, setCategory, brand, setBrand, setPriceRange, products = [], priceRange }) => {

  const safeProducts = Array.isArray(products) ? products : [];

  const categories = safeProducts.map((p) => p.category);
  const uniqueCategories = ["All", ...new Set(categories)];

  const brands = safeProducts.map((p) => p.brand);
  const uniqueBrands = ["All", ...new Set(brands)];

  const handleCategoryClick = (val) => setCategory(val);
  const handleBrandChange = (e) => setBrand(e.target.value);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };

  return (
    // ✅ No outer wrapper — Products.jsx already provides the card shell
    <div style={{ padding: '16px' }}>

      {/* Search */}
      <Input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 10px',
          fontSize: '13px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Divider */}
      <div style={{ borderTop: '1px solid #f3f4f6', margin: '16px 0' }} />

      {/* Category */}
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>
        Category
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {uniqueCategories.map((item, index) => (
          <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="category"
              checked={category === item}
              onChange={() => handleCategoryClick(item)}
              style={{ accentColor: '#16a34a', width: '14px', height: '14px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '13px', color: category === item ? '#16a34a' : '#374151', fontWeight: category === item ? 600 : 400 }}>
              {item}
            </span>
          </label>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #f3f4f6', margin: '16px 0' }} />

      {/* Brand */}
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>
        Brand
      </p>
      <select
        value={brand}
        onChange={handleBrandChange}
        style={{
          width: '100%',
          padding: '8px 10px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#374151',
          background: '#ffffff',
          outline: 'none',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
      >
        {uniqueBrands.map((item, index) => (
          <option key={index} value={item}>{item.toUpperCase()}</option>
        ))}
      </select>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #f3f4f6', margin: '16px 0' }} />

      {/* Price Range */}
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 10px' }}>
        Price Range
      </p>

      {/* Min/Max inputs */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
        <input
          type="number"
          min="0"
          value={priceRange[0]}
          onChange={handleMinChange}
          style={{
            flex: 1,
            padding: '7px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '7px',
            fontSize: '12px',
            color: '#374151',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        <span style={{ color: '#9ca3af', fontSize: '12px' }}>–</span>
        <input
          type="number"
          min="0"
          value={priceRange[1]}
          onChange={handleMaxChange}
          style={{
            flex: 1,
            padding: '7px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '7px',
            fontSize: '12px',
            color: '#374151',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Range label */}
      <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 8px' }}>
        ₹{priceRange?.[0].toLocaleString()} — ₹{priceRange?.[1].toLocaleString()}
      </p>

      {/* Sliders */}
      <input
        type="range"
        min="0"
        max="5000"
        step="100"
        value={priceRange[0]}
        onChange={handleMinChange}
        style={{ width: '100%', accentColor: '#16a34a', marginBottom: '6px' }}
      />
      <input
        type="range"
        min="0"
        max="999999"
        step="100"
        value={priceRange[1]}
        onChange={handleMaxChange}
        style={{ width: '100%', accentColor: '#16a34a' }}
      />

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        style={{
          width: '100%',
          marginTop: '20px',
          padding: '10px',
          background: '#16a34a',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.2s',
          boxSizing: 'border-box',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#15803d'}
        onMouseLeave={e => e.currentTarget.style.background = '#16a34a'}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;