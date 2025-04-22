import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d1d5db;
`;

export const Thead = styled.thead`
  background-color: #f3f4f6;
`;

export const Tr = styled.tr`
  text-align: center;
`;

export const Th = styled.th`
  border: 1px solid #d1d5db;
  padding: 0.5rem;
`;

export const Td = styled.td`
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  text-align: ${(props) => props.align || "center"};
`;
