import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchInput from '../utils/SearchInput';
import FilterCheckbox from '../utils/FilterCheckbox';

export default function TrainFilters({ 
  searchQuery, onSearchChange, 
  wifiOnly, onWifiChange,
  maxPrice, onPriceChange,
  selectedCity, onCityChange,
  cities 
}) {
  return (
    <Row className="mb-4 align-items-center">
      <Col md={4} sm={12} className="mb-2">
        <SearchInput 
          value={searchQuery} 
          onChange={onSearchChange} 
          placeholder="Search by number or route ..." 
        />
      </Col>

      <Col md={3} sm={12} className="mb-2">
        <select 
          className="form-select" 
          value={selectedCity} 
          onChange={(e) => onCityChange(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </Col>

      <Col md={3} sm={12} className="mb-2">
        <label className="form-label">Max Price: {maxPrice} UAH</label>
        <input 
          type="range" 
          className="form-range" 
          min="0" max="500" step="10"
          value={maxPrice}
          onChange={(e) => onPriceChange(e.target.value)}
        />
      </Col>

      <Col md={2} sm={12} className="mb-2">
        <FilterCheckbox 
          label="Wi-Fi" 
          checked={wifiOnly} 
          onChange={onWifiChange} 
        />
      </Col>
    </Row>
  );
}