import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';

export default function DetailMixBird() {
    const { birdID } = useParams();
    const navigate = useNavigate();
    const [getAll, setGetAll] = useState(null);
    const [bird_KH, setBird_KH] = useState(null);
    const [bird_SHOP, setBird_SHOP] = useState(null);
    const [Mix_Bird, setMix_Bird] = useState(null);
    const [status_Mix, setStatus_Mix] = useState(null);


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
                    setGetAll(data.data);
                    const selectedBird = data.data.find(bird => bird.bird_KH_id === birdID);
                    if (selectedBird) {
                        setBird_KH(selectedBird.bird_KH);
                        setBird_SHOP(selectedBird.bird_Shop);
                        setMix_Bird(selectedBird.id);
                        setStatus_Mix(selectedBird.phoiGiongStatus);
                    }
                })
                .catch(error => {
                    console.error("Error fetching data: ", error);
                });
        } catch (error) {
            console.error("Error outside fetch: ", error);
        }
    }, [birdID]);

    if (!getAll || getAll.length === 0) {
        return <div>Loading...</div>;
    }

    const categoryMapping = {
        "51d334ad9f0a48a59fa4c7a20f70dcfd": "Đại bàng",
        "6a2aab32b3574510a434136b31cec3df": "Vẹt",
        "6bc3f28de70c4982b67d3bd1f0011cf2": "Chào mào",
    };
    const sexMapping = {
        true: "Male",
        false: "Female",
    };

    console.log('getAll : ', getAll);
    console.log('Mix_Bird_ID:', Mix_Bird);
    console.log('BIRD_KH', bird_KH);
    console.log('BIRD_SHOP', bird_SHOP);
    console.log('Phoi giong Status:', status_Mix);
    const selectedBird = getAll.find(bird => bird.bird_KH_id === birdID);
    return (
        <React.Fragment>

            <TableContainer>
                <CssBaseline />
                <Container fixed>
                    <Box height={100} />
                    <Box sx={{ flexGrow: 1, height: '400hv' }}>
                        <Container maxWidth="xs">
                            <Typography sx={{ textAlign: 'center' }} variant="h4" gutterBottom>
                                View Mix Bird Detail
                            </Typography>
                        </Container>
                        <Divider />
                        <Box height={10} />
                        <TableContainer sx={{ maxHeight: '100%' }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>My Bird</TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Bird Shop </TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Bird Mix Day</TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}> Date of arrival of eggs</TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Number of eggs</TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Status</TableCell>
                                        <TableCell align="center" style={{ minWidth: '100px', fontWeight: 'bolder' }}>Cost</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={selectedBird.id}>
                                        <TableCell align="center" key={selectedBird.bird_KH.id}>
                                            <img src={'http://birdsellingapi-001-site1.ctempurl.com/' + selectedBird.bird_KH.image} alt={selectedBird.bird_KH.name} style={{ width: '270px', height: '250px' }} />
                                            <Typography>Name: {selectedBird.bird_KH.name}</Typography>
                                            <Typography>Gender: {sexMapping[selectedBird.bird_KH.sex]}</Typography>
                                            <Typography>Category: {categoryMapping[selectedBird.bird_KH.category_id]}</Typography>
                                        </TableCell>
                                        <TableCell align="center" key={selectedBird.bird_Shop.id}>
                                            <img src={'http://birdsellingapi-001-site1.ctempurl.com/' + selectedBird.bird_Shop.image} alt={selectedBird.bird_Shop.name} style={{ width: '270px', height: '250px' }} />
                                            <Typography>Name: {selectedBird.bird_Shop.name}</Typography>
                                            <Typography>Gender: {sexMapping[selectedBird.bird_Shop.sex]}</Typography>
                                            <Typography>Category: {categoryMapping[selectedBird.bird_Shop.category_id]}</Typography>
                                        </TableCell>

                                        <TableCell align="center">{selectedBird.ngayChoPhoi}</TableCell>
                                        <TableCell align="center">{selectedBird.ngayCoTrung}</TableCell>
                                        <TableCell align="center">{selectedBird.soTrung}</TableCell>
                                        <TableCell align="center">{selectedBird.phoiGiongStatus}</TableCell>
                                        <TableCell align="center">{selectedBird.giaTien}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/user/mybird`)}
                            >
                                Back
                            </Button>
                        </TableContainer>
                    </Box>
                </Container>
            </TableContainer>
        </React.Fragment>
    );
}
