const packageInfo = require(path.join(process.cwd(), 'package.json'));

const customVendors = packageInfo.reactAppConfig && packageInfo.reactAppConfig.vendors || [];

export const vendors = Array.from(new Set([ // Unique
    'webpack/hot/only-dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    'react-dom',
    'react-hot-loader',
    'react',
    ...customVendors,
]));