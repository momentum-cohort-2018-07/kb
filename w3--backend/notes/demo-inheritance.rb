class Parent

  def say_hello
    puts "Hello from #{self}"
  end

end

class Child < Parent

  def say_hello
    super
    puts "HIIIIIII"
  end

end

puts "PARENT"
p = Parent.new
p.say_hello
# puts p.class.superclass
# puts p.class.ancestors

puts "CHILD"
c = Child.new
c.say_hello
# puts c.class.superclass
# puts c.class.ancestors
