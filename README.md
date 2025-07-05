# Coding Exercise Nesto
## Florian Blaschke
### Time till working version: 3.25 hours, Total: 4h


This project runs with pnpm, install it if you haven’t already.

```
npm install -g pnpm@latest-10
```

It also uses Ultracite, an extension of Biome.js instead of eslint. If using VSCode or forks of VSCode the .vscode settings are included.
If using Zed, copy the following settings into your settings.json.

```
"formatter": {
    "language_server": {
      "name": "biome"
    }
  },
  "code_actions_on_format": {
    "source.fixAll.biome": true,
    "source.organizeImports.biome": true
  },
  "lsp": {
    "biome": {
      "settings": {
        "require_config_file": true
      }
    }
  }
```

Ultracite lints and formats with the following command:

```
pnpm lint
```

For more information visit: [ultracite](https://www.ultracite.ai)

## Exercises

The finished project is on the main branch. For each exercise exists another branch.
You can switch to them via (options are: one, two, three, four):

```
git switch exercise-<one>
```

# Finally:
## Thank you for your time and this opportunity.
