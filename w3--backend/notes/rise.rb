# RISE: Principles for OO Design
# Replicate existing interfaces
# Isolate side effects
# Single responsibility for classes
# Easily testable

# breaking the single responsibility principle

class Employee
  def initialize(name)
    @name = name
  end

  def payroll_report
    # prints off a payroll report
  end
end


# side effects - bad

class Game
  def initialize
    puts "Welcome to my game!"
    @random = rand(100) + 1
  end
end

Game.new

# side effects - good

class Game
  def initialize
    @random = rand(100) + 1
  end

  def run
    puts "Welcome to my game!"
  end
end

game = Game.new
game.run


# existing interfaces - bad

class Person
  def initialize(name)
    @name = name
  end

  # to_s doesn't normally take an argument
  def to_s(title)
    "#{title} #{@name}"
  end
end

Person.new("Bill").to_s("Mr.")


# existing interfaces - bad

class Person
  def initialize(title, name)
    @title = title
    @name = name
  end

  # this method is normally called to_s
  def string
    "#{@title} #{@name}"
  end
end

Person.new("Mr.", "Bill").string

# existing interfaces - good

class Person
  def initialize(title, name)
    @title = title
    @name = name
  end

  def to_s
    "#{@title} #{@name}"
  end
end

Person.new("Mr.", "Bill").to_s

# Not easily testable

class Game
  def initialize
    @random = rand(100) +1
  end

  # rest of game logic here
end

# if I wanted to write a test that sent a guess to the Game,
# and I wanted to test whether it responded "too high" or
# "too low", how I would I do that?

# Easily testable

class Game
  def initialize(number_to_guess)
    @number_to_guess = number_to_guess
  end

  # rest of game logic here
end

Game.new(rand(100) + 1)

# if I wanted to write a test that sent a guess to the Game,
# and I wanted to test whether it responded "too high" or
# "too low", how I would I do that?
