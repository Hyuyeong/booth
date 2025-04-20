import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/UserApi";
import { Container, Title, Table, Thead, Tr, Th, Td } from "../ui/Table";

function Users() {
  const { data, isPending, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Title>Booking List</Title>
      <Table>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>User</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <tbody>
          {data.map((user, index) => (
            <Tr key={user.id}>
              <Td>{++index}</Td>
              <Td>{user.userName}</Td>
              <Td>{user.emailAddress}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Users;
