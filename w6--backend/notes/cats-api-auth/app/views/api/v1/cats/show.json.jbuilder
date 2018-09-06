# json.id @cat.id
# json.name @cat.name
# json.breed @cat.breed
# json.registry @cat.registry

json.links do
  json.self api_v1_cat_url(@cat)
  json.list api_v1_cats_url
  json.update do
    json.method "PUT"
    json.href api_v1_cat_url(@cat)
  end
  json.delete do
    json.method "DELETE"
    json.href api_v1_cat_url(@cat)
  end
end
json.data do
  json.id @cat.id
  json.attributes do
    json.name @cat.name
    json.breed @cat.breed
    json.registry @cat.registry
  end