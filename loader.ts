import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/fromPromise';
import 'rxjs/add/Observable/defer';
import 'rxjs/add/operator/retryWhen';

export function load(url: string, attempts = 4, delay = 1000) {

    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        let onLoad = () => {
            if (xhr.status == 200) {

                let data = JSON.parse(xhr.responseText);

                observer.next(data);
                observer.complete();
            }
            else {
                observer.error(xhr.statusText);
            }
        };

        xhr.addEventListener("load", onload);
        xhr.open("GET", url);
        xhr.send();

        return () => {
            xhr.removeEventListener("load", onLoad);
        };

    }).retryWhen(retryStrategy(attempts, delay));
}

export function loadWithFetch(url: string) {
    return Observable.defer(() => {
        return Observable.fromPromise(
            fetch(url).then(r => {
                if (r.status === 200) {
                    return r.json();
                }
                else {
                    return Promise.reject(r);
                }
            })
        )
    }).retryWhen(retryStrategy());;
}

function retryStrategy(retries: number = 4, delay: number = 1000) {
    return (errors) => {
        return errors
            .scan((acc, value) => {
                acc++;
                if (acc < retries) {
                    return acc;
                }
                else {
                    throw new Error(value);
                }
            }, 0)
            .delay(delay);
    };
}
