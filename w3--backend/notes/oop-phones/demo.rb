# we need to tell this file, which we intend to run, where to find the classes we use here
require_relative 'phone'
require_relative 'person'

# instantiate a new phone and save to a variable
# We need to pass in two arguments for model and ringtone,
# because the class's intialize method expects those arguments
iphone = Phone.new("iPhone", "X", "Mambo No. 5")

# instantiate a new person and save to a variable
# We need to pass in a name and a phone
kate = Person.new("Kate", iphone)

puts "I can access the phone's model here:"
puts iphone.model

# puts iphone.make
# puts iphone.model
# puts iphone.ringtone

puts "Here I am calling the ring method:"
puts iphone.ring

puts "Here I am trying to access the instance variable @ringtone:"
puts iphone.ringtone
puts "Here is kate:"
puts kate
puts "Here is kate.phone:"
puts kate.phone

puts "Here is kate's phone's make"
puts kate.phone.make

puts "Kate's phone is dialing:"
puts kate.phone.call("919-259-9876")