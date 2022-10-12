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
   ```mkdir my-app```

2. Initialize as a git repository and add a .gitignore file:
   ```git init```
   ```touch .gitignore```

3. Create directories for source code and build code:
   ```mkdir src```
   ```mkdir dist```

4. Add dist directory to the .gitignore file by typing 'dist' on the first line. The build, contents of dist, does not need to be checked into the repository.

5. Initialize the application with npm in order to start installing libraries:
   ```npm init```
   Note: Accept all of the default or empty values for now and accept the package.json file as it is displayed.

6. Create an index.html file in the src directory:
   ```touch src/index.html```

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
    ```npm install react react-dom```

11. Install Typescript and type definitions for React and React-DOM as dev dependencies:
    ```npm install -D typescript @types/react @types/react-dom```
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
    ```touch src/App.tsx```
    ```touch src/index.tsx```

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
    ```npm install -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime```

17. Install Webpack for bundling code for development and deployment. This will include the Webpack web server, which will restart and render the changes to code as you save files:
    ```npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin```

18. With Webpack installed, you can add the Babel loader for use in Webpack configuration:
    ```npm install -D babel-loader```

19. Webpack configuration can be handled using a single file (webpack.config.js) for working in a development environment. However, for production there are some variations. Taking this into account, you will be breaking out the configuration into multiple files to handle development environment and production environment scenarios later in this documentation. For now, you will use a single configuration file for development only. Create the file in a webpack directory at the root of the application:
    ```mkdir webpack```
    ```touch webpack/webpack.config.js```

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

21. A command has not been set yet to run the application in the package.json file. Adding the following code to start the Webpack server with the webpack.config.js that was set up earlier. Place this line of code in the scripts section and run it from a terminal in VSCode:

```
    "start": "webpack serve --config webpack/webpack.config.js --open"
```

```npm start```

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
    ```npm install -D css-loader style-loader```

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

```npm start```

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
    ```touch src/declarations.d.ts```

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
    ```npm start```
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

```npm start```
Note: The compilation errors should be fixed and you should see the PNG and the SVG displayed below the header.

This completes the first part of this tutorial.

## Part II: Code styling and formatting with ESLint and Prettier

1. Install ESLint as a dev dependency:
   ```npm install -D eslint```

2. Initialize ESLint in the app and set up the configuration:
   ```npx eslint --init```

You will be prompted to set up the configuration file in the terminal. Use the following answers:

- How would you like to use ESLint? To check syntax, find problems, and enforce code style
- What type of modules does your project use? JavaScript modules (import/export)
- Which framework does your project use? React
- Does your project use TypeScript? Yes
- Where does your code run? Browser
- How would you like to define a style for your project? Use a popular style guide
- Which style guide do you want to follow? Standard with Typescript
- What format do you want your config file to be in? JSON
- Dependencies are listed ...
- How would you like to install dependencies? npm
- Done with basic config

3. Code styling is a point of controversy that you are not going to dive into right now. It's worth spending some time looking into how ESLint, TypeScript and Prettier work together, but fussing over it gets in the way of building apps. For now, make the following additions to the .eslintrc.json file:
   Add the following section to detect the React version.

```
    "settings": {
        "react": {
          "version": "detect"
        }
    },
```

Add a reference to parserOptions for the tsconfig.json file.

```
"parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["tsconfig.json"]
    },
```

Add the following rules.

```
"rules": {
        "no-unused-vars": "off",
        "no-error-on-unmatched-pattern": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-var-requires": "off",
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off"
      }
```

4. Edit the package.json file to allow for running ESLint more simply. Add the following code to the scripts section:

```
    "lint": "eslint src/**/*.tsx src/**/*.ts",
    "lint-fix": "eslint src/**/*.tsx src/**/*.ts --fix"
```

5. Run the linter from the terminal:
   ```npm run lint```
   Note: There should be several errors to do with spacing, semicolons, etc.

6. Run the linter with the fix option:
   ```npm run lint-fix```
   Note: This should fix most of the errors in the App.tsx file. The remaining error will be for a missing return type on the App.tsx file.

7. Add a return type of JSX.Element on the App function:

```
    import './styles.css'
    import ReactPNG from './assets/react-js-icon.png'
    import ReactSVG from './assets/react-js-icon.svg'
    export const App = (): JSX.Element => {
        return (
            <>
                <h1>React TypeScript Webpack Base App</h1>
                <img src={ReactPNG} alt="React icon png" width="100" height="100" />
                <img src={ReactSVG} alt="React icon svg" width="100" height="100" />
            </>
        )
    }
```

8. Run the linter from the terminal:
   ```npm run lint```
   Note: There should be no errors.

9. With ESLint installed and configured, it's time to install and configure Prettier:
``` npm install -E -D prettier ```
``` touch .prettierrc.json .prettierignore ```

10. Add the following code to the prettier configuration files and package.json scripts section:
.prettierrc.json
```
    {
        "trailingComma": "es5",
        "tabWidth": 4,
        "semi": false,
        "singleQuote": true
    }
```

.prettierignore
```
    node_modules
    README.md
    # Ignore artifacts:
    dist
    coverage
```

