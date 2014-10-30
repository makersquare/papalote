require 'spec_helper'

describe User do
  let(:user) { User.create(name: "Guest") }
  let(:login_user) { User.create({
      name: "Jeff",
      display_name: "jplouie",
      github_uid: 12345,
      guest: false
    });
  }

  it "creates a guest user if user_id is not set" do
    user_count = User.count
    user = User.retrieve_user(nil)

    expect(user).to be_a(User)
    expect(user.guest).to eq(true)
    expect(User.count).to eq(user_count + 1)
    expect(user.name).to include("Guest")
  end

  it "retrieves a guest user if given the id of a guest" do
    retrieved_user = User.retrieve_user(user.id)

    expect(retrieved_user.id).to eq(user.id)
  end

  it "retrieves legit user if given the id of a github user" do
    retrieved_user = User.retrieve_user(login_user.id)

    expect(retrieved_user.id).to eq(login_user.id)
    expect(retrieved_user.name).to eq("Jeff")
    expect(retrieved_user.guest).to eq(false)
  end
end