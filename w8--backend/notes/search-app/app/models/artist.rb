class Artist < ApplicationRecord
  include PgSearch

  pg_search_scope :search_name, against: [:name]
  pg_search_scope :search_all_variants,
    against: [:name, :bio],
    using: {
      tsearch: { dictionary: 'english' } # This searches all word variants
    }
  pg_search_scope :search_all_partial_matches,
    against: [:name, :bio],
    using: {
      tsearch: { prefix: true } #This enables partial word searching
    }
end
