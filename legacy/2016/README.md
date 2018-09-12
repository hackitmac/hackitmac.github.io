hackitmac.github.io
===================
The github page for the hackitmac website


##Setup Instructions for Mac
You can also look at [https://help.github.com/articles/using-jekyll-with-pages](https://help.github.com/articles/using-jekyll-with-pages) for more info on github pages.

Get this repo
```
git clone https://github.com/hackitmac/hackitmac.github.io.git
````

Open up a terminal in this folder. Run this command in terminal in the folder to check ruby version of folder. You'll get the global ruby most likely the system ruby that came with mac. Something like this
```
$ ruby -v
ruby 2.0.0p451 (2014-02-24 revision 45167) [universal.x86_64-darwin13]
```

###Install Homebrew
The package manager for mac. [http://brew.sh/](http://brew.sh/)  
Run this to install brew
```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

###Install rbenv
```
brew install rbenv
```
Use rbenv to install latest ruby version
```
rbenv install 2.1.2
```
Use rbenv to set the local ruby version to `ruby 2.1.2`
```
rbenv local 2.1.2
```
rbenv rehash to make sure things are set properly
```
rbenv rehash
```
Now if you do `ruby -v` in your local directory folder for this repo.
```
$ruby -v
ruby 2.1.2p95 (2014-05-08 revision 45877) [x86_64-darwin13.0]
```

###Install bundler
Bundler lets you easily manage dependencies for gems [http://bundler.io/](http://bundler.io/).

```
$ gem install bundler
```

###Install Dependencies for this project
There is already a Gemfile in this repo specifying that you want the github-pages which includes jekyll and various other things that the github pages system uses to run your site.
```
source 'https://rubygems.org'
gem 'github-pages'
```

So all you have to do is run `bundle install`

###Start using jekyll
```
bundle exec jekyll serve --watch
```
Navigate to `http://localhost:4000`

---------------------
