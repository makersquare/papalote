class AddParentfolderToFolder < ActiveRecord::Migration
  def change
    change_table :folders do |t|
      t.references :parentfolder
    end
  end
end
