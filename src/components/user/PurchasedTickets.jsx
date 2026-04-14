import { Accordion, Badge } from 'react-bootstrap';
import { FaWifi, FaSnowflake } from 'react-icons/fa';

export default function PurchasedTickets({ tickets }) {
  if (!tickets || tickets.length === 0) {
    return <p className="text-muted">Квитків поки немає.</p>;
  }

  return (
    <Accordion>
      {tickets.map((ticket, index) => (
        <Accordion.Item eventKey={ticket.ticketId || index.toString()} key={ticket.ticketId}>
          
          <Accordion.Header>
            <div className="d-flex justify-content-between align-items-center w-100 me-3">
              <div>
                <strong>#{ticket.number}</strong> {ticket.route.from.city} → {ticket.route.to.city}
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="small text-muted d-none d-md-block">
                  📅 {new Date(ticket.route.from.departureTime).toLocaleDateString('uk-UA')}
                </span>
                <Badge bg={ticket.payment.status === 'Paid' ? 'success' : 'warning'}>
                  {ticket.payment.status === 'Paid' ? '✅ Оплачено' : '⏳ При посадці'}
                </Badge>
              </div>
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <div>
                <p className="mb-1"><strong>Поїзд:</strong> {ticket.title}</p>
                <p className="mb-1">
                  <strong>Час відправлення:</strong> 🕐 {new Date(ticket.route.from.departureTime).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="mb-1">
                  <strong>Місце:</strong> {ticket.seat.class} | Вагон {ticket.seat.carriage}, місце {ticket.seat.number}
                </p>
                
                <div className="mt-2">
                  {ticket.hasWifi && <span className="me-3 text-primary"><FaWifi className="me-1" /> Wi-Fi</span>}
                  {ticket.hasAirConditioning && <span className="text-info"><FaSnowflake className="me-1" /> AC</span>}
                </div>
              </div>
              
              <div className="text-md-end mt-3 mt-md-0 d-flex flex-column justify-content-end">
                <div className="text-muted small mb-1">Вартість:</div>
                <h5 className="fw-bold text-success mb-0">{ticket.payment.basePrice} UAH</h5>
              </div>
            </div>
          </Accordion.Body>

        </Accordion.Item>
      ))}
    </Accordion>
  );
}