class User < ActiveRecord::Base
  has_many :docs, foreign_key: "owner_id"
  has_many :folders, foreign_key: "owner_id"
  
  def self.create_user(auth)
    create! do |user|
      user.github_uid = auth['uid']
      if auth['info']
        user.name = auth['info']['name'] || ""
        user.display_name = auth['info']['nickname'] || ""
      end
    end
  end
end
