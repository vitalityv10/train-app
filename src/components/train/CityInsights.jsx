import React, { useState } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

export default function CityInsights({ fromCity, toCity }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);

    const cacheKey = `${fromCity}-${toCity}`.toLowerCase().replace(/\s/g, '_');
    const cacheRef = doc(db, 'cityInsights', cacheKey);

    try {
      const cached = await getDoc(cacheRef);
      if (cached.exists()) {
        setInsights(cached.data());
        return;
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const prompt = `Ти туристичний гід. Розкажи коротко та цікаво про маршрут ${fromCity} → ${toCity}.
      
      Відповідай ТІЛЬКИ у форматі JSON (без markdown, без бектіків):
      {
        "from": {
          "city": "${fromCity}",
          "emoji": "відповідний емодзі",
          "highlight": "одне речення — головна родзинка міста",
          "mustSee": ["місце 1", "місце 2", "місце 3"],
          "fact": "цікавий історичний факт (1-2 речення)"
        },
        "to": {
          "city": "${toCity}",
          "emoji": "відповідний емодзі",
          "highlight": "одне речення — головна родзинка міста",
          "mustSee": ["місце 1", "місце 2", "місце 3"],
          "fact": "цікавий історичний факт (1-2 речення)"
        },
        "routeTip": "порада для подорожі цим маршрутом (1 речення)"
      }`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const parsed = JSON.parse(text);

      await setDoc(cacheRef, parsed);
      setInsights(parsed);

    } catch (e) {
      console.error(e);
      setError('Не вдалось завантажити інформацію');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      {!insights && !loading && (
        <Button variant="outline-primary" size="sm" onClick={fetchInsights}>
          <FaMapMarkerAlt className="me-1" />
          Що варто відвідати?
        </Button>
      )}

      {loading && (
        <div className="text-center py-2">
          <Spinner size="sm" className="me-2" />
          <span className="text-muted small">Шукаємо цікавинки...</span>
        </div>
      )}

      {error && <Alert variant="danger" className="py-1 small">{error}</Alert>}

      {insights && (
        <div className="border rounded p-3 bg-light mt-2">
          {[insights.from, insights.to].map((city, i) => (
            <div key={i} className={i === 0 ? 'mb-3' : ''}>
              <h6 className="fw-bold mb-1">{city.emoji} {city.city}</h6>
              <p className="small text-muted mb-1">{city.highlight}</p>
              <div className="small mb-1">
                📍 {city.mustSee.join(' · ')}
              </div>
              <p className="small fst-italic text-secondary mb-0">
                💡 {city.fact}
              </p>
            </div>
          ))}
          {insights.routeTip && (
            <div className="border-top mt-2 pt-2">
              <p className="small mb-0">🚂 {insights.routeTip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}