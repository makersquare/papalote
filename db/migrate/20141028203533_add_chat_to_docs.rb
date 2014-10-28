class AddChatToDocs < ActiveRecord::Migration
  def change
    add_column :docs, :chat_log, :string
  end
end
