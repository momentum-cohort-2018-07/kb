# We can refactor our procedural ruby code to use OOP
# First we define the game class

class NumberGuessingGame

  def initialize(number)
    @number = number
  end

  def run
    # here I'm calling other methods I've defined in this class
    # the order in which I call them form the sequence of gameplay
    opening_greeting
    capture_guess
    evaluate_guess
  end

  def opening_greeting
    puts "Hello there! I've selected a number between 1 and 50. Can you guess what it is?"
    puts "Type your guess."
  end

  def capture_guess
    # here we use the gets method to capture what the user types
    # we store it in an instance variable so we can have access to it
    # anywhere inside a game instance, meaning that
    # we can reuse it in any other instance method that we define in this class
    @guess = gets.chomp.to_i
  end

  def evaluate_guess
    # If the guess is too low, tell the user to guess again.
    while @guess != @number
      if @guess > 50
        puts "Nope, has to be between 1 and 50. Try again."
      elsif @guess < @number
        puts "Too low. Guess again."
      elsif @guess > @number
        puts "Too high. Guess again."
      end
      # Capture the next guess inside the loop
      # Happily, we have a method we can call to do that!
      capture_guess
      # This will let the user guess again and again
      # with each repeat of the hint (too low or too high)
      # when the uses guesses correctly, guess != number will be false
      # so the while loop condition will be false.
      # Then, the loop will not repeat.
    end
    # when the while loop exits we can show the success message
    # because our condition will have been met
    success_message
  end

  def success_message
    puts "Yes!! You guessed #{@guess} and the number was #{@number}."
  end

end

# And now we need to execute all this.
# To do that, we instantiate the NumberGuessingGame class

game_instance = NumberGuessingGame.new(rand(50))
game_instance.run

# I could also have written that more concisely:
# NumberGuessingGame.new(rand(50)).run
