// Khởi tạo biến toàn cục
let soLanDanhGia = 0;
let tongDiem = 0;

let danhGiaList = []

function hienThiDanhGia() {
    let danhGiaHTML = ``;
    danhGiaList = JSON.parse(localStorage.getItem('danhGiaList'))
    for (let i = 0; i < danhGiaList.length; i++) {
        danhGiaHTML += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${danhGiaList[i].rating}</td>
            <td>${danhGiaList[i].feedback}</td>
        </tr>
        `
    }
    document.querySelector('tbody').innerHTML = danhGiaHTML;
}
hienThiDanhGia();


// Xử lý hiển thị phần ý kiến cải thiện
document.querySelectorAll('input[name="rating"]').forEach(input => {
    input.addEventListener("change", function () {
        const rating = parseInt(this.value);
        const improveSection = document.getElementById("improveSection");
        improveSection.style.display = rating < 5 ? "block" : "none";
    });
});

// Xử lý submit form
function hienThiDiemTrungBinh(event) {
    event.preventDefault();

    // Kiểm tra xem có đánh giá được chọn không
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (!selectedRating) {
        document.getElementById("feedback").innerHTML =
            `<div class="alert alert-warning">Vui lòng chọn số sao để đánh giá!</div>`;
        return;
    }

    const rating = parseInt(selectedRating.value);
    const improveInput = document.getElementById("improveInput").value;
    const feedback = document.getElementById("feedback");

    // Lấy lại khi tải trang
    tongDiem = parseInt(localStorage.getItem('tongDiem')) || 0;
    soLanDanhGia = parseInt(localStorage.getItem('soLanDanhGia')) || 0;
    // Tính điểm đánh giá
    soLanDanhGia++;
    tongDiem += rating;
    const danhGia = (tongDiem / soLanDanhGia).toFixed(1);
    // Lưu
    localStorage.setItem('tongDiem', tongDiem);
    localStorage.setItem('soLanDanhGia', soLanDanhGia);

    // Tạo thông báo
    let message = "";
    switch (rating) {
        case 5:
            message = `Cảm ơn quý khách đã đánh giá 5 sao!`;
            break;
        case 4:
            message = `Cảm ơn quý khách đã đánh giá 4 sao!`;
            break;
        case 3:
            message = `Cảm ơn quý khách đã đánh giá 3 sao.`;
            break;
        case 2:
            message = `Cảm ơn quý khách đã đánh giá 2 sao.`;
            break;
        case 1:
            message = `Cảm ơn quý khách đã đánh giá 1 sao.`;
            break;
    }

    if (rating < 5 && improveInput) {
        message += `<br>Ý kiến cải thiện: ${improveInput}`;
    }

    // Hiển thị thông báo
    feedback.innerHTML = `<div class="alert alert-success">${message}</div>`;
    diemTB.innerHTML = `<div>${danhGia} trên 5 <span class="stars">★★★★★</span></div>`
    // Reset form
    document.getElementById("ratingForm").reset();
    document.getElementById("improveSection").style.display = "none";

    // Ghi log
    console.log(`Tổng điểm: ${tongDiem}, Số lần đánh giá: ${soLanDanhGia}, Điểm trung bình: ${danhGia}`);
    danhGiaList.push({
        rating: rating,
        feedback: improveInput || "không có ý kiến"
    })
    // Lưu danh sách đánh giá vào localStorage
    localStorage.setItem('danhGiaList', JSON.stringify(danhGiaList));
    hienThiDanhGia();
};

window.onload = function () {
    // Lấy lại khi tải trang
    tongDiem = parseInt(localStorage.getItem('tongDiem')) || 0;
    soLanDanhGia = parseInt(localStorage.getItem('soLanDanhGia')) || 0;
    const danhGia = (tongDiem / soLanDanhGia).toFixed(1);
    diemTB.innerHTML = `<div>${danhGia} trên 5 <span class="stars">★★★★★</span></div>`
}

// Xử lý nút "Tất Cả"
document.querySelector('.filter-btn').addEventListener('click', function () {
    alert('Hiển thị tất cả đánh giá!');

});

