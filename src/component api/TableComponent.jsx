import React, { useState, useEffect } from 'react';

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTerm, setFilterTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://swapi.dev/api/people');
            const json = await response.json();
            setData(json.results);
            setFilteredData(json.results);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterData(e.target.value, filterTerm);
    };

    const handleFilter = (e) => {
        setFilterTerm(e.target.value);
        filterData(searchTerm, e.target.value);
    };

    const filterData = (search, filter) => {
        let filteredResults = data;
        if (search) {
            filteredResults = filteredResults.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (filter) {
            filteredResults = filteredResults.filter((item) =>
                item.gender.toLowerCase().includes(filter.toLowerCase())
            );
        }
        setFilteredData(filteredResults);
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div>
                <select value={filterTerm} onChange={handleFilter}>
                    <option value="">Mostrar todos</option>
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="n/a">N/A</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Altura</th>
                        <th>Peso</th>
                        <th>Género</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.height}</td>
                            <td>{item.mass}</td>
                            <td>{item.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableComponent;
