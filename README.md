# WSB Harpoon
WSB Harpoon is extendable CLI tool for parsing and analyzing financial reports.

![title image](docs/assets/title.png)



## Run
pre-requisites:
- install [node](https://nodejs.org/en) (16 is recommended version )
```bash
npx wsb-harpoon 
#command configs
npx wsb-harpoon --command=parse --ticker=coin 
```


## wsb-harpoon folder structure 
by default wsb-harpoon will create a folder called wsb-harpoon in your home directory.

- .internal - internal wsb-harpoon folder
- raw - folder with raw reports
- exported - folder with exported reports

```
/wsb-harpoon
├── /.internal
│   |── /plugins  
│   └── /data
├── /raw
│   └── [ticker]
│       └── 10k_[year].xlsx
└── /exports
    └── [ticker].xlsx
 ```

## Core
The core is responsible for exposing the cli tool and managing plugins.
On its own it does not do anything else. 

## Plugins
The idea behind harpoon is that you can install or write your own plugins to extend the functionality of Harpoon.
We are providing a few plugins out of the box
- 10k parser
- export 




## Docs
- [Development](./docs/development/README.md)
