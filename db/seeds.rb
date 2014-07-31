# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


v1 = Video.create(
  :title => "Cat in a Shark Costume Rides a Roomba",
  :ytid => "Of2HU3LGdbo"
)

v2 = Video.create(
  :title => "Corgi Flop 2012", 
  :ytid => "If875wg22ps"
)

v3 = Video.create(
  :title => "Chow Puppy Can't Get Out of Bowl",
  :ytid => "lgLGk8Ssgsg"
)

v4 = Video.create(
  :title => "Cat Hugs Baby Kitten Having Nightmare",
  :ytid => "GzgpeLFf4z4"
)

v5 = Video.create(
  :title => "Impossibly Cute Husky Puppy",
  :ytid => "32yJSz9j4XY"
)

v6 = Video.create(
  :title => "Cute Bunny",
  :ytid => "EY-uM56BSrY"
)

v7 = Video.create(
  :title => "Cute Funny Baby Bunny Rabbit!",
  :ytid => "tVnafKAUGLQ"
)

v8 = Video.create(
  :title => "World Cutest Little Bunny Rabbit!",
  :ytid => "q3SnbP3j6Zg"
)

v9 = Video.create(
  :title => "Cute Kitten Playing and Sleeping", 
  :ytid => "vpqA0OwtvK0"
)

v10 = Video.create(
  :title => "Dogs vs. Citrus", 
  :ytid => "RCRNJfvfEfg"
)

v11 = Video.create(
  :title => "Chow Puppy Can't Jump", 
  :ytid => "CORZYXxVrzY"
)

v12 = Video.create(
  :title => "Cutest Puppies Ever Seen on Video", 
  :ytid => "RCNdSc8_qF4"
)

v13 = Video.create(
  :title => "Puppies on Slides", 
  :ytid => "x0wiy7KrJzM"
)

v14 = Video.create(
  :title => "Cookie the Little Penguin", 
  :ytid => "3wTWWjYTe1I"
)

v15 = Video.create(
  :title => "Red Panda Does Pull-Ups", 
  :ytid => "V4RX15cxI28"
)

v16 = Video.create(
  :title => "Cute Pandas Playing on the Slide", 
  :ytid => "sGF6bOi1NfA"
)

v17 = Video.create(
  :title => "Kittens in Boot", 
  :ytid => "HHEBAIpRl4s"
)

v18 = Video.create(
  :title => "Sleeping Dogs Compliation", 
  :ytid => "dtoty6IC0X0"
)

v19 = Video.create(
  :title => "The Most Intense Taekwondo Fight Ever",
  :ytid => "CAP-Xj4Fz18"
)

v20 = Video.create(
  :title => "Cute Puppies Going Down Stairs Compilation",
  :ytid => "Xo8PwVDI1v0"
)

v21 = Video.create(
  :title => "Push Up Puppy",
  :ytid => "JXBZ_XhZXU4"
)

v22 = Video.create(
  :title => "Tiny Kitten Drinks Milk",
  :ytid => "HtWixLbDNPg"
)

v23 = Video.create(
  :title => "Cute Kitten Chases Washing Machine",
  :ytid => "kBEillmUckk"
)

v24 = Video.create(
  :title => "Fluffy Kitten is Confused",
  :ytid => "HECa3bAFAYk"
)

v25 = Video.create(
  :title => "Kittens on a Slide",
  :ytid => "gppbrYIcR80"
)

v26 = Video.create(
  :title => "Cute Munchkin Baby Kitten Talks Too Much",
  :ytid => "YZs3EADi2pQ"
)

v27 = Video.create(
  :title => "Cute Baby Monkey Eating",
  :ytid => "hmtx2tFQ69E"
)

v28 = Video.create(
  :title => "Baby Twins Dancing to Daddy's Guitar",
  :ytid => "to7uIG8KYhg"
)

v29 = Video.create(
  :title => "5 Day Old Puppies on Tiny Couches",
  :ytid => "vvK7D30Qiko"
)

v30 = Video.create(
  :title => "Baby Eating a Watermelon", 
  :ytid => "mqxzvImBqNw"
)

v31 = Video.create(
  :title => "Corgi Pup Struggles to Exit Tent", 
  :ytid => "DFVAylcYrQY"
)

v32 = Video.create(
  :title => "Dancing Otter", 
  :ytid => "LClXK59VP0Q"
)

v33 = Video.create(
  :title => "Sadie doesn't want her brother to grow up",
  :ytid => "84DLT4yRcy4"
)



catsTag = Tag.create(:name => "Cats")
dogsTag = Tag.create(:name => "Dogs")
bunniesTag = Tag.create(:name => "Bunnies")
wildlifeTag = Tag.create(:name => "Wildlife")
humansTag = Tag.create(:name => "Hoomanz")

[v2, v3, v5, v18, v11, v12, v13, v20, v21, v29, v31].each do |v|
  v.tags.push(dogsTag)
end 

[v4, v1, v9, v17, v22, v23, v24, v25, v26].each do |v|
  v.tags.push(catsTag)
end

[v6, v7, v8].each do |v| 
  v.tags.push(bunniesTag)
end 

[v14, v15, v16, v27, v32].each do |v|
  v.tags.push(wildlifeTag)
end

[v19, v28, v30, v33].each do |v|
  v.tags.push(humansTag)
end 

