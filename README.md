## SF-Cohort 2 Final Project

## Build Status
[ ![Codeship Status for makersquare/papalote](https://www.codeship.io/projects/b53e2560-4118-0132-e238-5e14300eaef6/status?branch=dev)](https://www.codeship.io/projects/44095)
## Getting Started

1. run `bundle install`
2. run `gem install figaro`
  * run `figaro install`
3. create the following files, and **populate with your local enviroment data**:
  * *There are examples of these files within the directory.*
  * create and populate: `config/database.yml`
  * create and populate: `config/application.yml`
    * application.yml holds all the secret api keys and other non public information.
    * **This file should not be uploaded to git**
4. Setup the database (step 3 must be completed)
  * run `rake db:create db:migrate`

At this point you should be able to run: `rails s` or `bundle exec rails s` and the server should start.
Go to `http://localhost:3000/#/` or `http://10.10.10.10:3000/#/` and the application should be running with a silly landing page which tests that all the assets are avaliable.

## Git Workflow

This section will be in two parts, the first is merely a list of the commands that you will be using as well as an explanation of what they do.  The second part will be the typical workflow you should all follow which will limit the ammount of merge conflicts and other git related issues that can occur when working in a large team.

### Git Commands

* `git fetch`
	* the command `git pull` performs a g `git fetch` right before it actually pulls
	* `git fetch` will compare your local repo with the remote BUT NOT make changes to your local
	* commonly used to check if a pull --rebase is necessary
* `git pull --rebase <remote> <cur_branch>`
	* this command will rewind all your changes to the last commit.
	* then it will fastforward the external changes and combine them with your own
	* this command differs from `git merge` by the fact that it attempts to lay the changes in sequential order that they where applied compared to your own changes.
	* it is recommend that you use `git pull --rebase <remote> <cb>` often and before pushing your changes up.  This will keep your local branches current with the changes on the remote.
* `git checkout -b <new_branch_name>`
	* first is creates a new branch
	* next it checks that branch out
* `git add ./`
	* this adds all files that have been changed
* `git add .`
	* this adds every single file regardless if it has been changed or not
* `git commit -m "commit message"`
* `git rebase HEAD~#`
	* `#` <- is a place holder for an integer
	* this command will allow you to squash commits
	* say we have a feature branch and have made 20 commits to the feature branch, the feature is completed and ready to merge into development
	* we want to run `git rebase HEAD~20` this will open a vim window which will allow us to squash commits int oa single commit

### Git Workflow

* **Master** is a pristine branch **DO NOT** push to it directly without prior approval, significant testing and a code review.
* **Staging** is a pristine branch used to test updates about to be pushed to *Master*
* **Development** or **Dev** is the main development branch and the one that you should be branching from in order to create issue branches.
* **(Issue Branch)** This is an issue branch.  Say, I was assigned the task of created a ORM.  I would create a branch *off of Development* where I would work.
	* It is **IMPERATIVE** that you **DO NOT** pull and merge (User1 Issue Branch) with (User2 Issue Branch), IE two feature branches,  this will taint the git repo and cause massive ammounts of merge conflicts

###### Here is a scenario

I have been tasked with creating a user login system.  Another developer has created the necessary backend omniauth connection.  The other developer has merged their branch into development.  My local dev branch currently **DOES NOT** have these changes and has a older version of the Dev Branch.

1. Update my local dev branch with the remote
	* (I am currently in the development branch)
	* `git pull --rebase origin development` (from development)
2. create my feature/issue branch
	* `git checkout -b login` (from development)
	* (I am now in the login branch)
3. Test!!!!!
4. Code!!!!!
5. Test!!!!!
6. Get your code peer reviewed - this is mandatory!
7. `git rebase HEAD~#` (from feature branch)
	* squash our commits into a single one as to not clutter the log history
8. Update your branch with changes from the development branch
	* `git fetch` (from feature, this will work for all branches in the repo regardless of where you currently are)
	* IF Development has changed run the following to update
	* `git checkout development`
	* `git pull --rebase origin development`
	* `git checkout <feature_branch>`
	* `git rebase development` (if there are merge conflicts, you will fix it here)
	* IF you have a merge conflict, do the following:
	* Fix the files that have the conflicts
	* `git add <file-name>`
	* `git rebase --continue`
	* (repeat the last 3 steps as necessary)
9. `git checkout development`
10. `git merge <feature_branch>`
11. `git push origin development`
12. You can now delete your feature branch - `git branch -d <feature_branch>`

## Environments
Rails provides us the ability to use different environments. The most commonly used ones are *'development', 'testing'* and *'production'*. Code being run on our local computers, by default, is run as a **development** environment. Code pushed to heroku, are automatically deployed as a *production* environment. 

At a glance, it might not be clear why that would cause a problem. But there are a lot of things that can (and do) differ between these 2 environments. For instance, You don't run your database in the same server as your application. That is why `database.myl` gives you the ability to configure these seperately.

In order for us to make sure the changes we just made won't *break* production we need to run our local environment as if it were production. To do this run your server using these commands:


```
> RAILS_ENV=production rake assets:precompile
> bundle exec rails server -e production
```

NOTE: Another change you have to make is copy **secret_kay_base** from `secrets.yml` into *application.yml*  **and put it in ALL CAPS** (SECRET_KEY_BASE)

## Team Members

1. Shehzan Devani
2. JON rogLOLzen
3. Parag Dadhaniya
4. Daniel Olasky
5. Dev Sethi
6. Jeff Louie
8. Kim Phamalote
9. Jon Katz
10. George Garabedian
11. Peng Gao
12. DJ Daniels
13. Pipe
14. Stephan Yu

###Workflow

Our team used Trello to organize our different features for the application. Trello was also used to assign people to the different tasks.
Trello was kept up to date by each individual who was working on a task. We also had daily scrum meetings in which every member of the team recapped what they worked on during the previous day and what they are planning to work on during the current day.

In order for our 9 person team to effectively collaborate with each other, we used Github for version control. Off of our Master branch, we created a branch called Dev which housed code which was reviewed and was functional. Each person/group working on a task created their own feature branch off of dev. When a feature was completed, the code was peer-reviewed and reviewed by a project manager. Once the code was approved, it was merged into the Dev branch.
We committed our code often throughout our tasks. After a review was completed, we condensed our commit messages by squashing our commits into more meaningful messages which gave overall descriptions of features that were worked on.

We experienced many merge conflicts. Merge conflicts were handled by every individual who ran into them. The merge conflicts were required to be resolved in a manner which would ensure the code was still functional before being merged with Dev.
In order to deploy the app, we used Heroku. We implemented continuous integration, where any changes merged into our Development branch were automatically deployed.

### Technologies used:
* Ruby
* Rails
* ActiveRecord
* AngularJS
* Node.js
* Socket.io
* Express
* Foundation
* RSpec
* OmniAuth
* Git
* HTML5/SASS

Ruby on Rails was used for the backend of the application. For our database, we used ActiveRecord. The frontend of the application was built out using AngularJS, HTML5/SASS, and Foundation. Node.js was used to run the chat server for the application and we used Socket.io to have a real-time chat feature. RSpec was used for writing and performing different tests. OmniAuth allowed for users to login to the app via their github login. Our team used Git for version control and to share our files. 
