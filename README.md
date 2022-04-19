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

Raf.addTick(myAnimCallback, 40) // 40 times per seconds
Raf.addTick(myRenderCallback, 60) // 60 times per seconds
```

## License

[MIT](LICENSE).
