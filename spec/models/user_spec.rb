require 'spec_helper'

describe User do
  it "creates a guest user if user_id is not set" do

    user_count = User.count
    user = User.retrieve_user(nil)

    expect(user).to be_a(User)
    expect(user.guest).to eq(true)
    expect(User.count).to eq(user_count + 1)
    expect(user.name).to include("Guest")
  end

  it "retrieves a guest user if given the id of a guest" do
    # Sets guest user in database
    user = User.retrieve_user(nil)

    # Retrieves guest user
    user = User.retrieve_user(user.id)
    expect(user).to be_a(User)
    expect(user.guest).to eq(true)
    expect(user.name).to include("Guest")
  end

  it "retrieves legit user if given the id of a github user" do
    user = User.create({
      name: "Jeff",
      display_name: "jplouie",
      github_uid: 12345,
      guest: false
    });
    user = User.retrieve_user(user.id)

    expect(user).to be_a(User)
    expect(user.name).to eq("Jeff")
    expect(user.guest).to eq(false)
  end
end