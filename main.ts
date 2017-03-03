import { Observable } from 'rxjs';

let numbers = [1, 2, 3, 4, 5, 6];

let source = Observable.fromEvent(document, "mousemove")
    .map((e: MouseEvent) => {
        return {
            x: e.clientX,
            y: e.clientY
        };
    })
    .filter((e) => {
        return e.y > 100;
    })
//  .map(n => {
//     return n * 10
// })
// .filter(n => {
//     return n !== 20;
// })
;

source.subscribe(
    value => {
        document.getElementById("pos").innerHTML = `x: ${value.x}, y: ${value.y}`;
        console.log(value);
    },
    e => {
        console.log(`error: ${e}`);
    },
    () => {
        console.log("complete");
    });