json.array! @cats do |cat|
  json.extract! cat, :id, :name, :breed
end