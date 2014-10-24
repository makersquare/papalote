# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def clean_db
	Doc.all.each {|d| d.destroy}
	Folder.all.each {|f| f.destroy}
end

def create_folders
	f = Folder.create(name: "Dan's Folder")
	f1 = Folder.create(name: "Kim's Folder")
	f2 = Folder.create(name: "Parag's Folder")
end

def create_docs
	folders = Folder.all
	Doc.create(name: "Dan's First File", content: "1234", folder: folders[0])
	Doc.create(name: "Dan's File Number 2", content: "4567", folder: folders[0])
	Doc.create(name: "Dan's Tres", content: "7890", folder: folders[0])
	Doc.create(name: "Parag I", content: ":..(", folder: folders[1])
	Doc.create(name: "Parag II", content: ";)", folder: folders[1])
	Doc.create(name: "Parag III", content: ":)", folder: folders[1])
	Doc.create(name: "Kim's Good File", content: "topsecret", folder: folders[2])
	Doc.create(name: "Kim's Great File", content: "don't read", folder: folders[2])
	Doc.create(name: "Kim's BEST FILE!!!", content: "goodstuff", folder: folders[2])
end

clean_db
create_folders
create_docs