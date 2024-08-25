import React from 'react';

function CarTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Total Cars</th>
          <th>Total Value (Baht)</th>
          <th>Models</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([brand, details]) => (
          <tr key={brand}>
            <td>{brand}</td>
            <td>{details.totalCars}</td>
            <td>{details.totalValue}</td>
            <td>
              <ul>
                {details.models.map((model) => (
                  <li key={model.model}>
                    {brand} / {model.model}: {model.numberOfCars} cars ({model.valueInBaht * model.numberOfCars} Baht)
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CarTable;
