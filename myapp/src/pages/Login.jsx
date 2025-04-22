import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  max-width: 400px;
  margin: 50px auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #f9fafb;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  &:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.3);
  }
`;

const Button = styled.button`
  background-color: #38bdf8;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: #0ea5e9;
  }
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const res = await fetch("http://localhost:5110/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);

      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } else {
      const err = await res.text();
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
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
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default Login;
