# drudge’s Chocolat Support

## Installation

### Using Git

```bash
git clone https://github.com/drudge/choc-config.git ~/Library/Application\ Support/Chocolat
```

### Node.js Completions

```bash
CHOCOLAT_APP=/Applications/Chocolat.app/
rm $CHOCOLAT_APP/Contents/Resources/completions.json
ln -s ~/Library/Application\ Support/Chocolat/completions.json $CHOCOLAT_APP/Contents/Resources/completions.json
```

### Notes

Due to a bug in the current API builds, Mixins are not loaded properly from ~/Library/Application\ Support/Chocolat/Mixins. To prevent a crash, I've moved them to a Mix-ins directory. To make them load in Chocolat, simply symlink:

```bash
ln -s ~/Library/Application\ Support/Chocolat/Mix-ins ~/.chocolat/mixins
```