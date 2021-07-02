# resolve-alias-from-ts-paths

Used to replace `resolve.alias` of `webpack.config.jS` with `paths` of `tsconfig.json`

[Source ](https://github.com/sx6316/resolve-alias-from-ts-paths/blob/main/index.js)


## Install

```shell
npm install -D resolve-alias-from-ts-paths
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
const pathsToAlias = require('resolve-alias-from-ts-paths')

module.exports = {
    // ...
    plugins: [new pathsToAlias({ aliasLog: true })]
}
```

or

```js
const pathsToAlias = require('resolve-alias-from-ts-paths')

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

