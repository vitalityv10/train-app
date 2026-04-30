import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Offcanvas,
  Spinner,
} from "react-bootstrap";
import { FaFilter, FaTrain } from "react-icons/fa";
import TrainFilters from "../components/train/TrainFilter";
import TrainList from "../components/train/TrainList";
import AppPagination from "../components/utils/AppPagination";
import { initialTrainsData, getAllCities } from "../data/trains";
import { useFilteredTrains } from "../hooks/useFilteredTrains";
import { useTrainsData } from "../hooks/useTrainsData";
import { useTickets } from "../components/context/TicketsContext";
import { useCart } from "../components/context/CartContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Home() {
  const { trains, loading } = useTrainsData();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [searchQuery, setSearchQuery] = useLocalStorage("trainSearchQuery", "");
  const [wifiOnly, setWifiOnly] = useLocalStorage("trainWifiFilter", false);
  const [maxPrice, setMaxPrice] = useLocalStorage("trainMaxPrice", 250);
  const [selectedCity, setSelectedCity] = useLocalStorage("trainCity", "");
  const [selectedDate, setSelectedDate] = useLocalStorage("trainDate", "");

  const { addToWishlist } = useTickets();
  const { addToCart } = useCart();
  const allCities = getAllCities(initialTrainsData);

  const { currentTrains, totalPages, currentPage, setCurrentPage } =
    useFilteredTrains(
      trains,
      { searchQuery, wifiOnly, maxPrice, selectedCity, selectedDate },
      3,
    );

  const renderFilters = () => (
    <TrainFilters
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      wifiOnly={wifiOnly}
      onWifiChange={setWifiOnly}
      maxPrice={maxPrice}
      onPriceChange={setMaxPrice}
      selectedCity={selectedCity}
      onCityChange={setSelectedCity}
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
      cities={allCities}
    />
  );

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Container className="pt-4 pt-md-5">
        <div className="d-lg-none mb-4">
          <Button
            variant="primary"
            className="w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm"
            onClick={() => setShowMobileFilters(true)}
          >
            <FaFilter /> Налаштувати пошук
          </Button>
        </div>

        <Row className="g-4">
          <Col lg={3} className="d-none d-lg-block">
            <div className="sticky-top" style={{ top: "90px" }}>
              {renderFilters()}
            </div>
          </Col>

          <Col xs={12} lg={9}>
            {loading ? (
              <LoadingState />
            ) : currentTrains.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <TrainList
                  trains={currentTrains}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                />
                <div className="mt-5 d-flex justify-content-center">
                  <AppPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            )}
          </Col>
        </Row>

        <Offcanvas
          show={showMobileFilters}
          onHide={() => setShowMobileFilters(false)}
          placement="start"
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title className="text-primary fw-bold">
              Параметри пошуку
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-light">
            {renderFilters()}
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </div>
  );
}

const LoadingState = () => (
  <div className="text-center mt-5 p-5 bg-white rounded-4 shadow-sm">
    <Spinner animation="border" variant="primary" className="mb-3" />
    <h5 className="text-primary">Завантажуємо розклад...</h5>
  </div>
);

const EmptyState = () => (
  <div className="text-center p-5 bg-white rounded-4 shadow-sm text-muted">
    <FaTrain size={50} className="mb-3 opacity-25" />
    <h4>Нічого не знайдено</h4>
    <p>Спробуйте змінити параметри фільтрації.</p>
  </div>
);
