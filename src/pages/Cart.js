import React, { useState } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../components/auth/AuthContext';
import { FaWifi, FaSnowflake } from 'react-icons/fa';
import CheckoutModal from '../components/checkout/CheckoutModal';

export default function Cart() {
  const { user, purchaseTickets, cart, removeFromCart, clearCart, updateQuantity } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  const totalPrice = cart.items.reduce((sum, item) => {
    const quantity = item.quantity || 1;
    return sum + (item.payment.basePrice * quantity);
  }, 0);

  const handleSuccess = async (tickets) => {
    await purchaseTickets(tickets);
    await clearCart();
    setShowCheckout(false);
    alert("Квитки успішно придбано!");
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
              {cart.items.map(item => {
                const quantity = item.quantity || 1;
                
                return (
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
                      <div>↓</div>
                      <strong>{item.route.to.city}</strong>
                    </td>
                    <td>
                      🕐 {new Date(item.route.from.departureTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                      <div className="mt-1">
                        🏁 {new Date(item.route.to.arrivalTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td>
                      <Badge bg="secondary">{item.seat.class}</Badge>
                      <div className="small mt-1">Вагон {item.seat.carriage}, місце {item.seat.number}</div>
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
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="mx-3 fw-bold">{quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    
                    <td><strong>{item.payment.basePrice * quantity} UAH</strong></td>
                    
                    <td>
                      <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
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