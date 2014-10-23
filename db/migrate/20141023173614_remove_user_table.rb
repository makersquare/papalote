class RemoveUserTable < ActiveRecord::Migration
  def down
    drop_table :users
  end
end
