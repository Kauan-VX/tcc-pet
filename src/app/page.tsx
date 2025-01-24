'use client';
import { redirect } from 'next/navigation';

const Home = () => {
  return redirect('/login');
};

export default Home;
