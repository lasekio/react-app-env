# React Application Environment

Easy to use out-of-the box envirment including:
- Sass/Css loaders
- React hot reloading
- DLL prebuild for speedup live reloading
- Ready to use SSR config

## Custom config

package.json:

```json
{ 
  "reactAppConfig": {
    "vendors": [
      "redux",
      "react-redux"
    ]
  }
}
```

### `reactAppConfig.vendors` : `Array`

List of vendors used in application. This is used by DLL module to speed up reloads 
and for production build to split up vendors and app code (allowing cache engienes to work better).