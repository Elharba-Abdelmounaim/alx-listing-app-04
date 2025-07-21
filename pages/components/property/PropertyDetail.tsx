type PropertyDetailProps = {
  property: {
    id: number;
    title: string;
    description: string;
    location: string;
    price: number;
    image: string;
    // أضف الحقول التي تستخدمها
  };
};

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div>
      <h1>{property.title}</h1>
      <img src={property.image} alt={property.title} />
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price: ${property.price}</p>
    </div>
  );
}
