class User < ActiveRecord::Base
  # validates_uniqueness_of :github_uid
  
  def self.create_user(auth)
    create! do |user|
      # binding.pry
      user.github_uid = auth['uid']
      if auth['info']
        user.name = auth['info']['name'] || ""
        user.display_name = auth['info']['nickname'] || ""
      end
    end
  end


end
