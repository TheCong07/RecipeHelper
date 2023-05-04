db = db.getSiblingDB('recipeDB')
if(db.getCollection("recipeListCollection"))
	db.getCollection("recipeListCollection").drop()
db.createCollection('recipeListCollection')
collection = db.getCollection("recipeListCollection")
collection.insertMany([
    {   
        listID: "1a12341fe",
        userID: "123fasdex",
        listName:" My Summer Treats",
        dateCreate:"2-9-2023",
        description:"Cool treats for busy peeps!",
        recipes:
        [
            "https://cooking.nytimes.com/recipes/1016605-the-only-ice-cream-recipe-youll-ever-need",
            "https://www.tasteofhome.com/recipes/homemade-vanilla-ice-cream/",
            "https://barefeetinthekitchen.com/homemade-ice-cream-recipe/",
        ]
    },
    {
        listID: "23ra23413",
        userID: "123fasdex",
        listName:"My Pasta",
        dateCreate:"1-2-2020",
        description:"tasty",
        recipes: 
        [
            "https://www.inspiredtaste.net/38940/spaghetti-with-meat-sauce-recipe/",
            "https://www.foodiecrush.com/my-moms-homemade-spaghetti-and-meat-sauce-recipe/",
        ],
    },
    {
        listID: "123g3234",
        userID: "32i4joisz",
        listName:"Best breads", 
        dateCreate:"10-9-2006", 
        description:"the best",
        recipes:
        [
            "https://sallysbakingaddiction.com/homemade-artisan-bread/",
            "https://tastesbetterfromscratch.com/bread-recipe/"
        ],
    },
    {
        listID: "5aafz345",
        userID: "32i4joisz",
        listName:"PizzaPizzaPizza", 
        dateCreate:"10-9-2025",
        description:"Everything pizza!",
        recipes:
        [
            "https://thefoodcharlatan.com/homemade-pizza-recipe/",
            "https://www.simplyrecipes.com/recipes/homemade_pizza/"
        ]
    }

])