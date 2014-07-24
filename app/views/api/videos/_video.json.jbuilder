json.extract! video, :id, :title, :url

json.tags video.tags do |tag|
  json.id tag.id
  json.name tag.name
end 