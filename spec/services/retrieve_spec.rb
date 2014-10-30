require 'spec_helper'

describe Retrieve do
  it 'searches for the keyword and returns a hash with files and folders' do
    keyword_folder = "folder_test"
    keyword_doc = "doc_test"
    Folder.create(name: keyword_folder)
    Doc.create(name: keyword_doc)
    result = Retrieve.search(keyword_folder)
    result2 = Retrieve.search(keyword_doc)
    expect(result[:folders].first.name).to eq(keyword_folder)
    expect(result2[:docs].first.name).to eq(keyword_doc)
  end
end