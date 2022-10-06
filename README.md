# React/Webpack/Typescript base application

The purpose of this repo is to serve as an example for building a React application from scratch without abstracting away the required libraries and configurations, which occurs when building an application with create-react-app. 
There is no one right way to build a React application from scratch. This is just an example cobbled together from other examples found on the Web.
These instructions assume you are using the command line in Mac or Linux for everything, but you can create files however you like within an IDE like VSCode. Command line for Windows is not covered here, but you can use the commands as presented by working in WSL (Windows Subsystem for Linux) in Windows.
These instructions assume you have installed git, node (or nvm), and npm in your development environment. You may choose to use yarn instead of npm.
These instructions assume you are using VSCode as your IDE.

This application is comprised of:
React 18 (latest release at this time).
TypeScript: Used in development for strong typing of variables and data structures, which highlights errors during development instead of after compilation.
Webpack 5: Packaging code and modules for release, and configurations for using images, SVGs, S/CSS, etc.
Babel: For converting code from ES6/JSX to javascript that is readable by the browser.
ESLint: For linting, speeding up development with autocompletion and displaying errors in code during development.
Prettier: For formatting code during development for better readability.

## Part I: Core application setup

1. Create an application directory in your working directory (name it whatever you want -- change from 'my-app'):
 ``` mkdir my-app ```

2. Initialize as a git repository and add a .gitignore file:
    ``` git init ```
    ``` touch .gitignore ```

3. Create directories for source code and build code:
    ``` mkdir src ```
    ``` mkdir dist ```

4. Add dist directory to the .gitignore file by typing 'dist' on the first line. The build, contents of dist, does not need to be checked into the repository.

5. Initialize the application with npm in order to start installing libraries:
    ``` npm init ```
Note: Accept all of the default or empty values for now and accept the package.json file as it is displayed. 

6. Create an index.html file in the src directory:
    ``` touch src/index.html ```

7. Set up boilerplate HTML code in the index.html file in VSCode by typing '!' and press Enter on the first line of the file (Emmet abbreviation).

8. Edit the index.html file, updating the title and adding the following code inside of the body tags. This is where the React application will be injected into the html file.
```    
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ReactTSWebpackBase</title>
        </head>
        <body>
            <div id="root"></div>
        </body>
    </html>
```

9. At this point, you are ready to start installing libraries. Prior to installing libraries, add the 'node_modules' directory to the .gitignore file. The node_modules directory should not be checked into your git repository. This is where all installed libraries will reside and they will take up a lot of storage. The libraries are only needed for development and the build. During development, they will be installed on your machine after running 'npm install' or during the process of adding individual libraries. The .gitignore file should look like this now:
```
    dist
    node_modules
```

10. Install React and React-DOM:
``` npm install react react-dom ```

11. Install Typescript and type definitions for React and React-DOM as dev dependencies:
``` npm install -D typescript @types/react @types/react-dom ```
Note: '-D' is shorthand for '--save-dev'. Libraries that are dev dependencies are not included in the build (dist); they are only used in development.

12. Create a tsconfig.json configuration file for the Typescript compiler and paste the following code into it:
``` 
    {
    "compilerOptions": {
        "target": "ES5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
        "module": "ESNext" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
        "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */ /* Type declaration files to be included in compilation. */,
        "lib": [
        "DOM",
        "ESNext"
        ] /* Specify library files to be included in the compilation. */,
        "jsx": "react-jsx" /* Specify JSX code generation: 'preserve', 'react-native', 'react' or 'react-jsx'. */,
        "noEmit": true /* Do not emit outputs. */,
        "isolatedModules": true /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */,
        "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
        "strict": true /* Enable all strict type-checking options. */,
        "skipLibCheck": true /* Skip type checking of declaration files. */,
        "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */,
        "resolveJsonModule": true
        // "allowJs": true /* Allow javascript files to be compiled. Useful when migrating JS to TS */,
        // "checkJs": true /* Report errors in .js files. Works in tandem with allowJs. */,
    },
    "include": ["src/**/*"]
    }
```
Note: Go to the TypeScript website for more information on configuration options.

13. In src, create an App.tsx file to render something and an index.tsx file in the src directory to use as an entry point for our React app:
``` touch src/App.tsx ```
``` touch src/index.tsx ```

14. Paste the following code into the App.tsx file:
```
    export const App = () => {
        return (
            <>
                <h1>React TypeScript Webpack Base</h1>
            </>
        )
    }
```

15. Paste the following code into the index.tsx file:
```
    import ReactDOM from 'react-dom'
    import { App } from './App'

    ReactDOM.render(<App />, document.getElementById('root')) // use ReactDOM to inject App.tsx into the div with ID of 'root' in index.html
```

16. At this point, you have code that can be rendered in the browser, with the exception that you need to convert it browser-readable Javascript. For this, you need to install Babel. Install as dev dependencies:
``` npm install -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime ```

17. Install Webpack for bundling code for development and deployment. This will include the Webpack web server, which will restart and render the changes to code as you save files:
``` npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin ```

18. With Webpack installed, you can add the Babel loader for use in Webpack configuration:
``` npm install -D babel-loader ```

19. Webpack configuration can be handled using a single file (webpack.config.js) for working in a development environment. However, for production there are some variations. Taking this into account, you will be breaking out the configuration into multiple files to handle development environment and production environment scenarios later in this documentation. For now, you will use a single configuration file for development only. Create the file in a webpack directory at the root of the application:
``` mkdir webpack ```
``` touch webpack/webpack.config.js ```

