import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  pluginJs.configs.recommended,
  {
    languageOptions: { 
      globals: {
        ...globals.browser, 
        ...globals.node
      } 
    },
    rules: {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"]
  },
  ignores : ["node_modules", ".env"],
  files : ["src/**/*.js"]
    
  }
  
];