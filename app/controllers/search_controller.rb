class SearchController < ApplicationController
  def index
    result = Retrieve.search(params[:keywords])
    render json: result
  end
end

