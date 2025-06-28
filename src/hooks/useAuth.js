
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const values = useContext(AuthContext);
  if (!values) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return values;
}
