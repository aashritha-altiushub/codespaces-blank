import { useForm, Controller, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useVehicles } from '../../context/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

const truckSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(100, 'Name cannot exceed 100 characters'),
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
  permits: yup
    .array()
    .of(
      yup.object().shape({
        permit_no: yup.string().required('Permit number is required'),
        state: yup.string().required('State is required'),
      })
    )
    .min(1, 'At least one permit is required'),
});

export default function TruckDetailView() {
  const { trucks, setTrucks } = useVehicles();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const currentTruck = isEditMode ? trucks[parseInt(id as string, 10) - 1] : null;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: currentTruck || {
      name: '',
      model: '',
      yearOfRelease: 0,
      brand: '',
      permits: [{ permit_no: '', state: '' }],
    },
    resolver: yupResolver(truckSchema),
    mode: 'onChange',
  });

  const {
    fields: permitFields,
    append: appendPermit,
    remove: removePermit,
  } = useFieldArray({
    control,
    name: 'permits',
  });

  const onSubmit = (data: any) => {
    if (isEditMode) {
      const updatedTrucks = trucks.map((truck, index) => (index === parseInt(id as string, 10) - 1 ? data : truck));
      setTrucks(updatedTrucks);
    } else {
      setTrucks([...trucks, data]);
    }
    navigate('/trucks');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEditMode ? 'Update Truck Details' : 'Create Truck'}
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
          {/* Permit Fields */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Permits
          </Typography>
          {permitFields.map((field, index) => (
            <Box key={field.id} sx={{ display: 'grid', gap: 2 }}>
              <Controller
                name={`permits.${index}.permit_no` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Permit Number"
                    error={!!errors.permits?.[index]?.permit_no}
                    helperText={errors.permits?.[index]?.permit_no?.message}
                    fullWidth
                  />
                )}
              />
              <Controller
                name={`permits.${index}.state` as const}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    error={!!errors.permits?.[index]?.state}
                    helperText={errors.permits?.[index]?.state?.message}
                    fullWidth
                  />
                )}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => removePermit(index)}
                sx={{ alignSelf: 'flex-start' }}
              >
                Delete Permit
              </Button>
            </Box>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => appendPermit({ permit_no: '', state: '' })}
            sx={{ marginTop: 2 }}
          >
            Add Permit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid}
            sx={{ marginTop: 2 }}
          >
            {isEditMode ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
