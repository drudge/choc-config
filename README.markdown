# drudge’s tasty Chocolat config

This is my personal configuration for the [Chocolat](http://chocolatapp.com) text editor. The focus on this configuration is on developing web applications in JavaScript (namely, [Node.js](http://nodejs.org)).

This is also the testbed for my Chocolat development. There are unstable and/or unreleased mixins, syntaxes, etc. You've been warned.

## Features

  * Experimental Taskpaper syntax and keyboard completion mixin
  * Puppet configuration file syntax
  * Github Flavored Markdown Preview
  * JavaScript tools (convert lines to array, lines to string, eval to editor, etc.)
  * Gist & Pastie support
  * Generate cross-browser CSS from CSS3 properties with Prefixr
  * Upload files with Transmit 4
  * Strip trailing whitespace & remove non-ASCII characters commands
  * Useful snippets for Node.js development. *See: [node.truffle](https://github.com/drudge/node.truffle)*
  * Supports completions for Node.js API
  * Adds templates for easily creating Node.js modules or Locomotive controllers

## Installation

### One-liner

Run the following command in your terminal:

```bash
curl https://raw.github.com/drudge/choc-config/master/bootstrap.sh | sh
```

It will abort if you have an existing `Chocolat` folder in `~/Library/Application Support`. Either move it out of the way, or download and run the bootstrap.sh script interactively to be prompted to overwrite.

**Note:** The bootstrap script does change some Chocolat preferences, so check the source of the file prior to running to make sure you're cool with that.

### Using Git

To just install my Syntaxes and Mixins, simply clone the repository and the submodules:

```bash
git clone https://github.com/drudge/choc-config.git ~/Library/Application\ Support/Chocolat --recursive
```

If you are interested in adding my compeltions and/or templates, you'll need to run the following commands in your terminal:

**Node.js Completions**

```bash
CHOCOLAT_APP=/Applications/Chocolat.app/
rm $CHOCOLAT_APP/Contents/Resources/completions.json
ln -s ~/Library/Application\ Support/Chocolat/completions.json $CHOCOLAT_APP/Contents/Resources/completions.json
```

**Node.js Templates**

```bash
CHOCOLAT_APP=/Applications/Chocolat.app/
rm $CHOCOLAT_APP/Contents/Resources/boilerplate.json
ln -s ~/Library/Application\ Support/Chocolat/boilerplate.json $CHOCOLAT_APP/Contents/Resources/boilerplate.json
```

## Patches Welcome!

If you find bugs, or would like something to act differently, please do not hesitate to [file an issue](https://github.com/drudge/choc-config/issues). 

## Warranty

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.