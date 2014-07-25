# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create(
  :email => "philpee2@gmail.com", 
  :password => "password"
)

v1 = Video.create(
  :title => "Cat In A Shark Costume Chases A Duck While Riding A Roomba",
  :ytid => "Of2HU3LGdbo"
)

v2 = Video.create(
  :title => "Corgi Flop 2012", 
  :ytid => "If875wg22ps"
)

v3 = Video.create(
  :title => "Chow Puppy Can't Get Out Of Bowl",
  :ytid => "lgLGk8Ssgsg"
)

v4 = Video.create(
  :title => "Cat Hugs Baby Kitten Having Nightmare",
  :ytid => "GzgpeLFf4z4"
)

v5 = Video.create(
  :title => "Impossibly Cute Husky Puppy: Wolfie's First Week",
  :ytid => "32yJSz9j4XY"
)

v6 = Video.create(
  :title => "cute bunny",
  :ytid => "EY-uM56BSrY"
)

v7 = Video.create(
  :title => "Cute Funny Baby Bunny Rabbit!",
  :ytid => "tVnafKAUGLQ"
)

v8 = Video.create(
  :title => "World Cutest Little Bunny Rabbit! - Lucky Latte #003",
  :ytid => "q3SnbP3j6Zg"
)

v9 = Video.create(
  :title => "Cute Kitten Playing And Sleeping | Too Cute!", 
  :ytid => "vpqA0OwtvK0"
)

catsTag = Tag.create(:name => "Cats")
dogsTag = Tag.create(:name => "Dogs")
bunniesTag = Tag.create(:name => "Bunnies")
wildlifeTag = Tag.create(:name => "Wildlife")
humansTag = Tag.create(:name => "Humans")




v2.tags.push(dogsTag)
v3.tags.push(dogsTag)
v5.tags.push(dogsTag)
v4.tags.push(catsTag)
v1.tags.push(catsTag)
v9.tags.push(catsTag)
v6.tags.push(bunniesTag)
v7.tags.push(bunniesTag)
v8.tags.push(bunniesTag)

user.my_list_videos.push(v1)
user.my_list_videos.push(v5)

