class Folder < ActiveRecord::Base
  validates :name, presence: true
  has_many :docs
  has_many :subfolders, class_name: "Folder", foreign_key: 'parentfolder_id'
  belongs_to :parentfolder, class_name: Folder

end
