json.extract! tag, :id, :name

json.videos tag.videos do |video|
  json.id video.id
  json.title video.title
  json.ytid video.ytid
end 