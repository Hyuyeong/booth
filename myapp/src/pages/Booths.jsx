import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Fetch booths from API
const fetchBooths = async () => {
  const res = await fetch("http://localhost:5110/api/booth");
  if (!res.ok) {
    throw new Error("Failed to fetch booths");
  }
  return res.json();
};

// Delete booth from API
const deleteBooth = async (id) => {
  const res = await fetch(`http://localhost:5110/api/booth/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete booth");
  }
};

const Booths = () => {
  const queryClient = useQueryClient();

  // Fetch booths data with useQuery
  const { data, error, isPending } = useQuery({
    queryKey: ["booths"],
    queryFn: fetchBooths,
  });

  // Delete mutation setup with useMutation
  const mutation = useMutation({
    mutationFn: deleteBooth,
    onSuccess: async () => {
      toast.success("Booth successfully deleted.");
      await queryClient.invalidateQueries({ queryKey: ["booths"] }); // Refresh booths list after deletion
    },
    onError: (err) => toast.error(err.message),
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Booths List</h1>
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((booth, index) => (
              <tr key={booth.id}>
                <td>{index + 1}</td>
                <td>{booth.name}</td>
                <td>{booth.descrpition}</td>
                <td>
                  <img
                    src={booth.imageAddress}
                    alt={booth.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                </td>
                <td>
                  <button onClick={() => mutation.mutate(booth.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No booths available</div>
      )}
    </div>
  );
};

export default Booths;
