import "./styles/main.scss"
import raf, {Easing} from "./../../dist/index.umd.js";
import RangeExample from "./scripts/RangeExample";

raf.start({
  auto: false
});


var customLoop = () => {
  raf.loop();
  requestAnimationFrame(customLoop);
}
customLoop();


const a = raf
  .add()
  .on('progress', ({value}) => {
    console.log('up', value);
  })
  .then({from: 1, to: 0})
  .on('progress', ({value}) => {
    console.log('down', value);
  })
  .and({from: 0, to: 1.5})
  .on('progress', ({value}) => {
    console.log('up (bis)', value);
  })



window.addEventListener('load', ()=>{
  Object.keys(Easing).forEach(key => {
    const example = new RangeExample();
    example.setTitle(key);
    
    var anim = null;
    example.$element.addEventListener('mouseenter', () => {
      if (anim) return;
      var a = 0;
      anim = raf.add({
        to: 100,
        duration: 600,
        delay: 500,
        timingFunction: key
      }).on('progress', (event)=>{
        example.update(event);
      }).on('end', () => {
        anim = null;
      })
    });
  })
})
