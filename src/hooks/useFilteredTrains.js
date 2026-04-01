import { useState, useEffect } from 'react';

export function useFilteredTrains(trains, filters, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = trains.filter(train => {
    const matchesSearch = train.number.includes(filters.searchQuery);
    const matchesSearchName = train.route.join(' → ').toLowerCase()
              .includes(filters.searchQuery.toLowerCase());
    const matchesWifi = filters.wifiOnly ? train.hasWifi : true;
    const matchesPrice = train.price <= filters.maxPrice;
    const matchesCity = filters.selectedCity === '' || train.route.includes(filters.selectedCity);

    return matchesSearch || matchesSearchName && matchesWifi && matchesPrice && matchesCity;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchQuery, filters.wifiOnly, filters.maxPrice, filters.selectedCity]);

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