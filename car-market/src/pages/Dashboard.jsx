import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Nav, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarPieChart from '../components/CarPieChart';
import CarBarChart from '../components/CarBarChart';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({
    model: '',
    brand: '',
    valueInBaht: '',
    numberOfCars: ''
  });

  useEffect(() => {
    console.log('Fetching data from /data/cars.json');
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
  

  const toggleHighlight = (carId) => {
    const updatedHighlightedCars = highlightedCars.includes(carId)
      ? highlightedCars.filter(id => id !== carId)
      : [...highlightedCars, carId];

    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlightedCars));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleAddCar = () => {
    const newCarObject = {
      id: Date.now(), // Simple unique ID
      ...newCar,
      valueInBaht: parseFloat(newCar.valueInBaht),
      numberOfCars: parseInt(newCar.numberOfCars, 10)
    };

    setData(prevData => [...prevData, newCarObject]);
    setShowModal(false);
  };

  if (error) {
    return <div className="alert alert-danger">Error loading data: {error}</div>;
  }

  const getBrandData = () => {
    if (!Array.isArray(data)) return {};

    return data.reduce((acc, car) => {
      if (!acc[car.brand]) {
        acc[car.brand] = { totalValue: 0, totalCars: 0, models: {} };
      }
      acc[car.brand].totalValue += car.valueInBaht * car.numberOfCars;
      acc[car.brand].totalCars += car.numberOfCars;
      acc[car.brand].models[car.model] = {
        id: car.id,
        valueInBaht: car.valueInBaht,
        numberOfCars: car.numberOfCars
      };
      return acc;
    }, {});
  };

  const brandData = getBrandData();

  return (
    <Container>
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
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Car
          </Button>
        </Col>
      </Row>
      <h1 className="mb-4">Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Number of Cars</th>
            <th>Value in Baht</th>
            <th>Highlight</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(brandData).map(([brand, data]) => (
            <React.Fragment key={brand}>
              {Object.entries(data.models).map(([model, modelData]) => (
                <tr key={`${brand}-${model}`}>
                  <td>{brand}</td>
                  <td>{model}</td>
                  <td>{modelData.numberOfCars}</td>
                  <td>{modelData.valueInBaht * modelData.numberOfCars}</td>
                  <td>
                    <Button 
                      variant={highlightedCars.includes(modelData.id) ? 'danger' : 'primary'}
                      onClick={() => toggleHighlight(modelData.id)}
                    >
                      {highlightedCars.includes(modelData.id) ? 'Unhighlight' : 'Highlight'}
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2"><strong>Total</strong></td>
                <td>{data.totalCars}</td>
                <td>{data.totalValue}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <CarPieChart data={data} />
      <CarBarChart data={brandData} />

      {/* Modal for adding a new car */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control 
                type="text" 
                name="brand"
                value={newCar.brand} 
                onChange={handleInputChange} 
                placeholder="Enter car brand" 
              />
            </Form.Group>
            <Form.Group controlId="formModel">
              <Form.Label>Model</Form.Label>
              <Form.Control 
                type="text" 
                name="model"
                value={newCar.model} 
                onChange={handleInputChange} 
                placeholder="Enter car model" 
              />
            </Form.Group>
            <Form.Group controlId="formValueInBaht">
              <Form.Label>Value in Baht</Form.Label>
              <Form.Control 
                type="number" 
                name="valueInBaht"
                value={newCar.valueInBaht} 
                onChange={handleInputChange} 
                placeholder="Enter car value in Baht" 
              />
            </Form.Group>
            <Form.Group controlId="formNumberOfCars">
              <Form.Label>Number of Cars</Form.Label>
              <Form.Control 
                type="number" 
                name="numberOfCars"
                value={newCar.numberOfCars} 
                onChange={handleInputChange} 
                placeholder="Enter number of cars" 
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddCar}>
              Add Car
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
