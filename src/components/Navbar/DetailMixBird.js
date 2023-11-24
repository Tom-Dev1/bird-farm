import React from 'react'
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { data } from '../Admin/charts/BarChart';
import { useEffect } from 'react';
import { useState } from 'react';

export default function DetailMixBird() {
    const { birdID } = useParams();
    const navigate = useNavigate();
    const [getAllDetail, setGetAllDetail] = useState(null);


    useEffect(() => {
        try {
            fetch(`http://birdsellingapi-001-site1.ctempurl.com/api/PhoiGiong/GetAllPhoiChim`)
                .then(response => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    setGetAllDetail(data.data);
                    console.log(data.data);
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                });
        } catch (error) {
            console.error("Error outside fetch: ", error);
        }
    }, []);


    if (!getAllDetail || getAllDetail.length === 0) {
        return <div>Loading...</div>;
    }

    const handleBack = () => {
        navigate(`/user/mybird`);
        console.log(`View detail for bird with ID:`);
    }
    return (
        <div>
            DetailMix
            {Array.isArray(getAllDetail) && getAllDetail.map((bird, index) => (
                <div key={bird.id}>
                    <p>ID: {bird.id}</p>
                    <p>Bird KH ID: {bird.bird_KH_id}</p>
                    <p>Bird Shop ID: {bird.bird_Shop_id}</p>
                </div>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleBack()}
            >
                handleBack
            </Button>
        </div>
    )
}

