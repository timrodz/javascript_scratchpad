function getFibListLength() {
    return 20;
}

function generateFib(num) {
    var result = [];

    for (var i = 1; i <= num; ++i) {
        if (i == 1) {
            result.push(0);
        } else if (i == 2) {
            result.push(1);
        } else {
            result.push(result[i - 2] + result[i - 3]);
        }
    }

    return result;
}

function displayFibonacci(fibonacci) {
    var mainElement = document.getElementsByTagName("main")[0];
    for (var i = 0; i < fibonacci.length; ++i) {
        console.log(fibonacci[i]);
        var newElement = document.createElement("p");
        newElement.innerText = fibonacci[i];
        mainElement.appendChild(newElement);
    }
}

function main() {
    var fibonacciLimit = getFibListLength();
    var fibonacci = generateFib(fibonacciLimit);
    displayFibonacci(fibonacci);
}

// $(main); // This function will only run if jQuery is enabled
main(); // Otherwise, call it like you would with any otherß
