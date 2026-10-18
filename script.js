
let books = [
    { title: "Wings of Fire", author: "Kalam", copies: 2 },
    { title: "The Alchemist", author: "Coelho", copies: 1 },
    { title: "Ikigai", author: "Garcia", copies: 4 }
];

function addBook() {
    const title = document.getElementById("t").value.trim();
    const author = document.getElementById("a").value.trim();
    const copies = Number(document.getElementById("c").value);

    if (title === "" || author === "") {
        alert("Please fill in the title and the author.");
        return;
    }

    if (!Number.isInteger(copies) || copies < 1) {
        alert("Please enter a valid number of copies.");
        return;
    }

    const existing = findBook(title);

    if (existing) {
        existing.copies = existing.copies + copies;
    } else {
        books.push({
            title: title,
            author: author,
            copies: copies
        });
    }

    document.getElementById("t").value = "";
    document.getElementById("a").value = "";
    document.getElementById("c").value = 1;

    draw();
}

function findBook(title) {
    for (let b of books) {
        if (b.title.toLowerCase() === title.toLowerCase()) {
            return b;
        }
    }

    return null;
}

function borrow(title) {
    const b = findBook(title);

    if (!b) {
        alert("Book not found.");
        return;
    }

    if (b.copies > 0) {
        b.copies = b.copies - 1;
    } else {
        alert("No copies available to borrow.");
    }

    draw();
}

function returnBook(title) {
    const b = findBook(title);

    if (!b) {
        alert("Book not found.");
        return;
    }

    b.copies = b.copies + 1;

    draw();
}

function draw() {
    const shelf = document.getElementById("shelf");
    shelf.innerHTML = "";

    let totalCopies = 0;

    for (let b of books) {
        totalCopies = totalCopies + b.copies;

        const card = document.createElement("div");
        card.className = "book";

        const title = document.createElement("h3");
        title.textContent = b.title;

        const author = document.createElement("p");
        author.className = "author";
        author.textContent = "by " + b.author;

        const count = document.createElement("p");
        count.className = "count";
        count.textContent = b.copies + " available";

        const borrowButton = document.createElement("button");
        borrowButton.textContent = "Borrow";
        borrowButton.type = "button";
        borrowButton.addEventListener("click", function () {
            borrow(b.title);
        });

        const returnButton = document.createElement("button");
        returnButton.textContent = "Return";
        returnButton.type = "button";
        returnButton.addEventListener("click", function () {
            returnBook(b.title);
        });

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(count);
        card.appendChild(borrowButton);
        card.appendChild(returnButton);

        shelf.appendChild(card);
    }

    document.getElementById("titleCount").textContent = books.length;
    document.getElementById("copyCount").textContent = totalCopies;
}

draw();
