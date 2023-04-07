# Fin statement parser


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

## Run cli tool
```bash
npm run start
```

## Build cli tool
```bash
npm run build
```

## Development
```bash
npm run dev
```

