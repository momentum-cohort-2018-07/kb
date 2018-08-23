# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

1000.times do
  User.create!(name: Faker::Name.name, email: Faker::Internet.email, phone: Faker::PhoneNumber.phone_number)
end

500.times do
  Book.create!(title: Faker::Book.title, author: Faker::Book.author, genre: Faker::Book.genre)
end

# 2000.times do
#   PhoneNumber.create!(person_id: rand(1000)+1,
#       phone_type: ["Mobile", "Home", "Work"].sample,
#       phone_number: Faker::PhoneNumber.phone_number)
#   EmailAddress.create!(person_id: rand(1000)+1,
#       email_address: Faker::Internet.email)
# end