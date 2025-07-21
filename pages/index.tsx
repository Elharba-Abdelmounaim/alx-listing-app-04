import { useEffect, useState } from 'react';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/properties') 
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch properties');
        }
        return res.json();
      })
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Available Properties</h1>
      <ul>
        {properties.map((property: any) => (
          <li key={property.id}>
            <h2>{property.title}</h2>
            <p>{property.location}</p>
            <p>${property.price}/night</p>
            <img src={property.image} alt={property.title} width="200" />
          </li>
        ))}
      </ul>
    </div>
  );
}
