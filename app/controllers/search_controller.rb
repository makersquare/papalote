class SearchController < ApplicationController
  def index
    wildcard_keyword = "%#{params[:keywords]}%"
    @folders = Folder.where("name ILIKE :search", search: wildcard_keyword) 
    @docs = Doc.where("name ILIKE :search", search: wildcard_keyword) 
  
    render json: {folders: @folders, docs: @docs}
  end
end