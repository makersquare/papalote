class CreateDocs < ActiveRecord::Migration
  def change
    create_table :docs do |t|
      t.string :name
      t.text :content
      t.belongs_to :folder
      t.timestamps
    end
  end
end
