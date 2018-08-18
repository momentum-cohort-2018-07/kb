# Number Guessing Game

# The computer selects a number and the user has unlimited chances to guess it.

# Set a random number between 1 and 50 at the beginning of the game.
the_number = rand(50)

# Ask the user to guess a number
puts "Hello there! I've selected a number between 1 and 50. Can you guess what it is?"
puts "Type your guess."

# Grab the user's guess and store it in a variable.
# Strip off any whitespace the user might have included.
# Make sure it is an integer, not a string.
guess = gets.chomp.to_i

# If the guess is too low, tell the user to guess again.
while guess != the_number
  if guess > 50
    puts "Nope, has to be between 1 and 50. Try again."
  elsif guess < the_number
    puts "Too low. Guess again."
  elsif guess > the_number
    puts "Too high. Guess again."
  end
  # Capture the next guess inside the loop
  guess = gets.chomp.to_i
  # This will let the user guess again and again
  # with each repeat of the hint (too low or too high)
  # when the uses guesses correctly, guess != number will be false
  # so the while loop condition will be false.
  # Then, the loop will not repeat again and
  # execution moves to the next line after the end of the while loop.
end

# This line won't run until the while loop is finished.
# The while loop finishes when the guess DOES equal the number,
# because that was the condition we set.
# So we know that if we get here the user has the correct guess
puts "Yes!! You guessed #{guess} and the number was #{the_number}."