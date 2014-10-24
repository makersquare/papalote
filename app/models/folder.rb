class Folder < ActiveRecord::Base
  validates :name, presence: true
  has_many :docs
end
