import axios from 'axios';

const API_BASE_URL = 'https://api.spoonacular.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: "c70f2d4cca50405da595b2a8dfd387ff",
  },
});

export const searchRecipes = (query) => {
  return apiClient.get('/recipes/complexSearch', { params: { query } });
};

export const getRecipeDetails = (id) => {
  return apiClient.get(`/recipes/${id}/information`);
};
