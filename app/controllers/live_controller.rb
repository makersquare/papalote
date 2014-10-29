class LiveController < WebsocketRails::BaseController
  def show_all
    WebsocketRails[:channel_name].trigger(:change_doc, {:content => message[:content]})
    # broadcast_message :change_doc, {:content => message[:content] }
  end
end