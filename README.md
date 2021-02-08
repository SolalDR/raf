# raf
## Getting started

Clone this repository and install its dependencies:

With npm:
```
npm install @solaldr/raf
```

With yarn:
```
yarn add @solaldr/raf
```


## How to use 

``` javascript 
import Raf from '@solaldr/raf'
Raf.start()

Raf.addTick(40, myAnimCallback) // 40 times per seconds
Raf.addTick(60, myRenderCallback) // 60 times per seconds
```

## License

[MIT](LICENSE).
