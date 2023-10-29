import React, { useState } from 'react';
import { makeAxiosRequest } from '../../utils/helper';

function Registration() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [isRegistered, setIsRegistered] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }
        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = 'Phone Number is required';
        }
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        return errors;
    };

    const handleRegistration = async (e) => {
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            e.preventDefault();
            try {
                const url = `http://localhost:3000/api/users/register`;
                const headers = {
                    // Connection: 'Keep-alive',
                    'Content-Type': 'application/json'
                };

                let options = {
                    method: 'POST',
                    url: url,
                    headers
                };
                const response = await makeAxiosRequest(options, formData);
                console.log(response);
                localStorage.setItem('x-access_token', response.token);
            } catch (error) {
                console.error('Registration error:', error);
            }
            setIsRegistered(true);
        }

    };

    return (
        <div>
            <h2>Registration</h2>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                {formErrors.firstName && <div className="error">{formErrors.firstName}</div>}
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                {formErrors.lastName && <div className="error">{formErrors.lastName}</div>}
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {formErrors.email && <div className="error">{formErrors.email}</div>}
            </div>
            <div>
                <label>Phone Number</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                />
                {formErrors.phoneNumber && <div className="error">{formErrors.phoneNumber}</div>}
            </div>
            <div>
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                {formErrors.address && <div className="error">{formErrors.address}</div>}
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                {formErrors.password && <div className="error">{formErrors.password}</div>}
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                />
                {formErrors.confirmPassword && <div className="error">{formErrors.confirmPassword}</div>}
            </div>
            <button onClick={handleRegistration}>Register</button>
            {isRegistered && <div className="success">Registration successful!</div>}
        </div>
    );
}

export default Registration;
