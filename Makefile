.PHONY: install install_to_release clean serve build build_prod test

# When run in gocd it will be injected by environment variable
AWS_ACCOUNT?=unknown

# Common variables
SRC_FOLDER=src
PUBLIC_FOLDER=_public
JAVASCRIPTS_LOC=src/javascripts
JSON_LOC=src/json
STYLESHEETS_LOC=src/stylesheets
IMAGES_LOC=src/images
REPORTS_FOLDER=reports

# Node module variables
NODE_MODULES=./node_modules
ESLINT=$(NODE_MODULES)/.bin/eslint
IMAGEMIN=$(NODE_MODULES)/.bin/imagemin
NODE_SASS=$(NODE_MODULES)/.bin/node-sass
POSTCSS=$(NODE_MODULES)/.bin/postcss
PUG=$(NODE_MODULES)/.bin/pug
SVGO=$(NODE_MODULES)/.bin/svgo
UGLIFY_JS=$(NODE_MODULES)/.bin/uglifyjs
LEAFLET=$(NODE_MODULES)/leaflet/dist/leaflet.js
LEAFLET_FULLSCREEN=$(NODE_MODULES)/leaflet.fullscreen/Control.FullScreen.js
PRETTY_MINI_JSON=$(NODE_MODULES)/pretty-mini-json/pretty-mini-json.js

# Github variables
GITHUB_API=https://api.github.com
ORG=ukparliament
REPO=parliament.uk-pugin
LATEST_REL=$(GITHUB_API)/repos/$(ORG)/$(REPO)/releases
REL_TAG=$(shell curl -s $(LATEST_REL) | jq -r '.[0].tag_name')

# Installs npm packages
install:
	@npm i

# When run in gocd it creates a version folder then installs npm packages
install_to_release:
	git checkout -b release $(REL_TAG)
	@npm i

# Deletes the public folder
clean:
	@rm -rf $(PUBLIC_FOLDER)

# Deletes the public and node modules folder
clean_hard: clean
	@rm -rf $(NODE_MODULES)

# Compiles sass to css
css:
	@mkdir -p $(PUBLIC_FOLDER)/stylesheets
	@$(NODE_SASS) --output-style compressed -o $(PUBLIC_FOLDER)/stylesheets $(STYLESHEETS_LOC)
	@$(POSTCSS) -u autoprefixer -r $(PUBLIC_FOLDER)/stylesheets/* --no-map

# Minifies javascript files
js:
	@mkdir -p $(PUBLIC_FOLDER)/javascripts
	@$(UGLIFY_JS) $(LEAFLET) $(LEAFLET_FULLSCREEN) $(JAVASCRIPTS_LOC)/*.js -m -o $(PUBLIC_FOLDER)/javascripts/main.js

# Minifies json file
json:
	@mkdir -p $(PUBLIC_FOLDER)/templates
	@cp $(JSON_LOC)/map.html.json $(PUBLIC_FOLDER)/templates/prototypes/map.html.json
	@$(PRETTY_MINI_JSON) $(JSON_LOC)/map.html.json -o $(PUBLIC_FOLDER)/templates/prototypes/map.html.json

# Minifies images
images:
	@$(IMAGEMIN) $(IMAGES_LOC)/* -o $(PUBLIC_FOLDER)/images

# Optimises SVGs
icons:
	@$(SVGO) -f src/icons -o _public/icons

# Outputs pug files to html within public folder
templates:
	@$(PUG) $(SRC_FOLDER)/templates -P --out $(PUBLIC_FOLDER)/templates

# Runs tests on javascript files
lint:
	@$(ESLINT) $(JAVASCRIPTS_LOC)

# Launches a local server
serve: clean build
	@node server.js

# Watches project files for changes
watch:
	@node scripts/watch.js $(STYLESHEETS_LOC)=css $(JAVASCRIPTS_LOC)=js $(IMAGES_LOC)=images $(SRC_FOLDER)/layouts=templates $(SRC_FOLDER)/elements=templates $(SRC_FOLDER)/components=templates $(SRC_FOLDER)/templates=templates

# Runs accessibility testing
test:
	@mkdir -p $(REPORTS_FOLDER)
	@rm -rf $(REPORTS_FOLDER)/*
	@node scripts/pa11y.js
	@node scripts/w3c.js

# Builds application
build: lint css js images icons templates json

# Deploys to S3 without a version
deploy:
	aws s3 rm s3://$(AWS_ACCOUNT).pugin-website/images --recursive
	aws s3 rm s3://$(AWS_ACCOUNT).pugin-website/javascripts --recursive
	aws s3 rm s3://$(AWS_ACCOUNT).pugin-website/stylesheets --recursive
	aws s3 sync --acl=public-read --exclude "prototypes/*" ./_public/ s3://$(AWS_ACCOUNT).pugin-website

# Deploys to S3 using the latest release
deploy_to_release:
	aws s3 sync --acl=public-read --delete --exclude "prototypes/*" ./_public/ s3://$(AWS_ACCOUNT).pugin-website/$(REL_TAG)
