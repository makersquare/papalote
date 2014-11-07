class UsersController < ApplicationController

  def show
    current_user = User.retrieve_user(session[:user_id])
    session[:user_id] = current_user.id
    render json: current_user
  end
  
  def user_contents
    @docs = Doc.where(owner_id: params[:owner_id])
    @folders = Folder.where(owner_id: params[:owner_id])
    response = {:docs => @docs, :folders => @folders}
    render json: response
  end
end