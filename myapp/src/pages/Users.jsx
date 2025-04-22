import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { fetchUsers } from "../services/UserApi";
import { Container, Title, Table, Thead, Tr, Th, Td } from "../ui/Table";
import { useState, useEffect } from "react";

const pageSize = 5;
const fetchUsers = async (page) => {
  const res = await fetch(
    `http://localhost:5110/api/user?page=${page}&pageSize=${pageSize}`
  );
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
};

function Users() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(data.totalCount / pageSize);

  // 📦 prefetch next page
  useEffect(() => {
    if (!data) return;

    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ["users", page + 1],
        queryFn: () => fetchUsers(page + 1),
      });
    }
  }, [data, page, queryClient]);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Title>User List</Title>
      <Table>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>User</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <tbody>
          {data.items.map((user, index) => (
            <Tr key={user.id}>
              <Td>{++index}</Td>
              <Td>{user.userName}</Td>
              <Td>{user.emailAddress}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
      >
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </Container>
  );
}

export default Users;
