const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");

let images = [];

input.addEventListener("change", function () {
    preview.innerHTML = "";
    images = [];

    const files = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Store file
        images.push(file);

        // Show preview
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);

        preview.appendChild(img);
    }
});
document.getElementById("convertBtn").addEventListener("click", convertToPDF);

async function convertToPDF() {
    if (images.length === 0) {
        alert("Please select images first!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
        const imgData = await readFile(images[i]);

        if (i > 0) pdf.addPage();

        pdf.addImage(imgData, 'JPEG', 10, 10, 180, 160);
    }

    pdf.save("ImagesToPDF.pdf");

    document.getElementById("status").innerText = "PDF Downloaded!";
}

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}