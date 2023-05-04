db = db.getSiblingDB('recipeDB')
if(db.getCollection("customerCollection"))
	db.getCollection("customerCollection").drop()
db.createCollection('customerCollection')
collection = db.getCollection("customerCollection")
collection.insertOne(
{
    username: "nutsrbad",
    password: "khwoo",
    userID: "123fasdex",
    name:"Tiff",
    email:"nutsrbad@email.com",
    allergy:["Peanut","Cashew","Banana","Almond","Coconut"]
}
)
collection.insertOne(
{
    username: "supersonic22",
    password: "123456",
    userID: "456wecds",
    name:"Jeffie B",
    email:"supersonic22@email.com",
    allergy:["Milk"]
}
)
collection.insertOne(
{
    username: "NOALLERGIES!",
    password: "ab@1al",
    userID: "32i4joisz",
    name:"morgan",
    email:"morganF@email.com",
    allergy:[]
}
)