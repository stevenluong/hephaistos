class CreateSimulations < ActiveRecord::Migration
  def change
    create_table :simulations do |t|
      t.datetime :at
      t.decimal :totalValue
      t.decimal :rate
      t.integer :years
      t.integer :monthlyCost
      t.integer :totalCost
      t.integer :monthlytotalCost
      t.integer :costRate

      t.timestamps null: false
    end
  end
end
