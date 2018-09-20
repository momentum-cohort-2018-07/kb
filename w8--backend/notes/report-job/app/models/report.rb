class Report < ApplicationRecord
  def ready?
    completed_at.present?
  end
end
