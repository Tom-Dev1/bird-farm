<<<<<<< HEAD
import React from 'react';
import HomePage from '../../components/HomePage';

export default function home() {
    return (
        <div>
            <HomePage />
        </div>
    );
}
=======
import Footer from '../../Layout/components/Footer';
import Header from '../../Layout/components/Header';
import Navbar from '../../Layout/components/Navbar';

function Home() {
    return (
        <>
            <Navbar />
        </>
    );
    // <div>
    //     <Header />
    //     <Navbar />;
    //     <Footer />
    // </div>;
}

export default Home;
>>>>>>> main
