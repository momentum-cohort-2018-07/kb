# METHODS

def greet_world
  # this method has side effects
  # something happens when it runs
  # it does not have a return value
  puts "Hello World!"
end

def greeting
  # this has a return value
  # it returns a string
  # it has no side effects
  "Hello World!"
end

def greet(name)
  puts "Hello, #{name}!"
end

greet("Sadie")

def fancy_greet(name, day)
  puts "Hello, #{name}! Happy #{day}!"
end

fancy_greet("Jack", "Monday")

# CONDITIONALS

x = 2

# if expression not unlike you're used to in JS
# but note that it needs an end keyword, and no curly brackets
if x == 1
  color = "green"
elsif x  == 2
  color = "red"
elsif x == 3
  color = "yellow"
end

# you can also save the result to a variable
result =  if x == 1
            "green"
          elsif x  == 2
            "red"
          elsif x == 3
            "yellow"
          end

puts result

# unless is another keyword you'll see for conditionals in Ruby
# it is basically the opposite of "if"
# always do this thing, except if this condition is true...then don't do it

unless !condition
 puts "what is happening?"
end

# ternary operators are another way of expressing conditional flow
# the structure of the syntax is:
# _condition_to_evaluate_ ? _do_this_if_true : _but_if_false_do_this
languages = [:elixir, :python, :javascript]
puts !(languages.include?(:ruby) ? "You appear to be missing Ruby" :  "Oh good, you have all my favs.")


# BLOCKS AND ITERATORS

5.times do
  puts "Hello!"
end

5.times { puts "Hello" }

# I can write this on a single line
1.upto(10) { |x| puts x }

# Or, the same thing on multiple lines
1.upto(10) do |x|
  puts x
end

array = [2, 4, 6, 8, 10]
array.map { |num| num * num }
# this returns a new array: [4, 16, 36, 64, 100]

# same method on multiple lines:
array.map do |num|
  num * num
end


# VARIABLES

$count = 0 # this sets a global variable
# global variables start with a $

def counter_with_global_var
  score = 0
  while $count <= 10
    puts $count
    $count += 1
  end
end

puts "Here is the global variable:"
puts $count # note its value here

puts "Method is called"
counter_with_global_var # run the method, which changes the global variable's value

puts "and here is the gloabl variable $count after method runs:"
puts $count # note its value here

# here we use only local variables
def counter_with_local_var
  count = 0
  while count <= 10
    puts count
    count += 1
  end
end

count # throws Error
counter_with_local_var # method runs, doesn't change any global variables