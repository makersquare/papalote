class UsersController < ApplicationController
	def show
		render json: current_user
	end

	def loggedin?
		
	end

end