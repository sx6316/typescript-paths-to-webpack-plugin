# typescript-paths-to-alias-plugin

Used to replace `resolve.alias` of `webpack.config.jS` with `paths` of `tsconfig.json`

[Source ](https://github.com/sx6316/typescript-paths-to-alias-plugin/blob/main/index.js)


## Install

```shell
npm install -D typescript-paths-to-alias-plugin
```

## Example

**`tsconfig.json`**

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "/*":["./*"],
            "@*": ["./src/*","./src/*/index"]
        }
}
```

The **`resolve.alias`** of `webpack` will become

```
{
  '/': [ 'F:\\desktop\\react\\s' ],
  '@': [ 'F:\\desktop\\react\\s\\src' ],
  '@assets': [ 'F:\\desktop\\react\\s\\src\\assets' ],
  '@utils': [ 'F:\\desktop\\react\\s\\src\\utils' ],
  '@views': [ 'F:\\desktop\\react\\s\\src\\views' ]
}
```

## Usage

**`webpack.config.js`**

```javascript
const pathsToAlias = require('typescript-paths-to-alias-plugin')

module.exports = {
    // ...
    plugins: [new pathsToAlias({ aliasLog: true })]
}
```

or

```js
const pathsToAlias = require('typescript-paths-to-alias-plugin')

module.exports = {
    // ...
    resolve:{
	  alias: pathsToAlias.getAlias()
	}
}
```

## Options
 - `aliasLog` :  Boolean
    - Show the replacement in your shell
    - `defaule` : false

