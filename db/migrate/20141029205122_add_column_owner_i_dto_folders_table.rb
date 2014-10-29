class AddColumnOwnerIDtoFoldersTable < ActiveRecord::Migration
  def change
    change_table :folders do |t|
      t.references :owner
    end
  end
end
