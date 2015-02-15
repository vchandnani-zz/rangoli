class CreateElephantsTable < ActiveRecord::Migration

  def up
    create_table  :elephants do |t|
      t.text      :name
      t.text      :rider
      t.text      :passengers
      t.timestamps
    end
    add_index :elephants, :name, unique: true
    add_index :elephants, :rider
    add_index :elephants, :passengers
  end

  def down
    drop_table :elephants
  end

end
