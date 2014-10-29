class LiveController < WebsocketRails::BaseController
  def show_all
    WebsocketRails[message[:id]].trigger(:change_doc, {:content => message[:content]})
    # broadcast_message :change_doc, {:content => message[:content] }
  end

  def delete_user
    WebsocketRails[message].unsubscribe(connection)
    puts "user disconnected"
  end

  def user_connected
    puts 'user connected'
  end
end