import category1  from '../assets/pictures/category1.jpg';
import category2  from '../assets/pictures/category2.jpg';
import category3  from '../assets/pictures/category3.jpg';

export const categoryList = {
    "data": [
        {
            "id" : 1,
            "name": "Pizzas"
        },
        {
            "id" : 2,
            "name": "Salads"
        },
        {
            "id" : 3,
            "name": "Appetizers"
        }
    ]
}

export const allCategories = {
    "data": [
        {
            "id": 1,
            "image": `${category1}`,
            "name": "Pizzas",
            "description": "A great number of pizza varieties exist, defined by the choice of toppings and sometimes also crust."
        },
        {
            "id": 2,
            "image": `${category2}`,
            "name": "Salads",
            "description": "A cold dish of various mixtures of raw or cooked vegetables, usually seasoned with oil, vinegar, or other dressing."
        },
        {
            "id": 3,
            "image": `${category3}`,
            "name": "Appetizers",
            "description": "Typically smaller than a main dish, an appetizer is often designed to be eaten by hand."
        }
    ]
}
