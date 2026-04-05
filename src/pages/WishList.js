import React from 'react';
import { Container, ListGroup, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../components/auth/AuthContext';
import { FaWifi, FaSnowflake } from 'react-icons/fa';

export function WishList() {
  const { wishlist, removeFromWishlist, addToCart, user } = useAuth();

  if (!user)
    return <Container className="mt-5 text-center"><h3>Please log in to see your wishlist.</h3></Container>;

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">My Wishlist 🤍</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-muted">Your wishlist is empty.</p>
      ) : (
        <ListGroup>
          {wishlist.map(train => (
            <ListGroup.Item key={train.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>#{train.number} — {train.title}</strong>
                <div className="text-muted">
                  {train.route.from.city} → {train.route.to.city}
                </div>
                <div className="small text-muted">
                  🕐 {new Date(train.route.from.departureTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                  {' – '}
                  {new Date(train.route.to.arrivalTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                  {' '} | ⏱ {train.route.duration}
                </div>
                <div className="small">
                  🎫 {train.seat.class} | Вагон {train.seat.carriage}, місце {train.seat.number}
                  {train.hasWifi && <span className="ms-2 text-primary"><FaWifi /> Wi-Fi</span>}
                  {train.hasAirConditioning && <span className="ms-2 text-info"><FaSnowflake /></span>}
                </div>
                <Badge bg="success" className="mt-1">{train.payment.basePrice} UAH</Badge>
              </div>
              <div className="d-flex gap-2">
                <Button size="sm" variant="success" onClick={() => addToCart(train)}>
                  🛒 Add to Cart
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => removeFromWishlist(train.id)}>
                  Remove
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}