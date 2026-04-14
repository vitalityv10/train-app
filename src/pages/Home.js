import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button, Offcanvas } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import TrainFilters from '../components/train/TrainFilter';
import TrainList from '../components/train/TrainList';
import AppPagination from '../components/utils/AppPagination';
import { initialTrainsData, getAllCities } from '../data/trains';
import { useFilteredTrains } from '../hooks/useFilteredTrains';
import { useAuth } from '../components/auth/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { useLocalStorage } from '../hooks/useLocalStorage';

const PageBackground = styled.div`
  background-color: #f4f8fb;
  height: 100%; 
  padding-bottom: 20px; 
`;

export default function Home() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [searchQuery, setSearchQuery] = useLocalStorage('trainSearchQuery', '');
  const [wifiOnly, setWifiOnly] = useLocalStorage('trainWifiFilter', false);
  const [maxPrice, setMaxPrice] = useLocalStorage('trainMaxPrice', 250);
  const [selectedCity, setSelectedCity] = useLocalStorage('trainCity', '');
  const [selectedDate, setSelectedDate] = useLocalStorage('trainDate', ''); 

  const { addToCart, addToWishlist } = useAuth();
  const allCities = getAllCities(initialTrainsData);

  useEffect(() => {
    const fetchTrains = async () => {
      const snapshot = await getDocs(collection(db, 'trains'));
      if (snapshot.empty) {
        for (const train of initialTrainsData) {
          await setDoc(doc(db, 'trains', String(train.id)), train);
        }
        setTrains(initialTrainsData);
      } else {
        setTrains(snapshot.docs.map(d => d.data()));
      }
      setLoading(false);
    };
    fetchTrains();
  }, []);

  const { currentTrains, totalPages, currentPage, setCurrentPage } = useFilteredTrains(
    trains,
    { searchQuery, wifiOnly, maxPrice, selectedCity, selectedDate },
  3 );

  const renderFilters = () => (
    <TrainFilters
      searchQuery={searchQuery} onSearchChange={setSearchQuery}
      wifiOnly={wifiOnly} onWifiChange={setWifiOnly}
      maxPrice={maxPrice} onPriceChange={setMaxPrice}
      selectedCity={selectedCity} onCityChange={setSelectedCity}
      selectedDate={selectedDate} onDateChange={setSelectedDate}
      cities={allCities}
    />
  );

  return (
    <PageBackground>
      <Container className="pt-4 pt-md-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button 
            variant="outline-primary" 
            className="d-lg-none d-flex align-items-center gap-2 rounded-pill px-3"
            onClick={() => setShowMobileFilters(true)}
          >
            <FaFilter /> Фільтри
          </Button>
        </div>

        <Row className="g-4">
          <Col lg={3} className="d-none d-lg-block">
            <div className="sticky-top" style={{ top: '20px' }}>
              {renderFilters()}
            </div>
          </Col>

          <Col xs={12} lg={9}>
            {loading ? (
              <div className="text-center mt-5 p-5 bg-white rounded-4 shadow-sm text-primary">
                <div className="spinner-border mb-3" role="status"></div>
                <h5>Шукаємо найкращі маршрути...</h5>
              </div>
            ) : (
              <>
                <TrainList trains={currentTrains} addToCart={addToCart} addToWishlist={addToWishlist} />
                
                {currentTrains.length === 0 ? (
                  <div className="text-center p-5 bg-white rounded-4 shadow-sm text-muted mt-3">
                    <h4>Поїздів не знайдено 🚂</h4>
                    <p>Спробуйте змінити критерії пошуку або обрати іншу дату.</p>
                  </div>
                ) : (
                  <div className="mt-4 d-flex justify-content-center">
                    <AppPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>

        <Offcanvas show={showMobileFilters} onHide={() => setShowMobileFilters(false)} placement="start">
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="text-primary fw-bold">Фільтри</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-light">
            {renderFilters()}
          </Offcanvas.Body>
        </Offcanvas>

      </Container>
    </PageBackground>
  );
}