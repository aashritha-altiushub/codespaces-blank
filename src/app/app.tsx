import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { VehicleProvider } from './context/ContextProvider';
import Home from './Sections/Home';
import CarDetailView from './Sections/Cars/CarDetails';
import CarList from './Sections/Cars/CarList';
import TruckList from './Sections/Trucks/TruckList';
import TruckDetailView from './Sections/Trucks/TruckDetails';


export function App() {
  return (
    <BrowserRouter>
    <VehicleProvider>
      <Routes>
        <Route path='/' element={<Home/>} >
        <Route path='/cars' element={<CarList/>}/>
        <Route path="/cars/create" element={<CarDetailView />} />
        <Route path="/cars/update/:id" element={<CarDetailView />} />
        <Route path='/trucks' element={<TruckList/>}/>
        <Route path="/trucks/create" element={<TruckDetailView/>} />
        <Route path="/trucks/update/:id" element={<TruckDetailView />} />
        </Route>
      </Routes>
      </VehicleProvider>
    </BrowserRouter>
  );
}

export default App;

