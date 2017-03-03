import { Observable } from 'rxjs';

let output = document.getElementById("output");
let button = document.getElementById("button");


let click = Observable.fromEvent(button, "click");

function load(url: string, callback: any) {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
        let response = JSON.parse(xhr.responseText);
        callback(response);
    });

    xhr.open("GET", url);
    xhr.send();
}

click.subscribe(
    value => {
        load("movies.json", (data) => {
            data.forEach(m => {
                let div = document.createElement("div");
                div.innerText = m.title;
                output.appendChild(div);
            });
        });
    },
    e => {
        console.log(`error: ${e}`);
    },
    () => {
        console.log("complete");
    });