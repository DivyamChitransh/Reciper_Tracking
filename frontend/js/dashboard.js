const API_BASE = "http://localhost:3000"; 

async function searchRecipes() {
    const query = document.getElementById("searchQuery").value;
    if (!query) {
        alert("Please enter a search term!");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/search?query=${query}`);
        if (!response.ok) throw new Error("Failed to fetch recipes.");
        
        const recipes = await response.json();
        const list = document.getElementById("recipeList");
        list.innerHTML = "";

        recipes.forEach(recipe => {
            const card = document.createElement("div");
            card.className = "recipe-card";
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}" width="100%">
                <h3>${recipe.title}</h3>
                <button onclick="getRecipeDetails(${recipe.id})">View</button>
                <button onclick="saveRecipe(${recipe.id}, '${recipe.image}', '${recipe.title}')">Save</button>
            `;
            list.appendChild(card);
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Error fetching recipes.");
    }
}

async function getRecipeDetails(id) {
    try {
        const response = await fetch(`${API_BASE}/details/${id}`);
        if (!response.ok) throw new Error("Failed to fetch recipe details.");
        
        const details = await response.json();
        alert(`Recipe: ${details.title}\nInstructions: ${details.instructions}`);
    } catch (error) {
        console.error("Error:", error);
        alert("Error fetching recipe details.");
    }
}

async function saveRecipe(recipeId, image, title) {
    try {
        const response = await fetch(`${API_BASE}/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipeId, image, title })
        });

        if (!response.ok) throw new Error("Failed to save recipe.");
        alert("Recipe saved!");
        loadSavedRecipes();
    } catch (error) {
        console.error("Error:", error);
        alert("Error saving recipe.");
    }
}

async function loadSavedRecipes() {
    try {
        const response = await fetch(`${API_BASE}/saved`);
        if (!response.ok) throw new Error("Failed to load saved recipes.");
        
        const recipes = await response.json();
        const savedList = document.getElementById("savedList");
        savedList.innerHTML = "";

        recipes.forEach(recipe => {
            const item = document.createElement("li");
            item.className = "recipe-card";
            item.dataset.id = recipe._id;
            item.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}" width="100%">
                <h3>${recipe.title}</h3>
            `;
            savedList.appendChild(item);
        });
        new Sortable(savedList, { animation: 150 });
    } catch (error) {
        console.error("Error:", error);
        alert("Error loading saved recipes.");
    }
}

async function saveReorder() {
    try {
        const orderedItems = [...document.getElementById("savedList").children].map((item, index) => ({
            _id: item.dataset.id,
            order: index
        }));

        const response = await fetch(`${API_BASE}/reorder`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderedRecipes: orderedItems })
        });

        if (!response.ok) throw new Error("Failed to reorder recipes.");
        alert("Order saved!");
    } catch (error) {
        console.error("Error:", error);
        alert("Error saving order.");
    }
}

document.addEventListener("DOMContentLoaded", loadSavedRecipes);
