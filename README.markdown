# drudge’s Chocolat Support

## Installation

### Using Git

```bash
git clone https://github.com/drudge/choc-config.git ~/Library/Application\ Support/Chocolat --recursive
```

### Node.js Completions

```bash
CHOCOLAT_APP=/Applications/Chocolat.app/
rm $CHOCOLAT_APP/Contents/Resources/completions.json
ln -s ~/Library/Application\ Support/Chocolat/completions.json $CHOCOLAT_APP/Contents/Resources/completions.json
```