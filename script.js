document.addEventListener("DOMContentLoaded", function () {
    const galleryContainer = document.getElementById("gallery-container");
    const searchInput = document.getElementById("search-input");
    const resultsLimitInput = document.getElementById("results-limit-input");
    const paginationContainer = document.getElementById("pagination-container");
    const itemsPerPage = 150; // Adjust as needed
    let currentPage = 1;


    function displayGallery(images, page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedImages = images.slice(startIndex, endIndex);

        galleryContainer.innerHTML = "";
        paginatedImages.forEach((imageName) => {
            const img = document.createElement("img");
            img.src = imageName;
            img.alt = imageName;
            img.className = "gallery-item";

            img.addEventListener("click", function () {
                showPopup(imageName, img.src);
            });

            galleryContainer.appendChild(img);
        });

        updatePaginationControls(Math.ceil(images.length / itemsPerPage));
    }

function showPopup(fileName, imageUrl) {
        const popup = document.createElement("div");
        popup.className = "popup";

        popup.style.backdropFilter = "blur(10px)";
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = fileName;

        // Adding the image to the popup
        popup.appendChild(img);

        // Adding file name to the popup
        const fileNameParagraph = document.createElement("p");
        fileNameParagraph.textContent = fileName.split("/").pop().split(".")[0];
        fileNameParagraph.style.textAlign = "center";
        fileNameParagraph.style.color = "#DCE6FF";
        fileNameParagraph.style.userSelect = "none";

        fileNameParagraph.addEventListener("click", function () {
            const tempTextarea = document.createElement("textarea");
            fileNameParagraph.classList.remove("animated");
            fileNameParagraph.classList.add("animated");
            tempTextarea.value = fileNameParagraph.textContent;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextarea);
            console.log("Text copied to clipboard!");
        });

        popup.appendChild(fileNameParagraph);

        // Adding close button to the popup
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", function () {
            popup.remove();
        });

        popup.appendChild(closeButton);

        // Adding click event listener to close popup when clicking outside
        document.addEventListener("mousedown", function (event) {
            if (event.target !== popup && !popup.contains(event.target)) {
                popup.remove();
            }
        });

        document.body.appendChild(popup);
    }


    function fetchAndDisplayGallery() {
    fetch("filenames.json")
        .then((response) => response.json())
        .then((fileNames) => {
            // Sort fileNames alphabetically
            fileNames.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

            // Display the sorted gallery
            displayGallery(fileNames, currentPage);
        })
        .catch((error) => {
            console.error("Error fetching JSON file:", error);
        });
}

    function filterImages() {
        const searchTerm = searchInput.value.toLowerCase();

        fetch("filenames.json")
            .then((response) => response.json())
            .then((fileNames) => {
                const filteredImages = fileNames.filter((imageName) =>
                    imageName.toLowerCase().includes(searchTerm)
                );
                filteredImages.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                displayGallery(filteredImages, currentPage);
            })
            .catch((error) => {
                console.error("Error fetching JSON file:", error);
            });
    }

    function updatePaginationControls(totalPages) {
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button"); // Add this line to apply styling
        button.addEventListener("click", function () {
            currentPage = i;
            filterImages();
        });
        paginationContainer.appendChild(button);
    }
}

    searchInput.addEventListener("input", function () {
        currentPage = 1;
        filterImages();
    });

    resultsLimitInput.addEventListener("input", function () {
        currentPage = 1;
        filterImages();
    });

   
    fetchAndDisplayGallery();
});

function neidndnsj(){
  document.getElementById("kdkdjzj").style.animation ="dialog1hide 250ms 1 forwards";
}


document.getElementById("kdkdjzj").style.animation ="dialog1show 250ms 1 forwards";
  