import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';


const apiUrl = 'http://birdsellingapi-001-site1.ctempurl.com/api/Order/GetAll';

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        // Fetch data from the API
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Calculate total revenue from the data.data array
                const total = data.data.reduce((acc, order) => acc + order.orderTotal, 0);
                setTotalRevenue(total);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <React.Fragment>
            <Title>Doanh Thu</Title>
            <Typography component="p" variant="h4">
                ${totalRevenue.toFixed(2)}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {new Date().toLocaleDateString()}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </React.Fragment>
    );
}