package.json scripts section addition to format all files not ignored
```
    "format": "prettier --write ."
```

11. Run Prettier on all the files:
``` npm run format ```

12. Run the linter again:
``` npm run lint ```
Note: There will be errors for the number of spaces per tab because ESLint is configured for 2 and Prettier is configured for 4. This shows that there can be conflicts between ESLint and Prettier configs.

13. Change the tabWidth in the .prettierrc.json file and run Prettier and the linter again:
```
    "tabWidth": 2,
```

``` npm run format ```
``` npm run lint ```
Note: There should be no errors.

## Part III: Configure Webpack for development and production environments

1. Previously, you configured Webpack using a single file (webpack.config.js) for working in a development environment. Now, it's time to create configuration files for development and production. The reason for having separate configurations? In development, you are using Webpack server to see changes in the application as you write code and save. It's faster to develop, but the bundle size is larger than you would want for deploying to production. In production, you compile and build a much smaller bundle. You can still run the application locally, but don't have the ability to do hot loading like you can with Webpack server.
The first thing you need to do is to change the name of your existing webpack.config.js file to webpack.common.js. Then, create the remaining files you will need:
    ```mv webpack/webpack.config.js webpack/webpack.common.js```
    ```touch webpack/webpack.config.js```
    ```touch webpack/webpack.dev.js```
    ```touch webpack/webpack.prod.js```

2. Add the configuration code to the respective files:
    webpack.config.js  -- this code merges the common configuration with the dev or prod configuration, depending on environment

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

webpack.dev.js

```
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',  // sets the development mode -- the variable can be accessed in code with {process.env.NODE_ENV} 
  devtool: 'cheap-module-source-map',  // the sourcemap tool used by CRA -- sourcemap creates a way to connect errors compiled in ES5 code the browser reads with the ES6/JSX code that you write in your components, useful for debugging
  devServer: {  // hot loading webpack server during development
    hot: true,
    open: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({  // this is an optional setting of an environment variable
      'process.env.name': JSON.stringify('__DEV__'), 
    }),
  ],
}
```

webpack.prod.js

```
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({  // this is an optional setting of an environment variable
      'process.env.name': JSON.stringify('__PROD__'),
    }),
  ],
}
```

3. Install the libraries for React refresh, these will make Webpack server update the application in development when a file is saved and also retain the data state of the application:
``` npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh ```

4. In the package.json scripts section, set start and build scripts as shown below. Notice you are setting the enviroment variables for dev and prod that will determine which webpack configuration file is merged with the common file:
```
    "start": "webpack serve --config webpack/webpack.config.js --env env=dev",
    "build": "webpack --config webpack/webpack.config.js --env env=prod",
```
The --open flag was also removed from the start script because the open browser command is now handled in the devServer section of the webpack.dev.js file.

5. Add some code to the App.tsx to see what the environment variables contain. Put the following code in the h1 tags next to the title:
```
{process.env.NODE_ENV} - {process.env.name}
```

6. Run the dev enviroment and do a production build in separate terminals to see the resulting env variable:
``` npm run start ```
``` npm run build ```
You should see 'React TypeScript Webpack Base App development - __DEV__' in the dev enviroment and 'React TypeScript Webpack Base App production - __PROD__' in the production build. You could use environment variables to connect to different endpoints depending on what is required for development or production.

## Part IV: Force linting and formatting rules on commits

Forcing linting and formatting rules prior to making git commits is a handy thing to do when working in teams on the same code base. This can prevent unneeded changes to files when code is pushed and run through the peer review process. For this, you can use a couple libraries, husky and lint-staged.

1. Add husky version 4 and lint-staged libraries as dev-dependencies:
``` npm i -D husky@4 lint-staged ```

2. Add configuration for husky and lint-staged to the package.json file:
```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx,json}": [
      "eslint --fix"
    ],
    "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
      "prettier --write"
    ]
  }
```

3. To test this configuration, you can add an unused variable to the App.tsx file before the return statement and try a git save and commit:
```
let myVar
```

``` git save . ```
``` git commit -m 'some commit message' ```

Lint-staged will catch the unused variable and fail the commit.

4. Change the App.tsx code to use the variable, but try defining the variable as a string with double-quotes and add a semicolon to the end:

```
 let myVar = "Foobar";
  return (
    <>
      <h1>
        React TypeScript Webpack Base App {process.env.NODE_ENV} -{' '}
        {process.env.name}
      </h1>
      <p>{myVar}</p>
      <img src={ReactPNG} alt="React icon png" width="100" height="100" />
      <img src={ReactSVG} alt="React icon svg" width="100" height="100" />
    </>
  )
```

``` git save . ```
``` git commit -m 'some other commit message' ```

Lint-staged with pass now on the variable because it is being used and will use Prettier to format the myVar definition to:
```
 let myVar = 'Foobar'
```

Note: If you have installed the Prettier - Code formatter extension in VSCode and have configured it to format files on save, this is a non-issue. However, it will insure that a teammate who hasn't configured VSCode to format on save will have code formatted properly prior to committing.