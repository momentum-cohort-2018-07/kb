class Recipe < ApplicationRecord
  paginates_per 2
  has_one_attached :image
  # could also attached more than one image wiht has_many_attached
end