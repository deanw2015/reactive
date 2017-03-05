import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/fromEvent';
import 'rxjs';

import { load, loadWithFetch } from './loader';

let output = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button, "click");

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

let subscription =
    load("movies.json").subscribe(
        renderMovies,
        e => console.log(`Error: ${e}`),
        () => console.log("Complete")
    );

subscription.unsubscribe();

click.flatMap(() => load("movies.json"))
    .subscribe(
    renderMovies,
    e => console.log(`error: ${e}`),
    () => console.log("complete!")
    );