import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const calculateTotalPrice = (ppu, qty, discount) => (ppu * qty) - discount;

  const addItem = () => {
    const item = products.find((v) => itemRef.current.value === v.code);
    const ppu = Number(ppuRef.current.value);
    const qty = Number(qtyRef.current.value);
    const discount = Number(discountRef.current.value);
    const totalPrice = calculateTotalPrice(ppu, qty, discount);

    const newItem = {
      item: item.name,
      ppu: ppu,
      qty: qty,
      discount: discount,
      totalPrice: totalPrice,
    };

    const existingItemIndex = dataItems.findIndex(
      (v) => v.item === newItem.item && v.totalPrice === newItem.totalPrice
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex].qty += newItem.qty;
      updatedItems[existingItemIndex].discount += newItem.discount;
      updatedItems[existingItemIndex].totalPrice = calculateTotalPrice(
        updatedItems[existingItemIndex].ppu,
        updatedItems[existingItemIndex].qty,
        updatedItems[existingItemIndex].discount
      );
      setDataItems(updatedItems);
    } else {
      setDataItems([...dataItems, newItem]);
    }
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(Number(e.target.value))}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" ref={discountRef} defaultValue={0} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
