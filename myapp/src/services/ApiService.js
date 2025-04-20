const BASE_URL = "http://localhost:5110/api";

export const fetchData = async (endpoint) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
};