20. Add the configuration code to webpack.config.js:
```
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
        entry: path.resolve(__dirname, '..', './src/index.tsx'), // sets the entry point for the app
        resolve: {
            extensions: ['.tsx', '.ts', '.js'], // resolves files of these types so the suffix doesn't need to be included when importing into other files/components -- starts with .tsx and works to the right
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/, // uses babel-loader when compiling .tsx, .ts, .jsx, .js files, and excludes everything in the installed third-party libraries (node_modules)
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, '..', './dist'), // outputs the build file as bundle.js to the dist directory
            filename: 'bundle.js',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '..', './src/index.html'),
            }),
        ],
        stats: 'errors-only',
        mode: 'development', // required for development mode
    }
```

21. A command has not been set yet to run the application in the package.json file. Adding the following code to start the Webpack server with the webpack.config.js that was set up earlier. Place this line of code in the scripts section and run it from a terminal in VSCode:
```
    "start": "webpack serve --config webpack/webpack.config.js --open"
```

``` npm start ``

Note: This should start the server (localhost:8080), open up a browser window to display the index.html and render the text in the H1 tags from the App.tsx file.

21. So far, you have added the babel-loader in order to render .ts(x) and .js(x) files. Next, you will try to add some CSS to the application. Create a styles.css file in the src directory and add the following code to that file and the App.tsx file:
styles.css
```
    body {
        margin: 0;
        padding: 0;
    }

    h1 {
        color: #900;
    }
```

App.tsx: add the following line to the top of the file
```
    import "./styles.css";
```    

Note: This should result in a compilation error because Webpack has not yet been configured to recognize CSS. 

23. Fix the compilation error by installing css-loader and style-loader as dev dependencies, and add the CSS configuration to the rules section of the webpack.config.js file below the babel-loader configuration section:
``` npm install -D css-loader style-loader ```

```
      {
        test: /\.(ts|js)x?$/, // uses babel-loader when compiling .tsx, .ts, .jsx, .js files, and excludes everything in the installed third-party libraries (node_modules)
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // need to install style-loader and css-loader for .css files to work
      },
```

``` npm start ```

24. Add an image (PNG, JPG, GIF, etc) and an SVG (vector graphic) to the src directory. There are a couple icons in the src/assets directory in this repository for this purpose. Add some code to import and display those graphics in the App.tsx file:
Add imports to the top of the App.tsx file.
```
    import ReactPNG from "./assets/react-js-icon.png";
    import ReactSVG from "./assets/react-js-icon.svg";
``` 

Add img tags below the H1 tags.
```
    <img src={ReactPNG} alt="React icon png" width="100" height="100" />
    <img src={ReactSVG} alt="React icon svg" width="100" height="100" />
```
Note: The imports will display a red line under the location of the assets, warning of a TypeScript error.

25. Deal with the TypeScript error by creating a declaration.d.ts file in the src directory and add the following code:
``` touch src/declarations.d.ts ```

Paste this code in the declarations.d.ts file:
```
    declare module '*.png'
    declare module '*.svg' {
        const content: string
        export default content
    }
```
Note: The red underlines should go away on the graphic imports in the App.tsx file -- the TypeScript error is corrected.

26. Start the application again:
``` npm start ``` 
Note: There should be compilation errors due to missing loaders for the PNG and the SVG.

27. Add the following code to the webpack.config.js file to correct the compilation errors and start the application again. Paste this beneath the CSS test sectiong inside the module rules section fo the webpack.config.js file:
```
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
```

``` npm start ```
Note: The compilation errors should be fixed and you should see the PNG and the SVG displayed below the header.

This completes the first part of this tutorial.

Floating notes below....

24. 

                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'], // need to install style-loader and css-loader for .css files to work
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: 'asset/inline',
                },

In the webpack.config.js file, you will notice other rules that have been defined for compiling with CSS, images and vector-based graphics. 

21. [CSS and style loader instructions here]:
``` npm install -D css-loader style-loader ```

90. Webpack configuration can be handled using a single file (webpack.config.js) for working in a development environment. However, for production there are some variations. Taking this into account, you will be breaking out the configuration into multiple files to handle development environment and production environment scenarios. In this case, you can create a webpack.config.js that will combine the contents of a common configuration file with the contents of development configuration file OR a production configuration file depending on which environment the application is in. Create the files in a webpack directory at the root of the application:
``` mkdir webpack ```
``` touch webpack/webpack.config.js ```
``` touch webpack/webpack.common.js ```
``` touch webpack/webpack.dev.js ```
``` touch webpack/webpack.prod.js ```

91. Add the configuration code to the respective files:
webpack.config.js
```
    const { merge } = require('webpack-merge')
    const commonConfig = require('./webpack.common.js')

    module.exports = (envVars) => {
        const { env } = envVars
        const envConfig = require(`./webpack.${env}.js`)
        const config = merge(commonConfig, envConfig)
        return config
    }
```

webpack.common.js
```
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.tsx'), // sets the entry point for the app
    resolve: {
        extensions: ['.tsx', '.ts', '.js'], // resolves files of these types so the suffix doesn't need to be included when importing into other files/components -- starts with .tsx and works to the right
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/, // uses babel-loader when compiling .tsx, .ts, .jsx, .js files, and excludes everything in the installed third-party libraries (node_modules)
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, '..', './dist'), // outputs the build file as bundle.js to the dist directory
        filename: 'bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', './src/index.html'),
        }),
    ],
    stats: 'errors-only',
    }
```

webpack.dev.js
```
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Vishwas'),
    }),
  ],
}
```


@babel/plugin-transform-runtime




