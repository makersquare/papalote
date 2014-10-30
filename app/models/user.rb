class User < ActiveRecord::Base
  
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
