// Booking.js
import React, { useState } from 'react';
import axios from 'axios';
import { makeAxiosRequest } from '../../utils/helper';

function Booking({ blockingId }) {
    const handleBooking = async () => {
        try {

            const token = localStorage.getItem('x-access_token');
            const url = `http://localhost:3000/api/buses/blockSeats`;
            const headers = {
                Connection: 'Keep-alive',
                'Content-Type': 'application/json',
                'x-access-token': token
            };

            const data = {
                blockingId
            }

            let options = {
                method: 'POST',
                url: url,
                headers
            };
            const response = await makeAxiosRequest(options, data);
            console.log(response);
            console.log(response.data); // Handle the response
        } catch (error) {
            console.error('Booking error:', error);
        }
    };

    return (
        <div>
            <h2>Booking</h2>
            <button onClick={handleBooking}>Book Ticket</button>
        </div>
    );
}

export default Booking;
