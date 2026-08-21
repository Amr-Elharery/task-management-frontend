import { Routes, Route } from 'react-router';
import Layout from './components/layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
    </Routes>
  );
}
