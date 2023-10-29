// SeatSelection.js
import React, { useState } from 'react';
import axios from 'axios';
import { makeAxiosRequest } from '../../utils/helper';

function SeatSelection({ busId }) {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [pickupPoint, setPickupPoint] = useState('');

    const handleSeatClick = (seatNumber) => {
        const isSeatSelected = selectedSeats.includes(seatNumber);
        if (isSeatSelected) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handleBlockSeats = async () => {
        try {
            const token = localStorage.getItem('x-access_token');
            const url = `http://localhost:3000/api/buses/blockSeats`;
            const headers = {
                Connection: 'Keep-alive',
                'Content-Type': 'application/json',
                'x-access-token': token
            };

            const data = {
                busId,
                passengerCount: selectedSeats.length,
                pickupPoint,
            }

            let options = {
                method: 'POST',
                url: url,
                headers
            };
            const response = await makeAxiosRequest(options, data);
            console.log(response);
        } catch (error) {
            console.error('Block seats error:', error);
        }
    };

    return (
        <div>
            <h2>Seat Selection</h2>
            <div>
                {Array.from({ length: 40 }, (_, i) => (
                    <div
                        key={i}
                        className={`seat ${selectedSeats.includes(i + 1) ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Pickup Point"
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
            />
            <button onClick={handleBlockSeats}>Block Seats</button>
        </div>
    );
}

export default SeatSelection;
