class Retrieve
  def self.search(key)
    keyword = "%#{key}%"
    @folders = Folder.where("name ILIKE :search", search: keyword) 
    @docs = Doc.where("name ILIKE :search", search: keyword) 
    return {folders: @folders, docs: @docs}
  end
end