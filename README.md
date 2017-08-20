# Splain
###### small parser to create more interesting language/sentances

[![Build Status](https://travis-ci.org/mog13/Splain.svg?branch=master)](https://travis-ci.org/mog13/Splain)


*note this readme is a work in progress and as such is not complete and contains many splling errors*
## overview/usage
Splain lets you use templates to dynamically change your text each time it is run. by providing Splain with a dictionary of words it can pull from you can quickly and easily build up some convincing behaviour and variety.

A Splain template is marked by surrounding it with double parenthesis `{{}}`. The most simple template would be to just include a link to the dictionary entry to use for example `"hello {{planet}}"`.
This would dynamically switch out the template planet with something from the planet entry in its dictionary. 

You can target any text to run through splain simply: `Splain.process(text)`.

To add entrys to the dictionary you can use `Splain.addEntry(JSON, name)` The name is optional.

You can have multiple templates in a sentence and multiple 'splains' in a template. splain dictionaries can also be multilayered to simplify structure:

`"Im {{adj.excited}} to get Splain {{working adj.good}}"` -> "im enthusiastic to get Splain functioning well" 

You can add some modifiers to Splain for more variety. a '?' indicates a conditional splain and will only render it with a 1 in X chance. For instance `"hello {{planet?4}}"` will only print out a planet roughly one in four times.

similarly you can use the | operator to specify one or the other: `"hello {{planet|internet}}"`

finally you can add literals into the template which will not be swapped with a dictionary and rendered as typed (without the quotes) but will behave with other Splain operators
`"hello {{'world'?2}}"`

*note: This currently means literals cant contain a ' .....*

## Advanced use
Splain templates can be built up as much as you want. dictionary items can themselves contain templates.

*a lot of advanced usage is so far un tested and undocumented*

## Installation
include as a script tag: `<script src="./splain.js"/>`

or require in a file `require("./splain")`

## Developing
pull requests welcome.

`npm install` to install

`npm build` to bundle with webpack;

## Testing
Testing is done via Jest and Jasmine.
tests can be run with `npm test` or simply `jest`
