// import React from 'react';
// import './Sidebar.scss';
// import { Link, useParams } from 'react-router-dom';

// import { useState } from 'react';

// const Sidebar = ({ categories }) => {
//     const { id: selectedCategoryID } = useParams();
//     return (
//         <div>
//             <h3 className="sidebar-title">Filter By</h3>
//             <div className="sidebar-content">
//                 <div className="sidebar-list">
//                     {categories.map((category) => {
//                         const isActive = category.id.toString() === selectedCategoryID;
//                         return (
//                             <div className={`sidebar-item ${isActive ? 'active' : ''}`} key={category.id}>
//                                 <Link to={`/products/category/${category.id}`}>{category.category_name}</Link>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
// import React from 'react';
// import './Sidebar.scss';
// import { Link, useParams } from 'react-router-dom';

// const Sidebar = ({ categories }) => {
//     const { id: selectedCategoryID } = useParams();
//     const allCategory = { id: 'all', category_name: 'All' };
//     const categoriesWithAll = [allCategory, ...categories];

//     return (
//         <div>
//             <h3 className="sidebar-title">Filter By</h3>
//             <div className="sidebar-content">
//                 <div className="sidebar-list">
//                     {categoriesWithAll.map((category) => {
//                         const isActive = category.id.toString() === selectedCategoryID;
//                         return (
//                             <div className={`sidebar-item ${isActive ? 'active' : ''}`} key={category.id}>
//                                 <Link to={`/products/category/${category.id}`}>{category.category_name}</Link>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;
// const Sidebar = ({ categories, onFilterChange }) => {
//     const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//     const [selectedSex, setSelectedSex] = useState(null);
//     const [priceFrom, setPriceFrom] = useState('');
//     const [priceTo, setPriceTo] = useState('');

//     const handleCategoryChange = (categoryId) => {
//         if (categoryId === 'all') {
//             setSelectedCategoryId(null);
//         } else {
//             setSelectedCategoryId(categoryId);
//         }
//     };

//     const handleSexChange = (sex) => {
//         setSelectedSex(sex);
//     };

//     const handlePriceFromChange = (event) => {
//         setPriceFrom(event.target.value);
//     };

//     const handlePriceToChange = (event) => {
//         setPriceTo(event.target.value);
//     };

//     const handleApplyFilters = () => {
//         const filters = {};

//         if (selectedCategoryId !== null) {
//             filters.category_id = selectedCategoryId;
//         }

//         if (selectedSex !== null) {
//             filters.sex = selectedSex;
//         }

//         if (priceFrom !== '') {
//             filters.priceFrom = parseFloat(priceFrom);
//         }

//         if (priceTo !== '') {
//             filters.priceTo = parseFloat(priceTo);
//         }

//         if (onFilterChange) {
//             onFilterChange(filters);
//         }
//     };

//     return (
//         <div>
//             <h2>Categories</h2>
//             <ul>
//                 <li key="all">
//                     <label>
//                         <input
//                             type="checkbox"
//                             checked={selectedCategoryId === null}
//                             onChange={() => handleCategoryChange('all')}
//                         />
//                         All
//                     </label>
//                 </li>
//                 {categories.map((category) => (
//                     <li key={category.id}>
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={selectedCategoryId === category.id}
//                                 onChange={() => handleCategoryChange(category.id)}
//                                 disabled={selectedCategoryId === 'all'}
//                             />
//                             {category.category_name}
//                         </label>
//                     </li>
//                 ))}
//                 <h2>Filter By</h2>
//                 <label>
//                     <input
//                         type="radio"
//                         name="sex"
//                         checked={selectedSex === null}
//                         onChange={() => handleSexChange(null)}
//                     />
//                     All
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         name="sex"
//                         checked={selectedSex === true}
//                         onChange={() => handleSexChange(true)}
//                     />
//                     Male
//                 </label>
//                 <label>
//                     <input
//                         type="radio"
//                         name="sex"
//                         checked={selectedSex === false}
//                         onChange={() => handleSexChange(false)}
//                     />
//                     Female
//                 </label>
//                 <label>
//                     Price From:
//                     <input type="number" value={priceFrom} onChange={handlePriceFromChange} />
//                 </label>
//                 <label>
//                     Price To:
//                     <input type="number" value={priceTo} onChange={handlePriceToChange} />
//                 </label>
//             </ul>
//             <button onClick={handleApplyFilters}>Apply</button>
//         </div>
//     );
// };

// export default Sidebar;
import { useEffect, useState } from 'react';
import { Checkbox, Radio, RadioGroup, FormControlLabel, Slider, Button } from '@mui/material';
import './Sidebar.scss';
const Sidebar = ({ categories, onFilterChange }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedSex, setSelectedSex] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 10000]);

    useEffect(() => {
        if (selectedCategoryId === null) {
            setSelectedCategoryId('all');
        }
    }, [selectedCategoryId]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
    };

    const handleSexChange = (event) => {
        const newSelectedSex = event.target.value === 'all' ? null : event.target.value;
        setSelectedSex(newSelectedSex);
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleApplyFilters = () => {
        const filters = {};

        if (selectedCategoryId !== null && selectedCategoryId !== 'all') {
            filters.category_id = selectedCategoryId;
        }

        if (selectedSex !== null) {
            filters.sex = selectedSex;
        }

        filters.priceFrom = priceRange[0];
        filters.priceTo = priceRange[1];

        if (onFilterChange) {
            onFilterChange(filters);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3 className="sidebar-title">Categories</h3>

            <FormControlLabel
                control={
                    <Checkbox checked={selectedCategoryId === 'all'} onChange={() => handleCategoryChange('all')} />
                }
                label="All"
            />

            {categories.map((category) => (
                <FormControlLabel
                    key={category.id}
                    control={
                        <Checkbox
                            checked={selectedCategoryId === category.id}
                            onChange={() => handleCategoryChange(category.id)}
                        />
                    }
                    label={category.category_name}
                />
            ))}
            <h3 className="sidebar-title">Filter By</h3>
            <RadioGroup name="sex" value={selectedSex ? selectedSex : 'all'} onChange={handleSexChange}>
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="true" control={<Radio />} label="Male" />
                <FormControlLabel value="false" control={<Radio />} label="Female" />
            </RadioGroup>
            <div>
                <label>Price Range:</label>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}`}
                    min={0}
                    max={10000}
                />
            </div>

            <Button variant="contained" onClick={handleApplyFilters}>
                Apply
            </Button>
        </div>
    );
};

export default Sidebar;
