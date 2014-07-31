json.extract! tag, :id, :name

json.videos tag.videos do |video|
  json.id video.id
  json.title video.title
  json.ytid video.ytid
  
  json.video_taggings video.video_taggings.where(:tag_id => tag.id) do |tagging|
    json.id tagging.id
  end
end 

