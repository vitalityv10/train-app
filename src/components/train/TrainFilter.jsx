import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaWifi, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

export default function TrainFilters({
  searchQuery, onSearchChange,
  wifiOnly, onWifiChange,
  maxPrice, onPriceChange,
  selectedCity, onCityChange,
  selectedDate, onDateChange,
  cities
}) {

  const clearFilters = () => {
    onSearchChange('');
    onWifiChange(false);
    onPriceChange(250);
    onCityChange('');
    onDateChange('');
  };

  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
      <Card.Header className="bg-primary text-white py-3 border-0">
        <h5 className="mb-0 fw-bold">Параметри пошуку</h5>
      </Card.Header>
      
      <Card.Body className="p-4 bg-white">
        
        <Form.Group className="mb-4">
          <Form.Label className="text-muted small fw-bold text-uppercase tracking-wider">
            <FaSearch className="me-2 text-primary" /> Пошук
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Номер або маршрут..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="rounded-3 border-primary border-opacity-25 bg-light focus-ring"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-muted small fw-bold text-uppercase">
            <FaMapMarkerAlt className="me-2 text-primary" /> Місто
          </Form.Label>
          <Form.Select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="rounded-3 border-primary border-opacity-25 bg-light"
          >
            <option value="">Всі міста</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>{city}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-muted small fw-bold text-uppercase">
            <FaCalendarAlt className="me-2 text-primary" /> Дата (до або рівно)
          </Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="rounded-3 border-primary border-opacity-25 bg-light"
          />
        </Form.Group>

        <hr className="text-muted opacity-25" />

        <Form.Group className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Label className="text-muted small fw-bold text-uppercase mb-0">
              <FaMoneyBillWave className="me-2 text-primary" /> Макс. ціна
            </Form.Label>
            <span className="badge bg-primary rounded-pill">{maxPrice} UAH</span>
          </div>
          <Form.Range
            min={50} max={500} step={10}
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="custom-range"
          />
        </Form.Group>

        <Form.Group className="mb-4 bg-light p-3 rounded-3 border border-primary border-opacity-10">
          <Form.Check
            type="switch"
            id="wifi-switch"
            label={<><FaWifi className="text-primary me-2"/> Тільки з Wi-Fi</>}
            checked={wifiOnly}
            onChange={(e) => onWifiChange(e.target.checked)}
            className="fw-bold text-dark"
          />
        </Form.Group>

        <Button 
          variant="outline-secondary" 
          className="w-100 rounded-pill" 
          onClick={clearFilters}
        >
          Очистити фільтри
        </Button>

      </Card.Body>
    </Card>
  );
}