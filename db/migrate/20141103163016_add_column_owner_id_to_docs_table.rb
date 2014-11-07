class AddColumnOwnerIdToDocsTable < ActiveRecord::Migration
  def change
    change_table :docs do |t|
      t.references :owner
    end
  end
end
