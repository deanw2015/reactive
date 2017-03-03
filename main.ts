import { Observable } from 'rxjs';

let numbers = [1, 2, 3];

let source = Observable.create((observer) => {

    let index = 0;

    let produceValue = () => {
        observer.next(numbers[index++]);

        if (index < numbers.length) {
            setTimeout(produceValue, 500);
        }
        else {
            setTimeout(() => {
                observer.complete();
            }, 500);
        }
    };
    produceValue();
})
.map(n => {
    return n * 10
})
.filter(n => {
    return n !== 20;
});

source.subscribe(
    value => {
        console.log(`value: ${value}`);
    },
    e => {
        console.log(`error: ${e}`);
    },
    () => {
        console.log("complete");
    });