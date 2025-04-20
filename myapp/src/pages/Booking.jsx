import { useQuery } from "@tanstack/react-query";
import { fetchBookings } from "../services/BookingApi";
import { Container, Title, Table, Thead, Tr, Th, Td } from "../ui/Table";

function Booking() {
  const { data, isPending, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  if (isPending) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Title>Booking List</Title>
      <Table>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>User</Th>
            <Th>Booth</Th>
            <Th>Status</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <tbody>
          {data.map((booking) => (
            <Tr key={booking.id}>
              <Td>{booking.id}</Td>
              <Td>{booking.userName}</Td>
              <Td>{booking.boothName}</Td>
              <Td>{booking.status}</Td>
              <Td>${booking.amount}</Td>
              <Td>{new Date(booking.date).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Booking;
