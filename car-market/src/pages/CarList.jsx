import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CarList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [filteredCars, setFilteredCars] = useState([]);
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/cars.json`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(json => {
    setData(json.cars);
    const savedHighlightedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(savedHighlightedCars);
  })
  .catch(error => console.error('Error loading data:', error));

  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCars = carsData.filter((car) => {
      return (
        car.brand.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm)
      );
    });
    setSearchTerm(searchTerm);
    setFilteredCars(filteredCars);
  };

  const handleBrandSelect = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    if (selectedBrand === 'All') {
      setFilteredCars(carsData);
    } else {
      setFilteredCars(carsData.filter(car => car.brand.toLowerCase() === selectedBrand.toLowerCase()));
    }
  };

  const brands = ['All', ...new Set(carsData.map(car => car.brand))];

  return (
    <Container>
      {/* Navigation Bar */}
      <Row className="mb-3">
        <Col>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link as={Link} to="/car-market/">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/car-market/highlighted-cars">Highlighted Cars</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/car-market/carlist">Car List</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>

      {/* Car List Content */}
      <h1 className="text-primary text-center my-4">Available Cars List</h1>
      <Row className="mb-4">
        <Col md={4} className="offset-md-4">
          <Form.Select
            value={selectedBrand}
            onChange={handleBrandSelect}
            style={{ width: '250px' }}
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4} className="offset-md-4">
          <Form.Control
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by brand or model"
            style={{ width: '250px' }}
          />
        </Col>
      </Row>

      <Row>
        {filteredCars.map((car) => (
          <Col key={car.id} md={4} className="mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">Value: {car.valueInBaht} Baht</p>
                <p className="card-text">Number of cars: {car.numberOfCars}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CarList;
