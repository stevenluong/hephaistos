class CreateRates < ActiveRecord::Migration
  def change
    create_table :rates do |t|
      t.date :date
      t.integer :years
      t.decimal :rate

      t.timestamps null: false
    end
  end
end
