class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :github_uid
      t.string :name
      t.string :display_name

      t.timestamps
    end
  end
end
