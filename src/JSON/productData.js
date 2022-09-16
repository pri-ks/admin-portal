import product1  from '../assets/pictures/product1.jpg';
import product2  from '../assets/pictures/product2.jpg';
import product3  from '../assets/pictures/product3.jpg';
import product4  from '../assets/pictures/product4.jpg';
import product5  from '../assets/pictures/product5.jpg';
import product6  from '../assets/pictures/product6.jpg';

export const allProducts = {
    "data": [
        {
            "id": 1,
            "image": `${product1}`,
            "name": "Caesar Salad",
            "description": "A great Caesar salad like this one gets its swagger from cold and crisp greens, a creamy and briny dressing, and freshly made croutons.",
            "itemCategory": {
                "name" : "Salads"
            },
            "currency": "$",
            "price": 7.65
        },
        {
            "id": 2,
            "image": `${product2}`,
            "name": "Watermelon Caprese Skewers",
            "description": "These are skewers stacked with fresh watermelon, basil, mozzarella, and prosciutto, then drizzled with the best balsamic glaze.",
            "itemCategory": {
                "name" : "Appetizers"
            },
            "currency": "$",
            "price": 5.25
        },
        {
            "id": 3,
            "image": `${product3}`,
            "name": "Mexican Pizza",
            "description": "A delicious corn tortillas topped with beans, beef and all the delicious taco toppings you can imagine!",
            "itemCategory": {
                "name" : "Pizzas"
            },
            "currency": "$",
            "price": 13.58
        },
        {
            "id": 4,
            "image": `${product4}`,
            "name": "Zucchini-Parmesan Cheese Fritters",
            "description": "Eat these easy bite-sized zucchini Parmesan cheese fritters for a healthy snack any time of the day!",
            "itemCategory": {
                "name" : "Appetizers"
            },
            "currency": "$",
            "price": 7.50
        },
        {
            "id": 5,
            "image": `${product5}`,
            "name": "Chocolate Protein Balls",
            "description": "Delicious protein balls using chocolate protein powder, natural peanut butter, oats, and seeds. These energy balls are perfect for after-school snacking!",
            "itemCategory": {
                "name" : "Appetizers"
            },
            "currency": "$",
            "price": 6.21
        },
        {
            "id": 6,
            "image": `${product6}`,
            "name": "Margherita Pizza",
            "description": "This pizza is a thin-crust Naples-style pizza topped with tomato sauce, fresh mozzarella, basil leaves, and Parmigiano-Reggiano.",
            "itemCategory": {
                "name" : "Pizzas"
            },
            "currency": "$",
            "price": 14
        }
    ]
}
