# drudge’s tasty Chocolat config

## Installation

### One-liner

```bash
curl https://raw.github.com/drudge/choc-config/master/bootstrap.sh | sh
```

### Using Git

```bash
git clone https://github.com/drudge/choc-config.git ~/Library/Application\ Support/Chocolat --recursive
```

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