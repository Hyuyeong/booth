import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border-color: #16a34a;
  }
`;

const Button = styled.button`
  background-color: #16a34a;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #15803d;
  }
`;

const Message = styled.p`
  margin-top: 0.5rem;
  color: ${({ error }) => (error ? "red" : "black")};
`;

function Account() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setMessage("⚠️ Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("⚠️ Passwords do not match.");
      return;
    }

    const res = await fetch("http://localhost:5110/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: form.userName,
        email: form.email,
        password: form.password,
      }),
    });

    if (res.ok) {
      toast("✅ Registration successful!");
      setTimeout(() => navigate("/"), 1500);
    } else {
      const err = await res.text();
      setMessage(`❌ Error: ${err}`);
    }
  };

  return (
    <Wrapper>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </Form>
      {message && (
        <Message error={message.includes("⚠️") || message.includes("❌")}>
          {message}
        </Message>
      )}
    </Wrapper>
  );
}

export default Account;
