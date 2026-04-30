import React from "react";
import { Button, Badge } from "react-bootstrap";
import { FaWifi, FaSnowflake } from "react-icons/fa";

export default function CartItem({ item, onRemove, onUpdate }) {
  const quantity = item.quantity || 1;

  return (
    <tr>
      <td>
        <strong>#{item.number}</strong>
        <div className="text-muted small">{item.title}</div>
        <Badge bg={item.type === "Night" ? "dark" : "primary"} className="mt-1">
          {item.type}
        </Badge>
      </td>
      <td>
        <strong>{item.route.from.city}</strong>
        <div>↓</div>
        <strong>{item.route.to.city}</strong>
      </td>
      <td>
        🕐{" "}
        {new Date(item.route.from.departureTime).toLocaleTimeString("uk-UA", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        <div className="mt-1">
          🏁{" "}
          {new Date(item.route.to.arrivalTime).toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </td>
      <td>
        <Badge bg="secondary">{item.seat.class}</Badge>
        <div className="small mt-1">
          Вагон {item.seat.carriage}, місце {item.seat.number}
        </div>
      </td>
      <td>
        {item.hasWifi && <FaWifi className="text-primary me-2" />}
        {item.hasAirConditioning && <FaSnowflake className="text-info" />}
      </td>
      <td>{item.payment.basePrice} UAH</td>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            disabled={quantity <= 1}
            onClick={() => onUpdate(item.id, quantity - 1)}
          >
            -
          </Button>
          <span className="mx-3 fw-bold">{quantity}</span>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onUpdate(item.id, quantity + 1)}
          >
            +
          </Button>
        </div>
      </td>
      <td>
        <strong>{item.payment.basePrice * quantity} UAH</strong>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => onRemove(item.id)}>
          Remove
        </Button>
      </td>
    </tr>
  );
}
