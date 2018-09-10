class Recipe < ApplicationRecord
  has_one_attached :image
  # could also attached more than one image wiht has_many_attached
end