import React from "react";
import { Table } from "react-bootstrap";
import CartItem from "./CartItem";

export default function CartTable({ items, onRemove, onUpdate }) {
  return (
    <Table hover responsive className="align-middle">
      <thead>
        <tr>
          <th>Train #</th>
          <th>Route</th>
          <th>Departure / Arrival</th>
          <th>Class / Seat</th>
          <th>Amenities</th>
          <th>Price</th>
          <th className="text-center">Quantity</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </Table>
  );
}
