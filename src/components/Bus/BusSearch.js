// BusSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { makeAxiosRequest } from '../../utils/helper';

function BusSearch() {
  const [searchParams, setSearchParams] = useState({ origin: '', destination: '', dateOfJourney: '' });
  const [busList, setBusList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('x-access_token');
        const url = `http://localhost:3000/api/buses/search`;
        const headers = {
            Connection: 'Keep-alive',
            'Content-Type': 'application/json',
            'x-access-token': token
        };

        let options = {
            method: 'GET',
            url: url,
            headers
        };
        const response = await makeAxiosRequest(options, searchParams);  
        setBusList(response); // Update the bus list
    } catch (error) {
      console.error('Bus search error:', error);
    }
  };

  return (
    <div>
      <h2>Bus Search</h2>
      <form onSubmit={handleSearch}>
        <input type="text" name="origin" value={searchParams.origin} onChange={handleInputChange} placeholder="Origin" />
        {/* Add similar input fields for destination and date of journey */}
        <button type="submit">Search</button>
      </form>

      {/* Display the bus list */}
      <ul>
        {busList.map((bus) => (
          <li key={bus.id}>{bus.name} - {bus.departureTime}</li>
        ))}
      </ul>
    </div>
  );
}

export default BusSearch;
