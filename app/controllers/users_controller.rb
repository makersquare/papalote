class UsersController < ApplicationController

	def show
		render json: current_user
	end

  def user_contents
    @docs = Doc.where(owner_id: params[:owner_id])
    @folders = Folder.where(owner_id: params[:owner_id])
    response = {:docs => @docs, :folders => @folders}
    render json: response
  end
end