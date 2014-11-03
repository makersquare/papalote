class User < ActiveRecord::Base
  has_many :docs, foreign_key: "owner_id"
  has_many :folders, foreign_key: "owner_id"
  
  def self.create_user(auth)
    create! do |user|
      user.github_uid = auth['uid']
      user.guest = false
      if auth['info']
        user.name = auth['info']['name'] || ""
        user.display_name = auth['info']['nickname'] || ""
      end
    end
  end

  def self.retrieve_user(user_id)
    if user_id
      current_user ||= User.find(user_id)
    else
      current_user = User.create(name: "Guest #{Time.now.to_i}", guest: true)
    end
  end
end
