db = db.getSiblingDB('admin')
db.createUser(
{
	user: "dbAdmin", 
	pwd: "recipe",
	roles: [ "readWriteAnyDatabase", "dbAdminAnyDatabase", "clusterAdmin"]	
}
)