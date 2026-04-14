import { useState, useEffect } from 'react';

export function useFilteredTrains(trains, filters, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = trains.filter(train => {
  const routeString = `${train.route.from.city} ${train.route.to.city}`.toLowerCase();

  const matchesSearch = train.number.includes(filters.searchQuery);
  const matchesSearchName = routeString.includes(filters.searchQuery.toLowerCase());
  const matchesWifi = filters.wifiOnly ? train.hasWifi : true;
  const matchesPrice = train.payment.basePrice <= Number(filters.maxPrice);
  const matchesCity =
    filters.selectedCity === '' ||
    train.route.from.city === filters.selectedCity ||
    train.route.to.city === filters.selectedCity;
   
  let matchDate = true;
      if (filters.selectedDate) {
        const filterTime = new Date(filters.selectedDate).getTime();
        const trainTime = new Date(train.route.from.departureTime).getTime();
        matchDate = trainTime <= filterTime + 86400000; 
      }

  return (matchesSearch || matchesSearchName) && matchesWifi && matchesPrice && matchesCity && matchDate;
});

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchQuery, filters.wifiOnly, filters.maxPrice, filters.selectedCity, filters.selectedDate]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentTrains = filtered.slice(indexOfLastItem - itemsPerPage, indexOfLastItem);

  return {
    currentTrains,
    totalPages,
    currentPage,
    setCurrentPage
  };
}