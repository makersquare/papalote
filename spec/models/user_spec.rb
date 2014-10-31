require 'spec_helper'

describe User do
  it "creates a guest user if there is no session variable" do

    user_id = nil
    user_count = User.count
    user = User.retrieve_user(user_id)

    expect(user).to be_a(User)
    expect(user.guest).to eq(true)
    expect(User.count).to eq(user_count + 1)
    expect(user.name).to include("Guest")
  end

  it "retrieves a guest user if there is a session variable" do
    # Sets guest user in database
    user_id = nil
    user = User.retrieve_user(user_id)

    # Retrieves guest user
    user = User.retrieve_user(user.id)
    expect(user).to be_a(User)
    expect(user.guest).to eq(true)
    expect(user.name).to include("Guest")
  end

  it "retrieves legit user if there is a session variable" do
    user = User.create({
      name: "Jeff",
      display_name: "jplouie",
      github_uid: 12345
    });
    user = User.retrieve_user(user.id)

    expect(user).to be_a(User)
    expect(user.name).to eq("Jeff")
    expect(user.guest).to eq(nil)
  end
end