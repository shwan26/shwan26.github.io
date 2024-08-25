import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HighlightedCars = () => {
  const [data, setData] = useState([]);
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    fetch('/data/cars.json')
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

  const removeHighlight = (carId) => {
    const updatedHighlightedCars = highlightedCars.filter(id => id !== carId);
    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlightedCars));
  };

  const highlightedCarData = data.filter(car => highlightedCars.includes(car.id));

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <Nav variant="tabs">
            <Nav.Item>
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link as={Link} to="/highlighted-cars">Highlighted Cars</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link as={Link} to="/carlist">Car List</Nav.Link>
                </Nav.Item>
    
          </Nav>
        </Col>
      </Row>
      <h1 className="mb-4">Highlighted Cars</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Number of Cars</th>
            <th>Value in Baht</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {highlightedCarData.length > 0 ? (
            highlightedCarData.map(car => (
              <tr key={car.id}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.numberOfCars}</td>
                <td>{car.valueInBaht * car.numberOfCars}</td>
                <td>
                  <Button variant="danger" onClick={() => removeHighlight(car.id)}>Remove</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No highlighted cars</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default HighlightedCars;
