class SearchController < ApplicationController
  def index
    wildcard_keyword = "%#{keywords}%"

    @folders = Folder.where("name ILIKE :search", search: wildcard_keyword) 
    @docs = Doc.where(name: params[:keywords])
  
    render json: {folders: @folders, docs: @docs}
  end
end

# ILIKE for the name - postgres case insensitive version of LIKE
