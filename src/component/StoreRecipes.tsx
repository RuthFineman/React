import axios from "axios"
import { makeAutoObservable } from "mobx"
import { RecipeFormData } from "./AddRecipe"
export type RecipeType = {
    id: number,
    title: string,
    description: string,
    authorId: number,
    ingredients: string[],
    instructions: string,
}
class StoreRecipes {
    list: RecipeType[] = []
    constructor() {
        makeAutoObservable(this)
        this.getAllRecipesawait()
    }
    async getAllRecipesawait() {
        await this.getAllRecipes()
    }
    async getAllRecipes() {
        try {
            const res = await axios.get('http://localhost:3000/api/recipes',)
            this.list = res.data
        }
        catch (e: any) {
            if (e.status == 401)
                alert(401)
            if (e.status == 400)
                alert(400)
            if (e.status == 403)
                alert(403)
        }
    }
    async addRecipe(recipe: RecipeFormData, userId: number) {
        if (!userId) {
            alert("נא להתחבר לפני הוספת מתכון");
            return;
        }
        try {
            const res = await axios.post('http://localhost:3000/api/recipes/',
                { ...recipe },
                { headers: { 'user-id': userId } }
            );

            this.list.push(res.data.recipe);
            alert("המתכון נשלח בהצלחה")
        }
        catch (e: any) {
            if (e.response?.status === 401 || e.response?.status === 403 || e.response?.status === 400) {
                alert("User Not found");
            }
            if (e.response?.status === 403) {
                alert('problem in connection');
            }
            console.error("Error adding recipe:", e.response?.data || e.message);
        }
    }
}
export default new StoreRecipes()