import {useForm,Controller} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useVehicles } from '../../context/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

const carSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(100, 'Name cannot exceed 100 characters')
    // .test('unique-name', 'Name must be unique', (value, context) => {
    //   const { cars } = this.options.context as { cars: Car[] }; 
    //   return cars.every((car: { name: string; }) => car.name !== value)});
     ,
  model: yup
    .string()
    .required('Model is required')
    .max(100, 'Model cannot exceed 100 characters'),
  yearOfRelease: yup
    .number()
    .required('Year of Release is required')
    .min(2001, 'Year of Release must be greater than 2000'),
  brand: yup
    .string()
    .required('Brand is required')
    .max(100, 'Brand cannot exceed 100 characters'),
  color: yup.string().required('Color is required'),
});

export default function CarDetailView() {
  const { cars, setCars } = useVehicles();
  const navigate = useNavigate();
  const { id } = useParams();
const isEditMode = Boolean(id);
const currentCar = isEditMode ? cars[parseInt(id as string, 10) - 1] : null;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: currentCar || {
      name: '',
      model: '',
      yearOfRelease:0 ,
      brand: '',
      color: '',
    },
    resolver: yupResolver(carSchema, { context: { cars } }),
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    if (isEditMode) {
      const updatedCars = cars.map((car, index) => (index === parseInt(id as string, 10) - 1 ? data : car));
      setCars(updatedCars);
    } else {
      setCars([...cars, data]);
    }
    navigate('/cars');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? 'Update Car Details' : 'Create Car'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'grid', gap: 2, maxWidth: 500 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Model"
                error={!!errors.model}
                helperText={errors.model?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="yearOfRelease"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Year of Release"
                type="number"
                error={!!errors.yearOfRelease}
                helperText={errors.yearOfRelease?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Brand"
                error={!!errors.brand}
                helperText={errors.brand?.message}
                fullWidth
              />
            )}
          />
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Color"
                error={!!errors.color}
                helperText={errors.color?.message}
                fullWidth
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
          >
            {isEditMode ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}