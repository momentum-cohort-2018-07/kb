class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.timestamp :completed_at
      t.string :url

      t.timestamps
    end
  end
end
