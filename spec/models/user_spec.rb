require 'spec_helper'

describe User do
  it "creates a guest user if there is no session variable" do
    user_count = User.count
    user = User.retrieve_user()
    expect(user).to be_a(User)
    expect(user.guest).to eq(true)
    expect(User.count).to eq(user_count + 1)
    expect(user.name).to include("Guest")
  end

  it "retrieves guest user if there is a session variable" do
  end

  it "retrieves legit user if there is a session variable" do
  end
end