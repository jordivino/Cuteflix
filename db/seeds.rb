# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

v1 = Video.create(
  :title => "Cat In A Shark Costume Chases A Duck While Riding A Roomba",
  :url => "https://www.youtube.com/watch?v=Of2HU3LGdbo"
)

v2 = Video.create(
  :title => "Corgi Flop", 
  :url => "https://www.youtube.com/watch?v=glii-kazad8"
)

v3 = Video.create(
  :title => "Chow Puppy Can't Get Out Of Bowl",
  :url => "https://www.youtube.com/watch?v=lgLGk8Ssgsg"
)

v4 = Video.create(
  :title => "Cat Hugs Baby Kitten Having Nightmare",
  :url => "https://www.youtube.com/watch?v=GzgpeLFf4z4"
)

v5 = Video.create(
  :title => "Impossibly Cute Husky Puppy: Wolfie's First Week",
  :url => "https://www.youtube.com/watch?v=32yJSz9j4XY"
)

dogsTag = Tag.create(:name => "Dogs")
catsTag = Tag.create(:name => "Cats")
bunniesTag = Tag.create(:name => "Bunnies")
wildlifeTag = Tag.create(:name => "Wildlife")
humansTag = Tag.create(:name => "Humans")



v1.tags.push(catsTag)
v2.tags.push(dogsTag)
v3.tags.push(dogsTag)
v4.tags.push(catsTag)
v5.tags.push(dogsTag)

