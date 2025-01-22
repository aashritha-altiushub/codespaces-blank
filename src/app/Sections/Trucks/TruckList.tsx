import { Box,Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useVehicles } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit'

export default function TruckList() {
  const { trucks } = useVehicles();
  const navigate = useNavigate();
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 170 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'yearOfRelease', headerName: 'Year', width: 130 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'states', headerName: 'Permitted States', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => navigate(`/trucks/update/${params.row.id}`)}
          size="small"
        >
          <ModeEditIcon/>
        </IconButton>
      ),
    }
  ];

  const rows = trucks.map((truck, index) => ({
    id: index + 1,
    name: truck.name,
    model: truck.model,
    yearOfRelease: truck.yearOfRelease,
    brand: truck.brand,
    states: truck.permits.map(p => p.state).join(', ')
  }));

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100%', p: 2 }}>
      <Box sx={{display:'flex',justifyContent:'flex-end',mb:2}}>
        <Button
          variant='contained'
          onClick={()=>navigate('/cars/create')}>
            Add Truck
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
     
        disableRowSelectionOnClick
      />
    </Box>
  );
}