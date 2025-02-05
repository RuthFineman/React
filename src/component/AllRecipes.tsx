import { observer } from "mobx-react"
import Recipes from "./StoreRecipes"
import { Link, Outlet } from "react-router-dom"
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material"
import { grey, pink } from "@mui/material/colors"

export default observer(() => {
    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    right: 50,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: grey[100],
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    width: '200px',
                    maxHeight: '80%',
                    overflowY: 'auto'
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: '15px', fontWeight: 'bold', color: pink[300] }}>
                    רשימת מתכונים
                </Typography>
                <List>
                    {Recipes.list.map(t => (
                        <ListItem
                            key={t.id}
                            sx={{
                                marginBottom: '12px',
                                padding: '8px',
                                borderBottom: `1px solid ${grey[300]}`,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: grey[200],
                                borderRadius: '8px',
                                "&:hover": {
                                    backgroundColor: pink[50],
                                }
                            }}
                        >
                            <Link
                                to={`/AllRecipe/${t.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: grey[900],
                                    fontWeight: '500'
                                }}
                            >
                                <ListItemText primary={t.title} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Outlet />
        </>
    )
})
