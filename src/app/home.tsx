import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { MyTabs } from '@/components/Tabs';

interface Location {
  id: number;
  name: string;
  type: string;
  residents: string[];
}

interface Resident {
  id: number;
  name: string;
  status: string;
  image: string;
}

const Home: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchLocations();
  }, []);

  // const fetchLocations = async () => {
  //   try {
  //     const response = await fetch('https://rickandmortyapi.com/api/location');
  //     const data = await response.json();
  //     setLocations(data.results);
  //     console.error('confirming id existence',data.results);

  //   } catch (error) {
  //     console.error('Error fetching locations:', error);
  //   }
  // };


  const fetchLocations = async () => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/location');
    const data = await response.json();
    // Ensure each location object has an id property
    const locationsWithId: Location[] = data.results.map((location: Location, index: number) => ({
      ...location,
      id: location.id, 
    }));
    console.log("confirming id existence",locationsWithId);
    setLocations(locationsWithId);
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
};


  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Rick and Morty</h1>
      <MyTabs />
      <input
        type="text"
        placeholder="Search locations..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="w-full p-2 border rounded-md mb-4 mt-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredLocations.map(location => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
};

interface LocationCardProps {
  location: Location;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const [showAllResidents, setShowAllResidents] = useState<boolean>(false);
  const firstFiveResidents = location.residents.slice(0, 5);
  const remainingResidents = location.residents.slice(5);

  const toggleShowAllResidents = () => {
    setShowAllResidents(!showAllResidents);
  };

  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg transition duration-300">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{location.name}</h2>
        <p className="text-gray-600">Type: {location.type}</p>
        <h3 className="font-bold mt-2">Residents:</h3>
        <ul>
          {showAllResidents ? (
            location.residents.map(residentUrl => (
              <Resident key={residentUrl} residentUrl={residentUrl} />
            ))
          ) : (
            firstFiveResidents.map(residentUrl => (
              <Resident key={residentUrl} residentUrl={residentUrl} />
            ))
          )}
        </ul>
        {location.residents.length > 5 && (
          <button onClick={toggleShowAllResidents} className="text-blue-500 mt-2 focus:outline-none">
            {showAllResidents ? 'View Less' : 'View More'}
          </button>
        )}
      </div>
    </div>
  );
};


interface ResidentProps {
  residentUrl: string;
}

const Resident: React.FC<ResidentProps> = ({ residentUrl }) => {
  const [resident, setResident] = useState<Resident | null>(null);

  useEffect(() => {
    const fetchResident = async () => {
      try {
        const response = await fetch(residentUrl);
        const data = await response.json();
        const residentId = data.id;
        console.log("still confirming id existence",residentId);
        setResident({ ...data, id: residentId }); 
      } catch (error) {
        console.error('Error fetching resident:', error);
      }
    };
  
    fetchResident();
  }, [residentUrl]);

  if (!resident) return null;

  return (
    <Link href="/resident/[id]" as={`/resident/${resident.id}`}>
      <div className="cursor-pointer">
        <li className="flex items-center space-x-4">
          <img src={resident.image} alt={resident.name} className="h-10 w-10 rounded-full" />
          <div>
            <p className="text-lg font-medium">{resident.name}</p>
            <p className="text-gray-500"> status: {resident.status}</p>
          </div>
        </li>
      </div>
    </Link>
  );
};
    

export default Home;
