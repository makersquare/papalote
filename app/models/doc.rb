class Doc < ActiveRecord::Base
  belongs_to :folder
  belongs_to :owner, class_name: "User"
end
