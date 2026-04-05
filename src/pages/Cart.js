import React, { useState } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../components/auth/AuthContext';
import { FaWifi, FaSnowflake } from 'react-icons/fa';
import CheckoutModal from '../components/checkout/CheckoutModal';

export default function Cart() {
  const { cart, removeFromCart, user, purchaseTickets, clearCart } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cart.items.reduce((sum, item) => sum + item.payment.basePrice, 0);

  const handleSuccess = (tickets) => {
    purchaseTickets(tickets);
    clearCart();
  };

  if (!user)
    return <Container className="mt-5 text-center"><h3>Please log in to see your cart.</h3></Container>;

  return (
    <Container className="mt-5 p-4 shadow-sm bg-light rounded">
      <h2 className="mb-4">Your Shopping Cart</h2>

      {cart.items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Train #</th>
                <th>Route</th>
                <th>Departure / Arrival</th>
                <th>Duration</th>
                <th>Class / Seat</th>
                <th>Amenities</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong>#{item.number}</strong>
                    <div className="text-muted small">{item.title}</div>
                    <Badge bg={item.type === 'Night' ? 'dark' : 'primary'} className="mt-1">
                      {item.type}
                    </Badge>
                  </td>
                  <td>
                    <strong>{item.route.from.city}</strong>
                    <div className="text-muted small">{item.route.from.station}</div>
                    <div>↓</div>
                    <strong>{item.route.to.city}</strong>
                    <div className="text-muted small">{item.route.to.station}</div>
                  </td>
                  <td>
                    🕐 {new Date(item.route.from.departureTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                    <div className="text-muted small">
                      {new Date(item.route.from.departureTime).toLocaleDateString('uk-UA')}
                    </div>
                    <div className="mt-1">
                      🏁 {new Date(item.route.to.arrivalTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td>⏱ {item.route.duration}</td>
                  <td>
                    <Badge bg="secondary">{item.seat.class}</Badge>
                    <div className="small mt-1">Вагон {item.seat.carriage}, місце {item.seat.number}</div>
                  </td>
                  <td>
                    {item.hasWifi && <div><FaWifi className="text-primary" /> Wi-Fi</div>}
                    {item.hasAirConditioning && <div><FaSnowflake className="text-info" /> AC</div>}
                  </td>
                  <td><strong>{item.payment.basePrice} UAH</strong></td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end mt-4">
            <h4>Total: <span className="text-primary">{totalPrice} UAH</span></h4>
            <Button variant="success" className="mt-2 px-5" onClick={() => setShowCheckout(true)}>
              Checkout
            </Button>
          </div>

          <CheckoutModal
            show={showCheckout}
            onHide={() => setShowCheckout(false)}
            cartItems={cart.items}
            onSuccess={handleSuccess}
          />
        </>
      )}
    </Container>
  );
}