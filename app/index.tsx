import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { getToken } from '../utils/token';



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    getToken().then(token => {
      setIsAuthenticated(!!token);
    });
  }, []);

  if (isAuthenticated === null) return null;
  return(
  <Redirect href={isAuthenticated ? '/Planning' : '/LoginScreen'} />
  );
}

