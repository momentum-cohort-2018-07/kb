class CreateHolidays < ActiveRecord::Migration[5.2]
  def change
    create_table :holidays do |t|
      t.string :name
      t.date :observed_on
      t.string :origin_country

      t.timestamps
    end
  end
end
