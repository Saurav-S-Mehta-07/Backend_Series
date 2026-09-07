const sampleListings = [
  {
    title: "Cozy Beachfront Villa",
    description: "Wake up to stunning ocean views in this peaceful beachfront villa.",
    price: 4500,
    location: "Goa",
    city: "Goa",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
  },
  {
    title: "Mountain View Cabin",
    description: "A warm wooden cabin surrounded by beautiful mountains and pine trees.",
    price: 3200,
    location: "Manali",
    city: "Manali",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
  },
  {
    title: "Modern City Apartment",
    description: "Stylish apartment located close to restaurants, shopping and nightlife.",
    price: 2800,
    location: "Bangalore",
    city: "Bangalore",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    title: "Luxury Pool Villa",
    description: "Relax in a private luxury villa featuring a beautiful swimming pool.",
    price: 7500,
    location: "Udaipur",
    city: "Udaipur",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
  },
  {
    title: "Forest Retreat",
    description: "Escape the city and enjoy a peaceful stay surrounded by nature.",
    price: 2900,
    location: "Rishikesh",
    city: "Rishikesh",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
  },
  {
    title: "Elegant Downtown Loft",
    description: "A beautifully designed loft perfect for couples and business travelers.",
    price: 3600,
    location: "Mumbai",
    city: "Mumbai",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    title: "Peaceful Lakeside Cottage",
    description: "Enjoy quiet mornings and gorgeous lake views from this cozy cottage.",
    price: 4100,
    location: "Nainital",
    city: "Nainital",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  },
  {
    title: "Luxury Hillside Home",
    description: "Spacious hillside home with panoramic views and modern interiors.",
    price: 5200,
    location: "Mussoorie",
    city: "Mussoorie",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739"
  },
  {
    title: "Tropical Paradise House",
    description: "A beautiful tropical home just minutes away from the beach.",
    price: 4800,
    location: "Kochi",
    city: "Kochi",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739"
  },
  {
    title: "Minimalist Studio",
    description: "Compact and comfortable studio with everything you need for a short stay.",
    price: 1800,
    location: "Delhi",
    city: "Delhi",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9"
  },
  {
    title: "Royal Heritage Villa",
    description: "Experience traditional architecture with modern luxury in this heritage villa.",
    price: 6800,
    location: "Jaipur",
    city: "Jaipur",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
  },
  {
    title: "Snowy Mountain Lodge",
    description: "A charming lodge offering breathtaking views of snow-covered peaks.",
    price: 3900,
    location: "Shimla",
    city: "Shimla",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739"
  },
  {
    title: "Ocean Breeze Apartment",
    description: "Modern apartment with a relaxing ocean breeze and beautiful surroundings.",
    price: 3500,
    location: "Pondicherry",
    city: "Pondicherry",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
  },
  {
    title: "Countryside Farmhouse",
    description: "Spend a relaxing weekend in this spacious countryside farmhouse.",
    price: 3300,
    location: "Dehradun",
    city: "Dehradun",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    title: "Private Beach House",
    description: "Beautiful private home with direct access to a peaceful sandy beach.",
    price: 6200,
    location: "Alibaug",
    city: "Alibaug",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
  },
  {
    title: "Modern Glass House",
    description: "Unique glass house surrounded by greenery and breathtaking landscapes.",
    price: 5900,
    location: "Lonavala",
    city: "Lonavala",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154"
  },
  {
    title: "Cozy Couple Retreat",
    description: "A romantic and comfortable stay designed especially for couples.",
    price: 2700,
    location: "Rishikesh",
    city: "Rishikesh",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    title: "Luxury Penthouse",
    description: "Premium penthouse with spacious rooms, city views and modern amenities.",
    price: 8500,
    location: "Gurgaon",
    city: "Gurgaon",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
  },
  {
    title: "Rustic Wooden Cabin",
    description: "Traditional wooden cabin offering a peaceful escape into the hills.",
    price: 3100,
    location: "Kasol",
    city: "Kasol",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8"
  },
  {
    title: "Sunset Villa",
    description: "Watch spectacular sunsets from this spacious and comfortable villa.",
    price: 5500,
    location: "Goa",
    city: "Goa",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
  },
  {
    title: "Urban Luxury Home",
    description: "Sophisticated home in the heart of the city with premium interiors.",
    price: 4700,
    location: "Hyderabad",
    city: "Hyderabad",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
  },
  {
    title: "Riverside Retreat",
    description: "Relax beside the river in this peaceful and beautifully furnished retreat.",
    price: 3400,
    location: "Rishikesh",
    city: "Rishikesh",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  },
  {
    title: "Beautiful Garden Home",
    description: "Charming home featuring a large garden and peaceful outdoor spaces.",
    price: 2600,
    location: "Haldwani",
    city: "Haldwani",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
  },
  {
    title: "Beachside Studio",
    description: "Simple and stylish studio located just steps away from the beach.",
    price: 2300,
    location: "Varkala",
    city: "Varkala",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2"
  },
  {
    title: "Himalayan View Home",
    description: "Enjoy incredible Himalayan views from this comfortable mountain home.",
    price: 4200,
    location: "Mukteshwar",
    city: "Mukteshwar",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  },
  {
    title: "Designer Apartment",
    description: "Beautiful designer apartment with premium furniture and modern facilities.",
    price: 3800,
    location: "Pune",
    city: "Pune",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    title: "Secluded Forest Cabin",
    description: "A private cabin hidden among trees, perfect for a peaceful getaway.",
    price: 3600,
    location: "Coorg",
    city: "Coorg",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739"
  },
  {
    title: "Elegant Family Villa",
    description: "Large family-friendly villa with spacious bedrooms and a private garden.",
    price: 5100,
    location: "Mysore",
    city: "Mysore",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
  },
  {
    title: "Charming Lake House",
    description: "Wake up beside the lake in this charming home surrounded by nature.",
    price: 4400,
    location: "Bhimtal",
    city: "Bhimtal",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  },
  {
    title: "Premium Beach Villa",
    description: "Spacious luxury villa with a private pool and stunning beach surroundings.",
    price: 9000,
    location: "Goa",
    city: "Goa",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
  }
];

module.exports = {sampleListings}