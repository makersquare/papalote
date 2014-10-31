class LiveController < WebsocketRails::BaseController
  # Sends updates to all subscribers to the same channel (set by document id)
  def channel_broadcast
    WebsocketRails[message[:id]].trigger(:change_doc, {:content => message[:content]})
  end

  def delete_user
    WebsocketRails[message].unsubscribe(connection)
  end
end
