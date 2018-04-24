# Pugin (UK Parliament Brand)
The brand of UK Parliament created by the [Parliamentary Digital Service][pds] for Parliamentary websites. It is named after the Palace of Westminster interior designer [Augustus Welby Northmore Pugin][augustus-pugin].

[![License][shield-license]][info-license]

> **NOTE:** This is currently in active development and will change at short notice. It is not production ready.

## Requirements
[parliament.uk-pugin][parliament.uk-pugin] requires the following:

* [NodeJS][nodejs] 6.0.0 and above

## Setup
To install, clone from GitHub and run `make install` in the cloned directory:

```bash
git clone https://github.com/ukparliament/parliament.uk-pugin.git
cd parliament.uk-pugin
make install
```

## Usage
After setting up, run `make serve`. Browse to http://localhost:5000 to view Pugin (UK Parliament Brand) on example prototypes.

## Maps
Our maps use the [leafletjs library][leafletjs] that is published under the [2-clause BSD License][license-2c-BSD].

## Contributing
If you wish to submit a bug fix or feature, you can create a pull request and it will be merged pending a code review.

1. Fork the repository
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create a new Pull Request

## License
[parliament.uk-pugin][parliament.uk-pugin] is licensed under the [Open Parliament Licence][info-license].

[nodejs]:          		  http://nodejs.org
[pug-cli]:         		  https://github.com/pugjs/pug-cli
[leafletjs]:         		http://leafletjs.com/
[license-2c-BSD]:       https://opensource.org/licenses/BSD-2-Clause

[parliament.uk-pugin]:  https://github.com/ukparliament/parliament.uk-pugin
[pds]:             		  https://www.parliament.uk/mps-lords-and-offices/offices/bicameral/parliamentary-digital-service/
[augustus-pugin]:       https://en.wikipedia.org/wiki/Augustus_Pugin

[info-license]:    	  	http://www.parliament.uk/site-information/copyright/open-parliament-licence/
[shield-license]:  		  https://img.shields.io/badge/license-Open%20Parliament%20Licence-blue.svg
