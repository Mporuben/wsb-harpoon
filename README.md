# WSB Harpoon
WSB Harpoon is extendable CLI tool for parsing and analyzing financial reports.

![title image](docs/assets/title.png)



## Run
pre-requisites:
- install [node](https://nodejs.org/en)
```bash
npx wsb-harpoon 
#command configs
npx wsb-harpoon --command=parse --ticker=coin 
```


## Data folder structure

- data - root folder
- raw - folder with raw reports
- internal - folder for storing parsed internal data
- exported - folder with exported reports

```
/data
├── /raw
│   └── [ticker]
│       └── 10k_[year].xlsx
├── /internal
│  └── [ticker].json
└── /exported
    └── [ticker].xlsx
 ```


## Docs
- [Development](./docs/development/README.md)
