db = db.getSiblingDB('recipeDB')
db.createCollection('reciperListDB')
listsCollection = db.getCollection("recipeListDB")
listsCollection.remove({})

listsCollection.insert(
    {
        listID: "001",
        listName: "Baking Recipe",
        dateCreate: "Feb 2nd 2013",
        description: "For all your baking needs"
    }
)

listsCollection.insert(
    {
        listID: "002",
        listName: "Stew stuff",
        dateCreate: "March 14th 2016",
        description: "Stew it up"
    }
)

listsCollection.insert(
    {
        listID: "003",
        listName: "My recipe",
        dateCreate: "August 24th 2020",
        description: "Meals for Josh"
    }
)