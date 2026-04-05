import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import TrainFilters from '../components/train/TrainFilter';
import TrainList from '../components/train/TrainList';
import AppPagination from '../components/utils/AppPagination';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialTrainsData, getAllCities } from '../data/trains';
import { useFilteredTrains } from '../hooks/useFilteredTrains';
import { useAuth } from '../components/auth/AuthContext';
const CustomContainer = styled(Container)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

export default function Home() {
  const [trains] = useLocalStorage('trainsData', initialTrainsData);
  const [searchQuery, setSearchQuery] = useLocalStorage('trainSearchQuery', '');
  const [wifiOnly, setWifiOnly] = useLocalStorage('trainWifiFilter', false);
  const [maxPrice, setMaxPrice] = useLocalStorage('trainMaxPrice', 250);
  const [selectedCity, setSelectedCity] = useLocalStorage('trainCity', '');
  const { addToCart, addToWishlist } = useAuth();

  const allCities = getAllCities(initialTrainsData);

  const { currentTrains, totalPages, currentPage, setCurrentPage } = useFilteredTrains(
    trains, 
    { searchQuery, wifiOnly, maxPrice, selectedCity }, 
    3
  );

  return (
    <>
      <CustomContainer className="my-5 shadow-sm">
        <h2 className="mb-4 text-center">Available Trains</h2>
        
        <TrainFilters 
          searchQuery={searchQuery} onSearchChange={setSearchQuery}
          wifiOnly={wifiOnly} onWifiChange={setWifiOnly}
          maxPrice={maxPrice} onPriceChange={setMaxPrice}
          selectedCity={selectedCity} onCityChange={setSelectedCity}
          cities={allCities}
        />

        <TrainList trains={currentTrains} addToCart={addToCart} addToWishlist={addToWishlist}/>
        <AppPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </CustomContainer>
    </>
  );
}