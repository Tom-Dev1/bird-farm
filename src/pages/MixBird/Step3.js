import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useEffect } from 'react';

const products = [
    {
        name: localStorage.getItem('name'), category: localStorage.getItem('category_id'), sex: localStorage.getItem('sex'), image: localStorage.getItem('imageFiles'),
    }
];
const getCategoryName = (value) => {
    switch (value) {
        case '51d334ad9f0a48a59fa4c7a20f70dcfd':
            return 'Đại bàng';
        case '6a2aab32b3574510a434136b31cec3df':
            return 'Vẹt';
        case '6bc3f28de70c4982b67d3bd1f0011cf2':
            return 'Chào mào';
        default:
            return '';
    }
};

const getSexName = (value) => {
    switch (value) {
        case 'true':
            return 'Male';
        case 'false':
            return 'Female';
        default:
            return '';
    }
};




const [birdData, setBirdData] = useState([]);
useEffect(() => {
    const fetchBirdData = async (chimMuonPhoi_id) => {
        try {
            const chimMuonPhoi_id = localStorage.getItem('chimMuonPhoi_id');

            // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your API
            const response = await fetch('http://birdsellingapi-001-site1.ctempurl.com/api/Product/GetProductByID/${chimMuonPhoi_id}');
            const data = await response.json();
            setBirdData(data);
        } catch (error) {
            console.error('Error fetching bird data:', error);
        }
    };

    fetchBirdData();
}, []);

export default function Step3() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Mix summary
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <div key={product.name}>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText primary={`Name of your bird: ${product.name}`} secondary={`Category: ${getCategoryName(product.category)}`} />
                            <Typography variant="body2">{`Gender: ${getSexName(product.sex)}`}</Typography>


                        </ListItem>

                        <img src={product.image} alt={product.name}
                            style={{
                                maxWidth: '250px',
                                height: '250px',
                                borderRadius: '5px',
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                transition: '0.3s',
                                marginBottom: '10px'
                            }} />
                    </div>
                ))}
                {birdData.map((bird) => (
                    <div key={bird.name}>
                        <ListItem sx={{ py: 1, px: 0 }}>
                            <ListItemText
                                primary={`Name of your bird: ${bird.name}`}
                                secondary={`Category: ${getCategoryName(bird.category)}`}
                            />
                            <Typography variant="body2">{`Gender: ${getSexName(bird.sex)}`}</Typography>
                        </ListItem>
                        <img
                            src={bird.image}
                            alt={bird.name}
                            style={{
                                maxWidth: '250px',
                                height: '250px',
                                borderRadius: '5px',
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                transition: '0.3s',
                                marginBottom: '10px',
                            }}
                        />
                    </div>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>

                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Cost to mix birds:" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        $34.06
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}