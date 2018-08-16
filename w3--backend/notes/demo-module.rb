# Modules in Ruby
# or, WHAT DOES THE FOX SAY??
# https://youtu.be/jofNR_WkoCE

class Animal
  def initialize(fav_food)
    @fav_food = favorite_food
  end

  def eat(food)
    puts "Eating #{food}!"
  end

end

module Speak

  def speak(sound)
    puts "#{sound}"
  end

end

class Dog < Animal
  include Speak
end

class Cat < Animal
  include Speak
end

class Fox < Animal
end

henry = Dog.new
henry.speak("ruff")
puts "dog ancestors"
puts henry.class.ancestors

ollie = Cat.new
ollie.speak("meow")

fox = Fox.new
fox.speak("ning ning ning") # this errors!
puts "fox ancestors"
puts fox.class.ancestors