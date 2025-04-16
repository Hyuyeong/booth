import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
// import 'dotenv/config';
function Booking() {
    // const [data, setData] = useState([]);

    // const URL =process.env.DB_HOST+"/api/data"


    
      const { data, error, isPending } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
          const response = await fetch('http://localhost:3001/api/data', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',  // Necessary if you want to send cookies
          });
          if (!response.ok) throw new Error('Failed to fetch data');
          return response.json();
        },
      });
      
      console.log(data);


    // useEffect(() => {
    //     fetch("http://localhost:3001/api/data")
    //       .then(res => res.json())
    //       .then(data => {
    //         setData(data);
    //       })
    //       .catch(err => console.error(err));

    //   }, []);

    //   console.log(data);
      
    return (
        <div>
          <h1>Posts</h1>
          {/* Check if data is an array and has items */}
          {data && Array.isArray(data) ? (
            <ul>
              {data.map((post) => (
                <li key={post.id}>{post.Charge}</li>
              ))}
            </ul>
          ) : (
            <div>No data available</div>
          )}
        </div>
      );
}

export default Booking
