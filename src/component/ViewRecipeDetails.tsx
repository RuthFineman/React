import StoreRecipes from "./StoreRecipes"
import { useParams } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { grey, pink } from "@mui/material/colors"

const ViewRecipeDetails = () => {
    const { id } = useParams()
    let recipe = StoreRecipes.list.find(r => Number(id) === r.id)

    return (
        <Box
            sx={{
                position: 'absolute',
                left: '40%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                bgcolor: grey[100],
                borderRadius: '12px',
                boxShadow: 3,
                width: '60%',
                textAlign: 'center',
                minWidth: '300px'
            }}
        >
            {recipe && (
                <>
                    <Typography variant="h4" sx={{ marginBottom: '15px', color: pink[300] }}>{recipe?.title}</Typography>
                    <Typography variant="body1" sx={{ marginTop: '10px', fontWeight: 'bold' }}><strong>מחבר:</strong> {recipe?.authorId}</Typography>
                    <Typography variant="body2" sx={{ marginTop: '10px' }}><strong>תיאור:</strong> {recipe?.description}</Typography>
                    <Typography variant="body2" sx={{ marginTop: '10px' }}><strong>מרכיבים:</strong> {recipe?.ingredients}</Typography>
                    <Typography variant="body2" sx={{ marginTop: '10px' }}><strong>הוראות הכנה:</strong> {recipe?.instructions}</Typography>
                </>
            )}
        </Box>
    )
}

export default ViewRecipeDetails
