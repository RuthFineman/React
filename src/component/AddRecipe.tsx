import { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, IconButton, Box, Container, Typography, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink, grey } from '@mui/material/colors';
import { UserContext } from './Homee';
import StoreRecipes from './StoreRecipes';
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  ingredients: yup.array().of(yup.string().required('Ingredient is required')),
  instructions: yup.string().required('Instructions are required'),
});
export interface RecipeFormData {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
}
const AddRecipe = () => {
  const context = useContext(UserContext);
  const { control, handleSubmit, reset } = useForm<RecipeFormData>({
    resolver: yupResolver(schema),
    defaultValues: { title: '', description: '', ingredients: [''], instructions: '' },
  });
  const onSubmit = async (data: RecipeFormData) => {
    const { title, description, ingredients, instructions } = data;
      await StoreRecipes.addRecipe({ title, description, ingredients, instructions }, context?.user.id);
      reset();
  };
  const [ingredients, setIngredients] = useState(['']);
  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };
  return (
    <Container
      maxWidth="sm"
      style={{ marginTop: '20px', backgroundColor: grey[100], padding: '20px', borderRadius: '8px' }}
    >
      <Typography variant="h4" gutterBottom align="center" color={pink[300]}>
        🍽️ Add a New Recipe 🍽️
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller name="title" control={control}
          render={({ field, fieldState }) => (
            <TextField {...field} label="Title" fullWidth margin="normal" variant="outlined" error={!!fieldState.error} helperText={fieldState.error ? fieldState.error.message : ''}
            />)} />
        <Controller name="description" control={control}
          render={({ field, fieldState }) => (
            <TextField {...field} label="Description" fullWidth margin="normal" variant="outlined" error={!!fieldState.error} helperText={fieldState.error ? fieldState.error.message : ''}
            />)} />
        <Box marginBottom={2}>
          <Typography variant="h6" color={pink[300]}>
            Ingredients 🥗
          </Typography>
          {ingredients.map((ingredient, index) => (
            <Grid container spacing={1} key={index} alignItems="center" marginBottom={2}>
              <Grid item xs={10}>
                <Controller name={`ingredients.${index}`} control={control}
                  render={({ field, fieldState }) => (
                    <TextField {...field} value={ingredient}
                      onChange={(e) => {
                        handleIngredientChange(index, e.target.value);
                        field.onChange(e);
                      }}
                      label={`Ingredient ${index + 1}`} fullWidth
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error ? fieldState.error.message : ''}
                    />)} />
              </Grid> <Grid item xs={2}>
                <IconButton onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={addIngredient} style={{ marginTop: '10px', color: pink[300], borderColor: pink[300] }}>Add Ingredient </Button>
        </Box>
        <Controller name="instructions" control={control}
          render={({ field, fieldState }) => (
            <TextField {...field} label="Instructions" multiline rows={4} fullWidth margin="normal" variant="outlined" error={!!fieldState.error} helperText={fieldState.error ? fieldState.error.message : ''}
            />)} />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px', backgroundColor: pink[300] }}>
          Submit
        </Button> </form>  </Container>
  );
};
export default AddRecipe;
