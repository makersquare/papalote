require 'spec_helper'

describe Retrieve do
  describe '.search' do
    let(:keyword) {"fam"}
    let(:test1) {"Family"}
    let(:test2) {"Oxfam"}
    let(:test3) {"oldfamily"}
    let(:test4) {"Fanny"}

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

    it 'searches for keywords using a wildcard character' do
      Folder.create(name: test1)
      Folder.create(name: test2)
      Folder.create(name: test3)
      result = Retrieve.search(keyword)
      expect(result[:folders].length).to eq(3)
    end

    it 'finds only folders and docs that match the keyword' do
      Folder.create(name: test1)
      Folder.create(name: test4)
      result = Retrieve.search(keyword)
      expect(result[:folders].first.name).to eq(test1)
      expect(result[:folders].length).to eq(1)

    end
  end
end

