import { Box, Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useVehicles } from '../../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit'

export default function CarList() {
  const { cars } = useVehicles();
  const navigate = useNavigate();
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'yearOfRelease', headerName: 'Year', width: 130 },
    { field: 'brand', headerName: 'Brand', width: 130 },
    { field: 'color', headerName: 'Color', width: 130},
    {
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <IconButton
            color="primary"
            onClick={() => navigate(`/cars/update/${params.row.id}`)}
            size="small"
          >
            <ModeEditIcon/>
          </IconButton>
        ),
      }
  ];

  const rows = cars.map((car, index) => ({
    id: index + 1,
    ...car
  }));

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', width: '100%', p: 2 }}>
      <Box sx={{display:'flex',justifyContent:'flex-end',mb:2}}>
        <Button
          variant='contained'
          onClick={()=>navigate('/cars/create')}>
            Add Car
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
