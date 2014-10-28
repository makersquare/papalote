class LiveController < WebsocketRails::BaseController
  def show_all
    broadcast_message :change_doc, {:content => message[:content] }
  end
end